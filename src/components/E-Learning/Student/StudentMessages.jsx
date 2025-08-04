import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSmile, FiPaperclip, FiSend } from "react-icons/fi";
import Layout from "./Layout";
import { io } from "socket.io-client";

export default function StudentMessages() {
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState({});
  const [chatEntries, setChatEntries] = useState([]);

  const socketRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const tutorId = currentUser?._id;

  useEffect(() => {
    if (!tutorId) return;

    const socket = io("wss://api.payloow.com", { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Connected to WebSocket");
      socket.emit("registerUser", tutorId);
      socket.emit("notificationMessage", tutorId); // triggers list of studentIds
    });

    socket.on("notificationMessage", (studentId) => {
      const id = Array.isArray(studentId) ? studentId : [studentId];
      id.forEach((sId) => {
        const chatId = [tutorId, sId].sort().join("_");

        socket.emit("joinRoom", chatId);
        socket.emit("getChatHistory", chatId);
      });
    });

    socket.on("chatHistory", (msgs) => {
      if (!msgs || msgs.length === 0) return;
      const chatId = msgs[0].chatId;
      const lastMsg = msgs[msgs.length - 1];
      const studentId = lastMsg.senderId === tutorId ? lastMsg.receiverId : lastMsg.senderId;
      const user = lastMsg.senderId === tutorId ? lastMsg.receiver : lastMsg.sender;

      // Update message state by chatId
      setMessages((prev) => ({ ...prev, [chatId]: msgs }));

      // Only add if not already present
      setChatEntries((prev) => {
        const exists = prev.find((c) => c.id === studentId);
        if (exists) return prev;
        return [
          ...prev,
          {
            id: studentId,
            chatId,
            name: user?.name || "Student",
            profile: user?.profilePicture || null,
            lastMessage: lastMsg.message,
            time: new Date(lastMsg.timestamp || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            online: true,
          },
        ];
      });
    });

    socket.on("receiveMessage", (msg) => {
      const chatId = msg.chatId;
      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), msg],
      }));
    });

    return () => socket.disconnect();
  }, [tutorId]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;

    const chatId = activeChat.chatId;
    const payload = {
      chatId,
      message: messageText,
      senderId: tutorId,
      receiverId: activeChat.id,
    };

    socketRef.current.emit("sendMessage", payload);
    socketRef.current.emit("newMessageNotification", {
      chatId,
      senderId: tutorId,
      message: messageText,
    });

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), payload],
    }));
    setMessageText("");
  };

  const getChatMessages = () => {
    if (!activeChat) return [];
    return messages[activeChat.chatId] || [];
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          chatEntries={chatEntries}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatArea
          activeChat={activeChat}
          messageText={messageText}
          setMessageText={setMessageText}
          handleSendMessage={handleSendMessage}
          getChatMessages={getChatMessages}
        />
      </div>
    </Layout>
  );
}

// Sidebar and Chat UI remains the same from your current component — no need to rewrite here


function Sidebar({ chatEntries, activeChat, setActiveChat }) {
  return (
    <div className="w-1/3 flex flex-col border-r bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      <div className="p-4">
        <SearchInput />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList chatEntries={chatEntries} activeChat={activeChat} setActiveChat={setActiveChat} />
      </div>
    </div>
  )
}

function SearchInput() {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function ChatList({ chatEntries, activeChat, setActiveChat }) {
  return (
    <div className="space-y-2 p-4">
      {chatEntries.map((entry) => (
        <ChatEntry
          key={entry.id}
          {...entry}
          active={activeChat === entry.id}
          onClick={() => setActiveChat(entry.id)}
        />
      ))}
    </div>
  )
}

function ChatEntry({ id, name, lastMessage, time, unread, online, image, active, onClick }) {
  return (
    <div
      className={`flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-100 cursor-pointer ${active ? "bg-gray-100" : ""
        }`}
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-12 h-12 rounded-full" />
        {online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
          <span className="text-xs font-medium text-white">{unread}</span>
        </div>
      )}
    </div>
  )
}

function ChatArea({ activeChat }) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {activeChat ? (
        <>
          <ChatHeader name={activeChat.name} image={activeChat.image} online={activeChat.online} />
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList messages={activeChat.messages} />
          </div>
          <MessageInput />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-lg text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}

function ChatHeader({ name, image, online }) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img src={image} alt={name} className="w-10 h-10 rounded-full" />
          {online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    </div>
  )
}

function MessageList({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  )
}

function Message({ content, time, isSelf }) {
  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
      <div className={`rounded-lg p-4 max-w-xs ${isSelf ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
        <p className="text-sm">{content}</p>
        <p className={`"mt-1 text-xs" ${isSelf ? "text-white text-xs" : "text-gray-500 text-xs"}`}>{time}</p>
      </div>
    </div>
  )
}

function MessageInput() {
  return (
    <div className="border-t p-4">
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-1 resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          rows={1}
        />
        <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Add emoji">
          <FiSmile className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Attach file">
          <FiPaperclip className="h-6 w-6" />
        </button>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" aria-label="Send message">
          <FiSend className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}