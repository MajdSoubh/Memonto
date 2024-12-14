import { createContext, useEffect, useRef, useState } from "react";
import {
  createConversation,
  fetchConversations,
  fetchMessages,
  sendMessage,
} from "../redux/actions/MessengerActions.js";
import {
  disconnect,
  establishSocketConnection,
  onReceiveMessage,
} from "../socket/socket";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";

export const MessengerContext = createContext();

export const MessengerProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentConversationRef = useRef(currentConversation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state) => state.userReducer.user);
  const loadConversations = async () => {
    setLoadingConversations(true);
    try {
      const conversations = await fetchConversations();
      setLoadingConversations(false);
      setConversations(conversations);

      if (conversations?.length > 0) {
        if (params?.id) {
          const conversation = conversations.find((c) => c._id === params.id);

          if (conversation) {
            setCurrentConversation(conversation);
            currentConversationRef.current = conversation;
          } else {
            notifications.show({
              title: "Conversation Not Found",
              message: "You are trying to access a non-existent conversation.",
              position: "top-center",
              color: "orange",
            });
          }
        } else setCurrentConversation(conversations[0]);
      }
    } catch (error) {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname.startsWith("/messenger")) {
      loadConversations();
      dispatch({ type: "READ_MESSAGE_NOTIFICATIONS" });
    }
  }, [window.location.pathname]);

  useEffect(() => {
    establishSocketConnection(user._id);

    // Listen for incoming messages
    onReceiveMessage((message) => {
      if (window.location.pathname.startsWith("/messenger")) {
        if (message.sender._id === user._id) return;
        if (currentConversationRef?.current?._id === message.conversationId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      } else {
        dispatch({
          type: "PUSH_NOTIFICATION",
          level: "messeage",
          data: message,
        });
      }
    });

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentConversation) {
      currentConversationRef.current = currentConversation;

      fetchMessages(currentConversation._id).then((messages) => {
        if (messages) setMessages(messages);
      });
    }
  }, [currentConversation]);

  const selectConversation = (conversation) => {
    setCurrentConversation(conversation);
  };
  const handleSendMessage = (message) => {
    if (currentConversation) {
      const receiverId = getReceiver(currentConversation.members)?._id;
      sendMessage({
        text: message,
        receiverId,
        conversationId: currentConversation._id,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, updatedAt: new Date().toISOString(), sender: user },
      ]);
    }
  };

  const getReceiver = (members) => {
    const filteredMembers = members.filter((member) => member._id !== user._id);
    if (filteredMembers.length > 0) return filteredMembers[0];
    else return user;
  };

  const startConversation = async (userId) => {
    try {
      const conversation = await createConversation(userId);
      if (conversation) {
        navigate(`/messenger/${conversation._id}`);
      }
    } catch (ex) {}
  };
  return (
    <MessengerContext.Provider
      value={{
        conversations,
        selectConversation,
        startConversation,
        currentConversation,
        loadingConversations,
        messages,
        handleSendMessage,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
