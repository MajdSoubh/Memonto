import { Avatar, Indicator, Skeleton } from "@mantine/core";
import { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import BackgroundImagePlaceHolder from "@images/bg-placeholder.png";
import { useDispatch } from "react-redux";
import {
  followUser,
  unFollowUser,
  updateUser,
} from "../../redux/actions/UserActions.js";
import Card from "../partials/Card";
import { MessengerContext } from "../../Contexts/MessengerContext";
import { notifications } from "@mantine/notifications";
import {
  BackgroundIcon,
  AvatarIcon,
  ChatIcon,
} from "../../assets/icons/icons.jsx";

const ProfileView = ({ data, onFollowUser, onUnFollowUser }) => {
  const dispatch = useDispatch();
  const messenger = useContext(MessengerContext);
  const user = useSelector((state) => state.userReducer.user);
  const avatarRef = useRef();
  const backgroundImageRef = useRef();

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

  const handleFollow = () => {
    followUser(data?.profile?._id).then((message) => {
      notifications.show({
        ...message,
        position: "top-center",
        color: "orange",
      });
      onFollowUser();
    });
  };
  const handleUnFollow = () => {
    unFollowUser(data?.profile?._id).then((message) => {
      notifications.show({
        ...message,
        position: "top-center",
        color: "orange",
      });
      onUnFollowUser();
    });
  };
  return (
    <Card>
      {/* Background Image */}
      {data?.loading && (
        <Skeleton className="h-[13rem] -mt-6 w-[120%] -mx-6 relative rounded-t-xl  " />
      )}
      {!data?.loading && (
        <div
          className="h-[13rem] md:-mt-5 md:-mx-5 max-md:-mx-3 max-md:-mt-3  relative bg-cover bg-center rounded-t-xl  bg-no-repeat "
          style={{
            backgroundImage: `url(${
              data?.profile?.backgroundImage
                ? data?.profile?.backgroundImage
                : BackgroundImagePlaceHolder
            })`,
          }}
          onClick={() =>
            !data?.profile?.backgroundImage
              ? backgroundImageRef.current.click()
              : null
          }
        >
          {!data?.profile?.backgroundImage &&
            data?.profile._id === user._id && (
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
      )}
      {/* Avatar */}
      <div className=" relative w-fit mx-auto">
        {data?.loading && <Skeleton height={80} circle mx="auto" mt={-30} />}
        {!data?.loading && (
          <Indicator
            color="green"
            offset={7}
            processing
            zIndex={0}
            disabled={!data?.profile?.active}
          >
            {!data?.profile?.avatar && data?.profile._id === user._id && (
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
              src={data?.profile?.avatar}
              name={data?.profile?.firstname + " " + data?.profile?.lastname}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
              onClick={() =>
                !data?.profile?.avatar ? avatarRef.current.click() : null
              }
              className="border border-solid border-slate-200"
            />
          </Indicator>
        )}
      </div>
      {/* Details */}
      {data?.loading && (
        <div className=" mt-2 flex flex-col items-center justify-center">
          <Skeleton height={8} mt={6} width="40%" radius="xl" />
          <Skeleton height={8} mt={6} width="50%" radius="xl" />
        </div>
      )}
      {!data?.loading && (
        <>
          <p className="text-center  text-lg font-bold mt-3">
            {data?.profile?.firstname + " " + data?.profile?.lastname}
          </p>
          <p className=" text-center text-md mt-3">{data?.profile?.title}</p>
          <div className="flex gap-7 mt-3 justify-center">
            <div>
              <p className=" text-center text-lg font-semibold">
                {data?.profile?.followers?.length}
              </p>
              <p className=" text-center text-sm text-slate-500">Followers</p>
            </div>
            <div>
              <p className=" text-center text-lg font-semibold">
                {data?.profile?.following?.length}
              </p>
              <p className=" text-center text-sm text-slate-500">Following</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-3">
            <button
              onClick={() => messenger.startConversation(data?.profile?._id)}
              className="group p-[8px] w-1/3 text-center text-xs button rounded-[1rem] font-bold"
            >
              <ChatIcon />
            </button>
            {user._id !== data?.profile?._id && (
              <>
                {!data?.profile?.followers?.includes(user._id) && (
                  <button
                    onClick={handleFollow}
                    className="p-[8px]  w-1/3  text-center text-xs button rounded-[1rem] font-bold"
                  >
                    Follow
                  </button>
                )}
                {data?.profile?.followers?.includes(user._id) && (
                  <button
                    onClick={handleUnFollow}
                    className="p-[8px]  w-1/3  text-center text-xs button rounded-[1rem] font-bold"
                  >
                    Un Follow
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
export default ProfileView;
