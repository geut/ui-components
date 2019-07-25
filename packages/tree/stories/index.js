import React from 'react'
import { storiesOf } from '@storybook/react'
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

const logLeaf = ({ leaf }) => {
  console.log(`You clicked ${leaf.title}`)
}

storiesOf('Tree', module)
  .add('basic', () => (
    <Tree treeData={input} />
  ))
  .add('onClick', () => (
    <Tree treeData={input} onClickLeaf={logLeaf} />
  ))
