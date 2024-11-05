import { Outlet } from "react-router-dom";
import authMiddleware from "./middleware/authMiddleware";

function App() {
  return <Outlet />;
}

export default authMiddleware(App);