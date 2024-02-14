import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { StyleReset, ThemeProvider } from 'atomize';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyletronProvider value={engine} debugAfterHydration>
      <ThemeProvider theme={theme}>
        <StyleReset />
        <App />
      </ThemeProvider>
    </StyletronProvider>
  </React.StrictMode>,
)
