import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="p-4 text-black overflow-hidden bg-[#f3f3f3] h-dvh ">
      <div className="circle -top-[30%] right-[0%]"></div>
      <div className="circle bottom-[10%] -left-[30%]"></div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
