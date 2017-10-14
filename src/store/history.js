import createHashHistory from 'history/createHashHistory'
import createBrowserHistory from 'history/createBrowserHistory'
const createHistory = __DESKTOP__ ? createHashHistory : createBrowserHistory
// A singleton history object for easy API navigation
const history = createHistory()
export default history