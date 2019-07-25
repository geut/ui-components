import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FolderIcon from '@material-ui/icons/Folder'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Checkbox from '@material-ui/core/Checkbox'

const Leaf = props => {
  const { id, title, isFolder, secondaryText, checkbox, onClickLeaf, toggleFold, fold } = props
  const checkedFn = useContext('checkedFn')
  const clickHandler = ev => {
    toggleFold()
    onClickLeaf({ leaf: { id, title } })
  }
  const itemIcon = ({ isFolder, fold }) => {
    if (isFolder) {
      if (fold) {
        return <FolderOpenIcon />
      } else {
        return <FolderIcon />
      }
    } else {
      return <ListAltIcon />
    }
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
            checked={checkedFn(id)}
            inputProps={{ 'leaf item': id }}
          />
        </ListItemIcon>
        : ''
      }
      <ListItemText primary={title} secondary={secondaryText} />
    </ListItem>
  )
}

Leaf.displayName = 'Leaf'

Leaf.defaultProps = {
  secondaryText: '',
  checkbox: false,
  onClickLeaf: () => {},
  toggleFold: () => {}
}

Leaf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  checkbox: PropTypes.bool,
  onClickLeaf: PropTypes.func,
  toggleFold: PropTypes.func,
  fold: PropTypes.bool
}

export default Leaf
