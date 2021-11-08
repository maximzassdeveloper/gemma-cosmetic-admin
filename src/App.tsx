import { useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { Sidebar } from './components'
import { CreateProduct, UpdateProduct, Dashboard, Login, Products } from './pages'
import { authContext } from './services/context/context'

function App() {

  const { isAuth, loading, refresh } = useContext(authContext)

  useEffect(() => {
    refresh()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter>
      {!isAuth 
      ? <Switch>
          <Route path='/' exact>
            <Login />
          </Route>
          <Redirect to='/' />
        </Switch> 
      : <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />

          <Switch>
            <Route path='/products/product/:slug' component={UpdateProduct} />
            <Route path='/products/create' component={CreateProduct} />
            <Route path='/products' exact component={Products} />
            <Route path='/' exact component={Dashboard} />
            <Redirect to={'/'} />
          </Switch>

        </Layout> 
      }
    </BrowserRouter>
  )
}

export default App
