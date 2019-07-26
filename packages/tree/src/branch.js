import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import { useTreeContext } from './contextProvider'
import Leaf from './leaf'

const Branch = props => {
  const { item, children, id, onClickLeaf, classes, isFolder, secondaryText } = props
  const [{ foldStatus }] = useTreeContext()
  const fold = foldStatus[id]

  return (
    <Fragment>
      <Leaf item={item} id={id} onClickLeaf={onClickLeaf} isFolder={isFolder} fold={fold} secondaryText={secondaryText} />
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
