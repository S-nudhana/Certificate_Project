import { createBrowserRouter } from "react-router-dom";

import Student_Homepage from "./pages/Student/Student_Homepage";
import Student_SignInPage from "./pages/Student/Student_SignInPage";
import Admin_SignUpPage from "./pages/Admin/Admin_SignUpPage";
import Admin_SignInPage from "./pages/Admin/Admin_SignInPage";
import Prof_SignInPage from "./pages/Prof/Prof_SignInPage";
import Prof_SignUpPage from "./pages/Prof/Prof_SignUpPage";
import Student_Detail from "./pages/Student/Student_Detail";
import Student_CertificateExample from "./pages/Student/Student_CertificateExample";
import Admin_CreateEvent from "./pages/Admin/Admin_CreateEvent";
import Student_CertificateDownload from "./pages/Student/Student_CertificateDownload";
import Admin_Homepage from "./pages/Admin/Admin_Homepage";
import Admin_EditEvent from "./pages/Admin/Admin_EditEvent";
import Prof_EventDetail from "./pages/Prof/Prof_EventDetail";
import Prof_Homepage from "./pages/Prof/Prof_Homepage";
import Admin_EventDetail from "./pages/Admin/Admin_EventDetail";
import Admin_History from "./pages/Admin/Admin_History";
import Prof_History from "./pages/Prof/Prof_History";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Student_Homepage />,
    },
    {
        path: "/login",
        element: <Student_SignInPage />,
    },
    {
        path: "/detail/:id",
        element: <Student_Detail />,
    },
    {
        path: "/certificate/:id",
        element: <Student_CertificateExample />,
    },
    {
        path: "/download/:id",
        element: <Student_CertificateDownload />,
    },
    {
        path: "/admin/register",
        element: <Admin_SignUpPage />,
    },
    {
        path: "/admin/login",
        element: <Admin_SignInPage />,
    },
    {
        path: "/admin/",
        element: <Admin_Homepage />,
    },
    {
        path: "/admin/history",
        element: <Admin_History />,
    },
    {
        path: "/admin/createEvent",
        element: <Admin_CreateEvent />,
    },
    {
        path: "/admin/editEvent/:id",
        element: <Admin_EditEvent />,
    },
    {
        path: "/admin/detail/:id",
        element: <Admin_EventDetail />,
    },
    {
        path: "/professor/register",
        element: <Prof_SignUpPage />,
    },
    {
        path: "/professor/login",
        element: <Prof_SignInPage />,
    },
    {
        path: "/professor/",
        element: <Prof_Homepage />,
    },
    {
        path: "/professor/detail/:id",
        element: <Prof_EventDetail />,
    },
    {
        path: "/professor/history",
        element: <Prof_History />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;