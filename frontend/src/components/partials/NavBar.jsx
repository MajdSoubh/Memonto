import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/UserActions.js";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ActiveHomeIcon,
  HomeIcon,
  ActiveMessengerIcon,
  MessengerIcon,
  NotificationIcon,
  LogoutIcon,
} from "../../assets/icons/icons.jsx";
const NavBar = ({ className }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.userReducer.notifications);
  const hanldeLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      className={
        "min-w-[15rem] w-full max-w-[18rem] h-[3rem]  flex self-end justify-between items-center  " +
        className
      }
    >
      <NavLink to="/">
        {({ isActive }) => {
          return (
            <>
              {isActive && <ActiveHomeIcon />}
              {!isActive && <HomeIcon />}
            </>
          );
        }}
      </NavLink>
      <NavLink to="/messenger">
        {({ isActive }) => {
          return (
            <div className="relative">
              {notifications?.messages?.length !== 0 && (
                <div className="absolute -bottom-1 -right-1 text-white text-xs text-center bg-orange rounded-full w-4 h-4">
                  {notifications.messages.length}
                </div>
              )}
              {isActive && <ActiveMessengerIcon />}
              {!isActive && <MessengerIcon />}
            </div>
          );
        }}
      </NavLink>
      <div>
        <NotificationIcon />
      </div>
      <div
        onClick={hanldeLogout}
        className="rounded-full w-[32px] h-[32px] flex justify-center items-center"
      >
        <LogoutIcon />
      </div>
    </div>
  );
};

export default NavBar;
