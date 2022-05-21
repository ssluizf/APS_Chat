import {
  useLocation,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

function App() {
  const PrivativeContainer = () => {
    const location = useLocation();
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    return isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace state={{ location }} />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivativeContainer />}
        >
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
