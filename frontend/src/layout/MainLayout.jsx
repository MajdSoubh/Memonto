import { Outlet } from "react-router-dom";
import Footer from "@components/partials/Footer";
import { MessengerProvider } from "../Contexts/MessengerContext";
import QuickNav from "../components/partials/QuickNav";

function MainLayout() {
  return (
    <MessengerProvider>
      <div className="bg-[#f3f3f3] h-full">
        <div className="circle -top-[100px] right-[40px]"></div>
        <div className="circle top-2/4 right-[18rem]"></div>
        <div className="h-max">
          <QuickNav />
          <main className="p-2 md:h-screen max-md:min-h-[calc(100%-4rem)]">
            <Outlet />
          </main>
          {/* <Footer className="hidden md:h-[5%]" /> */}
        </div>
      </div>
    </MessengerProvider>
  );
}

export default MainLayout;
