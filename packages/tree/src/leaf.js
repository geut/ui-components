import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FolderIcon from '@material-ui/icons/Folder'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Checkbox from '@material-ui/core/Checkbox'
import { useTreeContext } from './contextProvider'

const Leaf = props => {
  const { item, id, isFolder, secondaryText, onClickLeaf, fold } = props
  const [{ checkStatus, checkbox }, dispatch] = useTreeContext()
  const isChecked = checkStatus[id]
  const { title } = item

  const itemIcon = ({ isFolder, fold }) => {
    if (isFolder) {
      if (fold) {
        return <FolderOpenIcon />
      } else {
        return <FolderIcon />
      }
    }
    return <ListAltIcon />
  }

  return useMemo(() => {
    const clickHandler = ev => {
      if (typeof ev.target.checked !== 'undefined') return false

      dispatch({ type: 'FOLD', id, val: !fold })
      onClickLeaf({ leaf: { id, title } })
    }

    const checkboxHandler = ev => {
      ev.stopPropagation()
      dispatch({ type: 'CHECK', id, val: !isChecked })
    }
    return (
      <ListItem button key={id} dense onClick={clickHandler}>
        <ListItemIcon>
          {itemIcon({ isFolder, fold })}
        </ListItemIcon>
        {checkbox
          ? <ListItemIcon>
            <Checkbox
              edge='start'
              checked={isChecked}
              inputProps={{ 'leaf-item': id }}
              onChange={checkboxHandler}
            />
          </ListItemIcon>
          : ''
        }
        <ListItemText
          primary={title}
          secondary={secondaryText(item)}
          secondaryTypographyProps={{
            color: 'secondary',
            variant: 'caption',
            display: 'block'
          }}
        />
      </ListItem>
    )
  }, [id, isFolder, fold, checkbox, isChecked, title, secondaryText, item, dispatch, onClickLeaf])
}

Leaf.displayName = 'Leaf'

Leaf.defaultProps = {
  checkbox: false,
  onClickLeaf: () => {},
  secondaryText: () => ''
}

Leaf.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  secondaryText: PropTypes.func,
  checkbox: PropTypes.bool,
  onClickLeaf: PropTypes.func,
  fold: PropTypes.bool
}

export default Leaf
