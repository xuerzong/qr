import ReactDOM from 'react-dom/client'
import { App } from './app'
import './tailwind.css'

if (import.meta.env.DEV) {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(<App />)
} else {
  ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)
}
