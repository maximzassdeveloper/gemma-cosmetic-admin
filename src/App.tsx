import { useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { Sidebar } from './components'
import * as pages from './pages'
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
            <pages.Login />
          </Route>
          <Redirect to='/' />
        </Switch> 
      : <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />

          <Switch>
            <Route path='/products/product/:slug' component={pages.UpdateProduct} />
            <Route path='/products/create' component={pages.CreateProduct} />
            <Route path='/products' exact component={pages.Products} />
            <Route path='/categories' exact component={pages.Categories} />
            <Route path='/attributes' exact component={pages.Attributes} />
            <Route path='/' exact component={pages.Dashboard} />
            <Redirect to={'/'} />
          </Switch>

        </Layout> 
      }
    </BrowserRouter>
  )
}

export default App
