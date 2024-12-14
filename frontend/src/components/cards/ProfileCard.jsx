import { Avatar, Indicator } from "@mantine/core";
import { useRef } from "react";
import { useSelector } from "react-redux";
import BackgroundImagePlaceHolder from "@images/bg-placeholder.png";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/UserActions.js";
import Card from "../partials/Card.jsx";
import { Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { BackgroundIcon, AvatarIcon } from "../../assets/icons/icons.jsx";
const ProfileCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const onImageChange = (event) => {
    const image = event.target?.files[0];
    dispatch(updateUser({ [event.target.name]: image })).then(() => {
      notifications.show({
        message: "Your Profile image has been updated.",
        position: "top-center",
        color: "orange",
      });
      close();
    });
  };

  const avatarRef = useRef();
  const backgroundImageRef = useRef();
  return (
    <Card className=" min-w-[15rem]">
      <div
        className="h-[10rem] -mt-6 -mx-6 relative bg-cover bg-center rounded-t-xl  bg-no-repeat "
        style={{
          backgroundImage: `url(${
            user.backgroundImage
              ? user.backgroundImage
              : BackgroundImagePlaceHolder
          })`,
        }}
        onClick={() =>
          !user.backgroundImage ? backgroundImageRef.current.click() : null
        }
      >
        {!user.backgroundImage && (
          <>
            <input
              onChange={onImageChange}
              name="backgroundImage"
              type="file"
              className="hidden"
              ref={backgroundImageRef}
            />
            <BackgroundIcon />
          </>
        )}
      </div>
      {/* Avatar */}
      <div className=" relative w-fit mx-auto">
        {/* {loading && <Skeleton height={80} circle mx="auto" mt={-30} />} */}

        <Indicator color="green" offset={7} disabled={!user?.active}>
          {!user.avatar && (
            <>
              <input
                onChange={onImageChange}
                name="avatar"
                type="file"
                className="hidden"
                ref={avatarRef}
              />
              <AvatarIcon onClick={() => avatarRef.current.click()} />
            </>
          )}
          <Avatar
            src={user.avatar}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            onClick={() => (!user.avatar ? avatarRef.current.click() : null)}
            className="border border-solid border-slate-200"
          />
        </Indicator>
      </div>

      <p className="text-center  text-lg font-bold mt-3">
        {user?.firstname + " " + user?.lastname}
      </p>
      <p className=" text-center text-md mt-3">{user?.title}</p>
      <div className="flex gap-7 mt-4 justify-center">
        <div>
          <p className=" text-center text-lg font-semibold">
            {user?.followers?.length}
          </p>
          <p className=" text-center text-sm text-slate-500">Followers</p>
        </div>
        <div>
          <p className=" text-center text-lg font-semibold">
            {user?.following?.length}
          </p>
          <p className=" text-center text-sm text-slate-500">Following</p>
        </div>
      </div>
      <Link
        to="/profile"
        className=" group mt-5 -mb-2 w-full  text-center text-sm button font-bold"
      >
        My Profile
      </Link>
    </Card>
  );
};
export default ProfileCard;
