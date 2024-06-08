import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Provider as ReduxProvider } from "react-redux";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { StyleReset, ThemeProvider } from 'atomize';
import { store } from './features/store.js';

const engine = new Styletron();
// const debug =
//   process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const theme = {
  colors: {
    primary: '#B6244F',
    secondary: '#FBB7C0',
    tertiary: "#BFADA3",
    texts: "#FFFFFF"
  }
};

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine} debugAfterHydration>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <StyleReset />
          <App />
        </ReduxProvider>
      </ThemeProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
