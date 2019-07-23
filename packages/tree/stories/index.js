import React from 'react';
import {storiesOf} from '@storybook/react';
import Tree from '../src/';

const input = [
  {
    title: 'Element A',
    children: [
      [
        {
          title: 'Element A-1'
        }
      ]
    ]
  },
  {
    title: 'Element B'
  }
];

storiesOf('Tree', module)
  .add('basic', () => (
    <Tree treeData={input}/>
  ))
