import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import Leaf from './leaf'

const Branch = props => {
  const { children, title, id, unfoldAll, onClickLeaf, classes, isFolder } = props
  const [fold, setFoldState] = useState(unfoldAll)

  const toggleFold = () => {
    setFoldState(!fold)
  }

  return (
    <Fragment>
      <Leaf title={title} id={id} onClickLeaf={onClickLeaf} isFolder={isFolder} fold={fold} toggleFold={toggleFold} />
      <Collapse in={fold} timeout='auto' unmountOnExit>
        <List component='div' disablePadding className={classes.nested}>
          {children}
        </List>
      </Collapse>
    </Fragment>
  )
}

Branch.displayName = 'Branch'

Branch.defaultProps = {
  unfoldAll: false
}

Branch.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  unfoldAll: PropTypes.bool
}

export default Branch
