import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DefaultLayout } from '~/layouts/';
import { privateRoutes, publicRoutes } from '~/routes';
import './App.css';
import PrivateRoutes from './components/PrivateRoutes';

interface FragmentLayoutProps {
    Children: React.ComponentType;
}

function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

function FragmentLayout({ Children }: FragmentLayoutProps) {
    return <Children />;
}

function App() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <>
            {useScrollToTop()}
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.Component;

                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = FragmentLayout;
                    }
                    return <Route key={index} path={route.path} element={<Layout Children={Page} />} />;
                })}
                <Route element={<PrivateRoutes />}>
                    {privateRoutes.map((route, index) => {
                        const Page = route.Component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = FragmentLayout;
                        }
                        return <Route key={index} path={route.path} element={<Layout Children={Page} />} />;
                    })}
                </Route>
            </Routes>
        </>
    );
}

export default App;
