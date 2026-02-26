import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppAlt from './AppAlt.jsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'

const isAlt = new URLSearchParams(window.location.search).get('v') === '2';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {isAlt ? <AppAlt /> : <App />}
        <Analytics />
    </React.StrictMode>,
)
