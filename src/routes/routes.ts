// Different Layout
import NotFound from '~/layouts/NotFound';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

interface Routes {
    path: string;
    Component: React.ComponentType;
    layout?: null | any;
}

const privateRoutes: Routes[] = [
    {
        path: '/',
        Component: Register,
        layout: null,
    },
];

const publicRoutes: Routes[] = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/about',
        Component: About,
    },
    {
        path: '/login',
        Component: Login,
        layout: null,
    },
    {
        path: '/register',
        Component: Register,
        layout: null,
    },
    {
        path: '/contact',
        Component: Contact,
        layout: null,
    },
    {
        path: '*',
        Component: NotFound,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };
