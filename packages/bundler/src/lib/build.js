const {join} = require('path')
const {rollup} = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const minify = require('rollup-plugin-babel-minify')

const FORMATS = {
  ESM: 'esm',
  CJS: 'cjs',
  UMD: 'umd',
}

const COMMON_GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  classnames: 'classnames',
}

const COMMON_EXTERNALS = ['@babel/runtime/helpers', '@material-ui/core/']

const DEFAULT_CONFIG = {
  codeSplitting: [],
  output: {
    dir: 'dist',
  }
}

const onwarn = (warning, warn) => {
  if (['MISSING_GLOBAL_NAME', 'UNUSED_EXTERNAL_IMPORT'].includes(warning.code)) return
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message)

  warn(warning)
}

const loadConfig = ({baseDir}) => {
  try {
    const buildConfig = require(join(baseDir, 'geut-bundler.config.js'))
    return {...DEFAULT_CONFIG, ...buildConfig.build}
  } catch (error) {
    console.warn(`\nNo geut-bundler.config.js file found on ${baseDir}.\n`)
  }

  return DEFAULT_CONFIG
}

const getPlugins = ({env, baseDir, production}) => [
  babel({
    exclude: /node_modules/,
    runtimeHelpers: true,
  }),

  resolve({
    jsnext: true,
    browser: true,
    customResolveOptions: {
      moduleDirectory: join(baseDir, 'src'),
    },
  }),

  replace({'process.env.NODE_ENV': JSON.stringify(env)}),

  commonjs({
    include: /node_modules/,
    namedExports: {
      '@material-ui/core/styles': ['withStyles'],
    },
  }),

  production && minify(),
]

const getExternalFn = ({pkg}) => {
  const allExternals = Object.keys(pkg.peerDependencies || [])
  .concat(Object.keys(pkg.dependencies || []))
  .concat(COMMON_EXTERNALS)

  return id => allExternals.some(ex => id.startsWith(ex))
}

const loadPkgInfo = ({baseDir, config}) => {
  let pkg

  try {
    pkg = require(join(baseDir, 'package.json'))
  } catch (error) {
    console.log(error)
    throw new Error(`No package.json file found on ${baseDir}`)
  }

  const name = pkg.name.split('/').pop()

  const dests = {
    [FORMATS.UMD]: pkg.browser || `./${config.output.dir}/umd/index.js`,
    [FORMATS.CJS]: pkg.main || `./${config.output.dir}/cjs/index.js`,
    [FORMATS.ESM]: pkg.module || `./${config.output.dir}/esm/index.js`,
  }

  const external = getExternalFn({pkg})

  return {
    name,
    dests,
    external,
  }
}

const build = async (input, {formats = [FORMATS.CJS, FORMATS.ESM, FORMATS.UMD], env = process.env.NODE_ENV}) => {
  const production = env === 'production'
  const baseDir = process.cwd()
  const config = loadConfig({baseDir})
  const {name, dests, external} = loadPkgInfo({baseDir, config})
  const plugins = getPlugins({env, baseDir, production})
  const codeSplitting = Boolean(config.codeSplitting.length)

  console.log(config)

  const inputOptions = {
    external,
    plugins,
    treeshake: {
      pureExternalModules: true,
    },
    onwarn,
  }

  const outputOptions = {
    name,
    globals: COMMON_GLOBALS,
    sourcemap: !production,
    exports: 'named',
  }

  const jobs = formats.map(format => {
    const notUMD = format !== FORMATS.UMD

    const bundleInputOptions = {
      ...inputOptions,
      input:
        notUMD && codeSplitting ? [input].concat(config.codeSplitting.map(file => join(baseDir, file))) : input,
      experimentalCodeSplitting: notUMD && codeSplitting,
    }

    const bundleOutputOptions = {
      ...outputOptions,
      format,
      ...(notUMD && codeSplitting ? {dir: join(baseDir, config.output.dir, format)} : {file: dests[format]}),
    }
    return rollup(bundleInputOptions)
    .then(bundle => bundle.write(bundleOutputOptions))
    .then(result => ({format, result}))
    .catch(this.error)
  })

  const result = (await Promise.all(jobs)).reduce((acc, {format, result}) => {
    acc[format] = result
    return acc
  }, {})

  return result
}

module.exports = build
