import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import Messenger from "@pages/Messenger.jsx";
import Auth from "@pages/Auth";
import MainLayout from "./layout/MainLayout.jsx";
import { useSelector } from "react-redux";
import AuthLayout from "./layout/AuthLayout.jsx";
import Search from "./pages/Search.jsx";

function AuthGuard() {
  const token = useSelector((state) => state.userReducer.token);
  // Redirect to login if no token exists.
  return token ? <Outlet /> : <Navigate to="/login" />;
}

function GuestGuard() {
  const token = useSelector((state) => state.userReducer.token);
  // Redirect to home if token exists.
  return token ? <Navigate to="/" /> : <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/messenger/:id?" element={<Messenger />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/search/" element={<Search />} />
        </Route>
      </Route>
      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Auth />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
