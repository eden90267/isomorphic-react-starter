import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

import Master from './Master'
import Detail from './Detail'


const App = () =>
  <Switch>
    <Route exact path="/:id" component={Detail}/>
    <Route path="/" component={Master}/>
  </Switch>


export default App