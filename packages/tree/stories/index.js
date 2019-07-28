import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Tree from '../src/'

const input = [
  {
    title: 'Element A',
    children: [
      {
        title: 'Element A-1',
        children: [
          {
            title: 'Sub Element A-1-1'
          }
        ]
      }
    ]
  },
  {
    title: 'Element B'
  }
]

let eraseInput = input

// const datInput = JSON.parse('[{"title":"dat.json","size":129,"modifiedTimestamp":1554806386136,"nativeIndex":0,"fullPath":"dat.json","key":"lattice-tree-dat.json-1"},{"title":"Double Drive","size":0,"modifiedTimestamp":0,"nativeIndex":1,"fullPath":"Double Drive","children":[],"key":"lattice-tree-Double Drive-1"},{"title":"Helix Antenna","size":0,"modifiedTimestamp":0,"nativeIndex":2,"fullPath":"Helix Antenna","children":[],"key":"lattice-tree-Helix Antenna-1"},{"title":"Libreboot","size":0,"modifiedTimestamp":0,"nativeIndex":3,"fullPath":"Libreboot","children":[],"key":"lattice-tree-Libreboot-1"},{"title":"Mini Server","size":0,"modifiedTimestamp":0,"nativeIndex":4,"fullPath":"Mini Server","children":[],"key":"lattice-tree-Mini Server-1"},{"title":"Security Cam","size":0,"modifiedTimestamp":0,"nativeIndex":5,"fullPath":"Security Cam","children":[],"key":"lattice-tree-Security Cam-1"},{"title":"Yagi Antenna","size":0,"modifiedTimestamp":0,"nativeIndex":6,"fullPath":"Yagi Antenna","children":[],"key":"lattice-tree-Yagi Antenna-1"},{"title":"Links","size":576,"modifiedTimestamp":1554841536034,"nativeIndex":7,"fullPath":"Links","key":"lattice-tree-Links-1"},{"title":"NODE_VOL_01.pdf","size":165111361,"modifiedTimestamp":1555530675986,"nativeIndex":8,"fullPath":"NODE_VOL_01.pdf","key":"lattice-tree-NODE_VOL_01.pdf-1"},{"title":"License","size":1740,"modifiedTimestamp":1555531320233,"nativeIndex":9,"fullPath":"License","key":"lattice-tree-License-1"}]')
const datInput = [
  {
    fullPath: 'dat.json',
    key: 'lattice-tree-dat.json-1',
    title: 'dat.json',
    modifiedTimestamp: 1554806386136,
    nativeIndex: 0,
    size: 129
  },
  {
    children: [
      {
        fullPath: 'Libreboot/libreboot_r20160907_grub_x200_4mb.tar.xz',
        key: 'lattice-tree-libreboot_r20160907_grub_x200_4mb.tar.xz-2',
        title: 'libreboot_r20160907_grub_x200_4mb.tar.xz',
        modifiedTimestamp: 1554806546648,
        nativeIndex: 0,
        size: 1620648
      },
      {
        fullPath: 'Libreboot/libreboot_r20160907_grub_x200_8mb.tar.xz',
        key: 'lattice-tree-libreboot_r20160907_grub_x200_8mb.tar.xz-2',
        title: 'libreboot_r20160907_grub_x200_8mb.tar.xz',
        modifiedTimestamp: 1554806546697,
        nativeIndex: 1,
        size: 1632800
      }
    ],
    fullPath: 'Double Drive',
    key: 'lattice-tree-Double Drive-1',
    title: 'Double Drive',
    modifiedTimestamp: 0,
    nativeIndex: 1,
    size: 0
  }
]

const secondaryText = item => {
  return `${item.size ? `${item.size} |` : ''} ${item.modifiedTimestamp ? new Date(item.modifiedTimestamp).toDateString() : ''}`
}

class SecondaryAction extends Component {
  state = {
    open: false
  }

  removeHandler = (ev) => {
    ev.stopPropagation()
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDelete = (ev, item) => {
    // NOTE (dk): this is just a demo action
    eraseInput = eraseInput.filter(datum => datum.title !== item.title)
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    const { item } = this.props
    return (
      <>
        <IconButton edge='end' arial-label='Delete element' onClick={this.removeHandler}>
          <DeleteIcon />
        </IconButton>
        <Dialog onClose={this.handleClose} aria-labelledby='simple-dialog-title' open={open}>
          <DialogTitle id='simple-dialog-title'>Confirm action</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={ev => this.handleDelete(ev, item)} color='primary' autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

storiesOf('Tree', module)
  .add('basic', () => (
    <Tree treeData={input} />
  ))
  .add('onClick', () => (
    <Tree treeData={input} onClickLeaf={action('onClickLeaf')} />
  ))
  .add('checkbox', () => (
    <Tree treeData={input} checkbox />
  ))
  .add('secondary action', () => (
    <Tree treeData={eraseInput} checkbox secondaryActions={[(item) => (<SecondaryAction item={item} />)]} />
  ))
  .add('dat example', () => (
    <Tree treeData={datInput} secondaryText={secondaryText} />
  ))
