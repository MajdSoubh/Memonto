import { useContext, useEffect, useState } from "react";
import { Avatar, Skeleton } from "@mantine/core";
import { useSelector } from "react-redux";
import { MessengerContext } from "../../Contexts/MessengerContext";

const ConversationCard = ({
  conversation,
  className,
  loading = false,
  lastMessage = "",
}) => {
  const user = useSelector((state) => state.userReducer.user);
  const messenger = useContext(MessengerContext);
  const [receiver, setReceiver] = useState(null);
  const getReceiver = (members) => {
    const filteredMembers = members.filter((member) => member._id !== user._id);
    if (filteredMembers.length > 0) return filteredMembers[0];
    else return user;
  };
  useEffect(() => {
    if (conversation) setReceiver(getReceiver(conversation.members));
  }, [conversation]);

  return (
    <div
      onClick={() => messenger.selectConversation(conversation)}
      className={
        "flex gap-2 justify-start items-center w-full p-2 rounded-2xl " +
        className
      }
    >
      {loading && (
        <>
          <div className="rounded-full relative ">
            <Skeleton height={"55"} width={"55"} circle />
          </div>
          <div className=" w-[50%] flex flex-col gap-2">
            <Skeleton height={8} width={"50%"} radius="xl" />
            <Skeleton height={8} width={"90%"} radius="xl" />
          </div>
        </>
      )}
      {!loading && (
        <>
          <div className="rounded-full relative ">
            <Avatar
              src={receiver?.avatar}
              size={55}
              radius={80}
              name={receiver?.firstname + " " + receiver?.lastname}
            />
            {receiver?.active && (
              <div className="absolute top-0 right-0 bg-green-600 rounded-full w-2 h-2"></div>
            )}
          </div>
          <div className="">
            <p className="text-[14px] font-bold">
              {receiver?.firstname + " " + receiver?.lastname}
            </p>
            {lastMessage && (
              <p className="text-[12px] text-slate-500  ">{lastMessage}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationCard;
