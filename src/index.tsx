import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './styles/global.scss'
import { AuthProvider } from './services/context/AuthProvider'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)
