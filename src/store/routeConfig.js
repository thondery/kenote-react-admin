import React from 'react'
import App from '../containers/app'
import { PageNotFound } from '../layouts'
import * as Features from '../features'
import { Switch, Route } from 'react-router-dom'
import { getRoutes } from '../services/utils'

const Routes = getRoutes(Features)
const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...Routes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}]

// Handle isIndex property of route config:
// Dupicate it and put it as the first route rule.
function handleIndexRoute (route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = route.path
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)
export default routes

export function renderRouteConfigV3(Container, routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = [] // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath
    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    newContextPath = newContextPath.replace(/\/+/g, '/')
    if (item.component && item.childRoutes) {
      children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath))
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))
  
  // Use Switch as the default container by default
  if (!Container) return <Switch>{children}</Switch>
  
  return (
    <Container key={contextPath}>
      <Switch>
        {children}
      </Switch>
    </Container>
  )
}