import Screen from './screen'

const routes = {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default', name: 'Home', component: Screen, isIndex: true },
  ],
}

export default routes