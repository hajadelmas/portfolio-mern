import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './components/Login'
import Admin from './components/Admin'
import NotFound from './components/NotFound'
import { PrivateRoute } from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './style.scss'

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <Route exact path='/admin' component={Admin} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))
