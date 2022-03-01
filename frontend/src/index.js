import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import {store} from "./redux/store";
import options from "./config/trOptions";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options)

const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
)



const render = () => {
    ReactDOM.render(
        <Suspense fallback={loadingMarkup}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>,
        document.getElementById('root')
    );
}

function main(){
    render();
}

main()
