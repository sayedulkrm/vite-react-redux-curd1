import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import theme from "./theme.jsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);
