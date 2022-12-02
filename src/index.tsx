import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyles from './components/GlobalStyles';
import './index.css';
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <Router>
                    <PersistGate loading={null} persistor={persistor}>
                        <GlobalStyles Children={App} />
                    </PersistGate>
                </Router>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>,
);
