import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
<HashRouter>
    <AppRouter />
</HashRouter>
)
