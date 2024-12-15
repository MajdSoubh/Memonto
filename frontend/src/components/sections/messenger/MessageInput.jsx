import { useContext, useState } from "react";
import Card from "../../partials/Card.jsx";
import InputEmoji from "react-input-emoji";
import { MessengerContext } from "../../../Contexts/MessengerContext";
import { PlusIcon } from "../../../assets/icons/icons.jsx";
const MessageInput = ({ className }) => {
  const messenger = useContext(MessengerContext);
  const [message, setMessage] = useState("");
  const handleChange = (message) => {
    setMessage(message);
  };
  const handleSend = () => {
    messenger.handleSendMessage(message);
    setMessage("");
  };
  return (
    <Card
      className={
        " !h-[3rem] !gap-3 !rounded-3xl flex !flex-row items-center justify-center " +
        className
      }
    >
      <PlusIcon />
      <InputEmoji
        value={message}
        placeholder="Type your message"
        onEnter={() => message.trim().length !== 0 && handleSend()}
        onChange={handleChange}
        inputClass="w-fit h-9 focus:border-orange text-sm rounded-3xl  "
      />
      <button
        onClick={handleSend}
        disabled={message.trim().length === 0}
        className="p-2 px-4 text-center text-xs button rounded-[1rem] font-bold"
      >
        Send
      </button>
    </Card>
  );
};

export default MessageInput;
