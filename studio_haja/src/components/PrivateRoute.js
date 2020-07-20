import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import API from '../utils/API'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (API.isAuth() === false) {
        return <Redirect to='/login' />
      } else if (API.isAdmin() === true) {
        return <Redirect to='/admin' />
      } else {
        return <Component {...props} />
      }
    }}
  />
)
