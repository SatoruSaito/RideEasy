import {useRoutes} from 'hookrouter';
import Routes from './router'

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult
}