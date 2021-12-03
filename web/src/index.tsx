import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import '@fontsource/kanit/200.css'
import searchReducers from './redux/reducers/searchReducers'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux';
const rootReducers = combineReducers({
  searchReducers
})
const store = createStore(rootReducers)
const theme = extendTheme({
  fonts:{
    heading: 'Kanit',
    body: 'Kanit'
  }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
