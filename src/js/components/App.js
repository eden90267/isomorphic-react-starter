import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'


const App = () =>
  <Switch>
    <Route exact path="/:id" component={({match}) =>
      <div className="detail">
        <h1>Detail</h1>
        {match.params.id}
      </div>
    }/>
    <Route path="/" component={() =>
       <div className="master">
         <h1>Master</h1>
         <ul>
           <li>
             <Link to="/1">
               1
             </Link>
           </li>
           <li>
             <Link to="/2">
               2
             </Link>
           </li>
         </ul>
       </div>
    }/>
  </Switch>


export default App