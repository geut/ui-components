const {join} = require('path')
const {Command, flags} = require('@oclif/command')
const colors = require('colors')
const build = require('../lib/build')

class BuildCommand extends Command {
  async run() {
    const {args, flags} = this.parse(BuildCommand)
    const {input} = args
    const {formats, env} = flags
    this.log(colors.green.bold('Bundler started 🚛'))
    try {
      const outputs = await build(input, {formats, env})

      this.log(colors.green.bold('\n 🚀 Your bundle is ready! 🚀\n'))

      this.log(colors.underline('Generated files:'))

      const files = []

      for (const format in outputs) {
        const {output, fileName} = outputs[format]

        if (fileName) {
          files.push([format, fileName])
          continue
        }

        for (const file in output) {
          const {fileName} = output[file]
          files.push([format, fileName])
        }
      }

      for (const [format, fileName] of files) {
        this.log(colors.cyan(`> ${colors.bold(format)}: ${join(process.cwd(), 'dist', format, fileName)}`));
      }
      this.log('')
    } catch (error) {
      this.error(colors.red(error))
      // program.outputHelp()
      process.exit(1)
    }
  }
}

BuildCommand.description = `Build your source files into cjs, esm or umd formats.
...
You can build for development or production.
`

BuildCommand.args = [
  {
    name: 'input',
    description: 'source code entry point',
  },
]

BuildCommand.flags = {
  formats: flags.string({
    char: 'f',
    description: 'Output formats',
    default: ['umd', 'cjs', 'esm'],
    parse: input => input.split(','),
  }),
  environment: flags.string({
    char: 'e',
    description: 'Environment',
    env: 'NODE_ENV',
    default: 'production',
  })
}

module.exports = BuildCommand
