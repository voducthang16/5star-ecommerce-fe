import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import GlobalStyles from './components/GlobalStyles';
import './index.css';
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <Router>
                    <GlobalStyles Children={App} />
                </Router>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>,
);
