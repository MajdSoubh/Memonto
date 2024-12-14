import { useContext, useEffect, useRef } from "react";
import Card from "../../partials/Card.jsx";
import Message from "../../partials/Message.jsx";
import ConversationCard from "../../partials/ConversationCard.jsx";
import { MessengerContext } from "../../../Contexts/MessengerContext";
import { ConversationIcon } from "../../../assets/icons/icons.jsx";

const MessagesBox = ({ className }) => {
  const messagesContainer = useRef(null);
  const messenger = useContext(MessengerContext);
  // Always scroll to last Message
  useEffect(() => {
    if (messagesContainer?.current) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messenger?.messages]);
  return (
    <Card className={"!pt-0 !px-2 flex flex-col overflow-y-auto " + className}>
      {messenger?.currentConversation && (
        <ConversationCard
          className="py-3 border-b-2 border-slate-100"
          conversation={messenger?.currentConversation}
        />
      )}
      <div
        ref={messagesContainer}
        className="flex flex-col h-full overflow-auto gap-1 w-full mt-1"
      >
        {messenger?.messages.map((message, index) => (
          <Message
            key={index}
            message={message.text}
            sender={message.sender}
            time={message.updatedAt}
          />
        ))}
        {messenger?.messages.length === 0 && (
          <div className=" h-full self-center mt-4 text-slate-400">
            <ConversationIcon />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MessagesBox;
