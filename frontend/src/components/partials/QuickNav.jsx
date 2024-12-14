import { FC } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/UserActions.js";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ActiveHomeIcon,
  HomeIcon,
  ActiveMessengerIcon,
  MessengerIcon,
  ActiveProfileIcon,
  ProfileIcon,
  ActiveSearchIcon,
  SearchIcon,
  NotificationIcon,
  LogoutIcon,
} from "../../assets/icons/icons.jsx";
import Card from "./Card.jsx";

const QuickNav = ({ className = "" }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.userReducer.notifications);
  const hanldeLogout = () => {
    dispatch(logout());
  };
  return (
    <Card
      className={
        "!p-4  w-full h-16 rounded-none sticky z-10 top-0 right-0 left-0 flex justify-between items-center md:hidden " +
        className
      }
    >
      <NavLink to="/">
        {({ isActive }) => {
          return (
            <div className="relative ">
              {isActive && (
                <>
                  <ActiveHomeIcon />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2  bg-orange w-10 h-1"></div>
                </>
              )}
              {!isActive && <HomeIcon />}
            </div>
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
              {isActive && (
                <>
                  <ActiveMessengerIcon />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2  bg-orange w-10 h-1"></div>
                </>
              )}
              {!isActive && <MessengerIcon />}
            </div>
          );
        }}
      </NavLink>
      <NavLink to="/profile">
        {({ isActive }) => {
          return (
            <div className="relative">
              {isActive && (
                <>
                  <ActiveProfileIcon />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2  bg-orange w-10 h-1"></div>
                </>
              )}
              {!isActive && <ProfileIcon />}
            </div>
          );
        }}
      </NavLink>
      <NavLink to="/search">
        {({ isActive }) => {
          return (
            <div className="relative">
              {isActive && (
                <>
                  <ActiveSearchIcon />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2  bg-orange w-10 h-1"></div>
                </>
              )}
              {!isActive && <SearchIcon />}
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
    </Card>
  );
};

export default QuickNav;
