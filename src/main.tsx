
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
//import ColorTest from './Test.tsx'
import Router from './App'
//import HomePage from './pages/home'
import {store,persistor} from "../src/redux/store"
import { Provider } from'react-redux';
import { PersistGate } from'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
