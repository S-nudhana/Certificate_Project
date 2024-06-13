import * as React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Student_Homepage from './pages/Student_Homepage';

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans Thai', sans-serif`,
    body: `'Noto Sans Thai', sans-serif`,
  },
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <Student_Homepage/>,
	},
  // {
	// 	path: '/admin/login',
	// 	element: <Student_Homepage/>,
	// },
  // {
	// 	path: '/admin/register',
	// 	element: <Student_Homepage/>,
	// },
  // {
	// 	path: '/admin/login',
	// 	element: <Student_Homepage/>,
	// },
  // {
	// 	path: '/professer/register',
	// 	element: <Student_Homepage/>,
	// },
  // {
	// 	path: '/professer/login',
	// 	element: <Student_Homepage/>,
	// },
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