import * as React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Student_Homepage from './pages/Student/Student_Homepage';
import Student_SignInPage from './pages/Student/Student_SignInPage';
import Admin_SignUpPage from './pages/Admin/Admin_SignUpPage';
import Admin_SignInPage from './pages/Admin/Admin_SignInPage';
import Prof_SignInPage from './pages/Prof/Prof_SignInPage';
import Prof_SignUpPage from './pages/Prof/Prof_SignUpPage';
import Student_Detail from './pages/Student/Student_Detail';
import Student_CertificateExample from './pages/Student/Student_CertificateExample';

const theme = extendTheme({
	fonts: {
		heading: `'Noto Sans Thai', sans-serif`,
		body: `'Noto Sans Thai', sans-serif`,
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <Student_Homepage />,
	},
	{
		path: '/detail/:id',
		element: <Student_Detail />,
	},
	{
		path: 'bra',
		element: <Student_CertificateExample />,
	},
	{
		path: '/student/login',
		element: <Student_SignInPage />,
	},
	{
		path: '/admin/register',
		element: <Admin_SignUpPage />,
	},
	{
		path: '/admin/login',
		element: <Admin_SignInPage />,
	},
	{
		path: '/professor/register',
		element: <Prof_SignUpPage />,
	},
	{
		path: '/professor/login',
		element: <Prof_SignInPage />,
	},
]);

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router}>
			</RouterProvider>
		</ChakraProvider>
	</React.StrictMode>,
)