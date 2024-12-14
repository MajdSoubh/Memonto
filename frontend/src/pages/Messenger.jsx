import MessagesBox from "@components/sections/messenger/MessagesBox";
import Converstations from "../components/sections/messenger/Converstations.jsx";
import MessageInput from "../components/sections/messenger/MessageInput.jsx";
import SidebarRight from "../components/sections/SidebarRight.jsx";

const Chat = () => {
  return (
    <>
      <div className="max-md:hidden relative h-full grid grid-cols-[18rem_minmax(34rem,auto)] items-center grid-rows-[minmax(0,_1fr)] gap-4">
        <Converstations />
        <SidebarRight>
          <MessagesBox className="grow" />
          <MessageInput />
        </SidebarRight>
      </div>
      <div className="h-[calc(var(--real-vh)-80px)] relative md:hidden flex flex-col gap-2">
        <Converstations />
        <MessagesBox className="grow" />
        <MessageInput />
      </div>
    </>
  );
};

export default Chat;
