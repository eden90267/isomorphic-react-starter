import React from 'react'
import deepFreeze from 'deep-freeze'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

global.React = React

global.localStorage = {}

global._todolist = deepFreeze({
  'editable': false,
  'data': [
    {
      'id': '8658c1d0-9eda-4a90-95e1-8001e8eb6036',
      'title': 'Some Title 1',
      'content': 'some content 1...',
      'sort': 1
    },
    {
      'id': 'f9005b4e-975e-433d-a646-79df172e1dbb',
      'title': 'Some Title 2',
      'content': 'some content 2...',
      'sort': 2
    }
  ]
})