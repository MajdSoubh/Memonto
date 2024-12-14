import { useContext } from "react";
import ConversationCard from "../../partials/ConversationCard";
import { MessengerContext } from "../../../Contexts/MessengerContext";
import Card from "../../partials/Card";

const Converstations = () => {
  const messenger = useContext(MessengerContext);

  return (
    <Card className="w-full h-full max-md:h-auto border border-slate-200 bg-white rounded-xl max-md:py-2 overflow-y-scroll">
      <h3 className="mb-4 text-lg font-bold max-md:hidden">
        Latest Conversations
      </h3>
      <div className="flex flex-col max-md:flex-row overflow-y-scroll items-center gap-4">
        {messenger?.loadingConversations &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full">
              <ConversationCard loading={true} />
              <div className="w-[70%] max-md:hidden  border-b-2 border-slate-100 pb-3 mx-auto"></div>
            </div>
          ))}
        {!messenger?.loadingConversations &&
          messenger?.conversations.map((c) => {
            return (
              <div key={c._id} className="w-full group">
                <ConversationCard
                  className="hover:bg-black/10 cursor-pointer"
                  conversation={c}
                />
                <div className="w-[70%] max-md:hidden border-b-2  group-last:border-none border-slate-100 pb-3 mx-auto"></div>
              </div>
            );
          })}
        {!messenger?.loadingConversations &&
          messenger?.conversations.length === 0 && (
            <div className="text-sm">You don't have any chats until now.</div>
          )}
      </div>
    </Card>
  );
};

export default Converstations;
