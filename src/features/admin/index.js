import Screen from './screen'
import { AdminGroup } from './pages'
import { getMenuSub } from '../../services/utils'

const routes = {
  path: '/admins',
  name: 'admin',
  childRoutes: [
    { path: 'default', name: 'admin', component: Screen, isIndex: true },
    { path: 'group', name: '帐号管理', component: AdminGroup },
  ],
}

export default routes

export const menuSub = getMenuSub(routes, {
    key:   `admins`, 
    name:  `帐号管理`, 
    icon:  `solution`
  })