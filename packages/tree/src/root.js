import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import { TreeContextProvider } from './contextProvider'
import Leaf from './leaf'
import Branch from './branch'

let counter = 0

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    color: theme.palette.text.secondary
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const walkTreeData = ({ treeData, leaf, branch, classes, rest }) => {
  return treeData.map(item => {
    counter += 1
    if (!item.children) {
      return leaf({ item, id: `${item.title}-${counter}`, isFolder: false, ...rest })
    } else {
      const children = walkTreeData({ treeData: item.children, leaf, branch, classes, rest })
      return branch({ item, id: `${item.title}-${counter}`, children, classes, isFolder: true, ...rest })
    }
  })
}

/**
 *  Sample state structure
 *  ----------------------
 *
 *  {
 *    foldStatus: {
 *      id: true | false
 *    },
 *    checkStatus: {
 *      id: true | false
 *    },
 *    checkCascade: true | false
 *  }
 *
 *
 */

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOLD': return { ...state, foldStatus: { ...state.foldStatus, [action.id]: action.val } }
    case 'CHECK': return { ...state, checkStatus: { ...state.checkStatus, [action.id]: action.val } }
    default: return state
  }
}

const initialState = {
  foldStatus: {},
  checkStatus: {}
}

const Root = props => {
  const { treeData, listTitle, renderLeaf, renderBranch, ...rest } = props
  const TheLeaf = renderLeaf || ((props) => (<Leaf key={props.id} {...props} />))
  const TheBranch = renderBranch || ((props) => (<Branch key={`parent_${props.id}`} {...props} />))
  const classes = useStyles()

  return (
    <TreeContextProvider reducer={reducer} initialState={{ ...initialState, ...rest }}>
      <List
        component='nav'
        aria-labelledby='geut tree component'
        subheader={
          <ListSubheader component='div' id='geut-tree-component'>
            {listTitle}
          </ListSubheader>
        }
        className={classes.root}
      >
        {walkTreeData({ treeData, leaf: TheLeaf, branch: TheBranch, classes, rest })}
      </List>
    </TreeContextProvider>
  )
}

Root.defaultProps = {
  listTitle: '',
  unfoldAll: false,
  onClickLeaf: () => {}
}

Root.propTypes = {
  treeData: PropTypes.array.isRequired,
  unfoldAll: PropTypes.bool,
  listTitle: PropTypes.string,
  renderLeaf: PropTypes.element,
  renderBranch: PropTypes.element,
  onClickLeaf: PropTypes.func
}

export default Root
