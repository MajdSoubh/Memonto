import { calcPassedTime } from "../../helpers/Helpers.js";
import { useSelector } from "react-redux";

const Message = ({ message, time, sender }) => {
  const user = useSelector((state) => state.userReducer.user);
  const isCurrentUser = () => sender._id === user._id;
  return (
    <div
      className={
        "   text-white p-3 rounded-xl w-fit " +
        (isCurrentUser()
          ? "self-end bg-blueGradient rounded-ee-none"
          : "self-start bg-buttonBg rounded-es-none")
      }
    >
      <p className="text-sm"> {message}</p>
      <span className="text-xs text-end block mt-1">
        {calcPassedTime(time)}
      </span>
    </div>
  );
};

export default Message;
