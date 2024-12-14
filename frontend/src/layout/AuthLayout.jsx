import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="p-4 text-black overflow-hidden bg-[#f3f3f3] h-dvh ">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
