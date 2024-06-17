import * as React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Student_Homepage from './pages/Student/Student_Homepage';
import Student_SignInPage from './pages/Student/Student_SignInPage';
import Admin_SignUpPage from './pages/Admin/Admin_SignUpPage';
import Admin_SignInPage from './pages/Admin/Admin_SignInPage';
import Prof_SignInPage from './pages/Prof/Prof_SignInPage';
import Prof_SignUpPage from './pages/Prof/Prof_SignUpPage';
import Student_Detail from './pages/Student/Student_Detail';
import Student_CertificateExample from './pages/Student/Student_CertificateExample';
import Admin_CreateEvent from './pages/Admin/Admin_CreateEvent';
import Student_CertificateDownload from './pages/Student/Student_CertificateDownload';
import Admin_Homepage from './pages/Admin/Admin_Homepage';
import Admin_EditEvent from './pages/Admin/Admin_EditEvent';
import Prof_EventDetail from './pages/Prof/Prof_EventDetail';
import Prof_Homepage from './pages/Prof/Prof_Homepage';
import Admin_EventDetail from './pages/Admin/Admin_EventDetail';


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
		path: '/login',
		element: <Student_SignInPage />,
	},
	{
		path: '/detail/:id',
		element: <Student_Detail />,
	},
	{
		path: '/certificate/:id',
		element: <Student_CertificateExample />,
	},
	{
		path: '/download/:id',
		element: <Student_CertificateDownload />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_REGISTER,
		element: <Admin_SignUpPage />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_LOGIN,
		element: <Admin_SignInPage />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_HOMEPAGE,
		element: <Admin_Homepage />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_CREATE_EVENT,
		element: <Admin_CreateEvent />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_EDIT_EVENT,
		element: <Admin_EditEvent />,
	},
	{
		path: import.meta.env.VITE_ADMIN_PATH_DETAIL,
		element: <Admin_EventDetail />,
	},
	{
		path: import.meta.env.VITE_PROFESSOR_PATH_REGISTER,
		element: <Prof_SignUpPage />,
	},
	{
		path: import.meta.env.VITE_PROFESSOR_PATH_LOGIN,
		element: <Prof_SignInPage />,
	},
	{
		path: import.meta.env.VITE_PROFESSOR_PATH_HOMEPAGE,
		element: <Prof_Homepage />,
	},
	{
		path: import.meta.env.VITE_PROFESSOR_PATH_DETAIL,
		element: <Prof_EventDetail />,
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