import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSmile, FiPaperclip, FiSend } from "react-icons/fi";
import Layout from "./Layout";
import { io } from "socket.io-client";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatEntries, setChatEntries] = useState([]);

  const socketRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const tutorId = currentUser?._id;

  const dummyChatId = "6887a5ee14dbebf50145a9b8_6887b57f960e3c142c076dd3";

 useEffect(() => {
  if (!tutorId) return;

  const socket = io("wss://api.payloow.com", { transports: ["websocket"] });
  socketRef.current = socket;

  socket.on("connect", () => {
    console.log("🟢 Connected to WebSocket");
    socket.emit("registerUser", tutorId);
    socket.emit("notificationMessage", tutorId);
     socket.emit("joinRoom", dummyChatId);
     socket.emit("getChatHistory", dummyChatId);
    
  });

  socket.on("notificationMessage", (studentId) => {
    console.log("📩 notificationMessage received:", studentId);

    // Proceed only if connected
    if (socket.connected) {
      console.log("📡 Emitting joinRoom and getChatHistory");
      socket.emit("joinRoom", dummyChatId);
      socket.emit("getChatHistory", dummyChatId);
    }
  });

  socket.on("chatHistory", (msgs) => {
    console.log("📜 chatHistory received:", msgs);
    setMessages(msgs);

    if (msgs.length) {
      const lastMsg = msgs[msgs.length - 1];
      const user = lastMsg.senderId === tutorId ? lastMsg.receiver : lastMsg.sender;

      setChatEntries([
        {
          id: dummyChatId.split("_").find((id) => id !== tutorId),
          name: user?.name || "Student",
          profile: user?.profilePicture || null,
          message: lastMsg.message,
          time: new Date(lastMsg.timestamp || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  });

  socket.on("receiveMessage", (msg) => {
    console.log("📥 New message received:", msg);
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    console.log("🔌 Disconnected from WebSocket");
    socket.disconnect();
  };
}, [tutorId]);


  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;

    const chatId = dummyChatId;
    const payload = {
      chatId,
      message: messageText,
      senderId: tutorId,
      receiverId: activeChat,
    };

    socketRef.current.emit("sendMessage", payload);
    socketRef.current.emit("newMessageNotification", {
      chatId,
      senderId: tutorId,
      message: messageText,
    });

    setMessages((prev) => [...prev, payload]);
    setMessageText("");
  };

  const getChatMessages = () =>
    messages.filter((msg) => msg.chatId === dummyChatId);

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          chatEntries={chatEntries}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatArea
          activeChat={chatEntries.find((chat) => chat.id === activeChat)}
          messageText={messageText}
          setMessageText={setMessageText}
          handleSendMessage={handleSendMessage}
          getChatMessages={getChatMessages}
        />
      </div>
    </Layout>
  );
}
Sidebar

// import React, { useState, useEffect, useRef } from "react";
// import { FiSearch, FiSmile, FiPaperclip, FiSend } from "react-icons/fi";
// import Layout from "./Layout";
// import { io } from "socket.io-client";

// export default function Messages() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [messageText, setMessageText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatEntries, setChatEntries] = useState([]);

//   const socketRef = useRef(null);
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const tutorId = currentUser?._id;

//   if (socketRef.current) {
//   socketRef.current.disconnect();
// }


//   useEffect(() => {
//     if (!tutorId) return;

//     const socket = io("wss://api.payloow.com", { transports: ["websocket"] });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("🟢 Connected to WebSocket");
//       socket.emit("registerUser", tutorId);
//       socket.emit("notificationMessage", tutorId);
//     });

     
    
//     socket.on("notificationMessage", (studentId) => {
//       console.log("📩 notificationMessage received:", studentId);

//       if (!studentId || !tutorId) return;

//       const chatId = [tutorId, studentId].sort().join("_");
//       console.log("📡 Computed chatId:", chatId);

//       setActiveChat(studentId); // So we can use it when sending messages

//       socket.emit("joinRoom", chatId);
//       socket.emit("getChatHistory", chatId);
//     });

//     socket.on("chatHistory", (msgs) => {
//       console.log("📜 chatHistory received:", msgs);
//       setMessages(msgs);

//       if (msgs.length) {
//         const lastMsg = msgs[msgs.length - 1];
//         const chatId = lastMsg.chatId;
//         const studentId = chatId.split("_").find((id) => id !== tutorId);
//         const user = lastMsg.senderId === tutorId ? lastMsg.receiver : lastMsg.sender;

//         setChatEntries([
//           {
//             id: studentId,
//             name: user?.name || "Student",
//             profile: user?.profilePicture || null,
//             message: lastMsg.message,
//             time: new Date(lastMsg.timestamp || Date.now()).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ]);
//       }
//     });

//     socket.on("receiveMessage", (msg) => {
//       console.log("📥 New message received:", msg);
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       console.log("🔌 Disconnected from WebSocket");
//       socket.disconnect();
//     };
//   }, [tutorId]);

//   const handleSendMessage = () => {
//     if (!messageText.trim() || !activeChat) return;

//     const chatId = [tutorId, activeChat].sort().join("_");
//     const payload = {
//       chatId,
//       message: messageText,
//       senderId: tutorId,
//       receiverId: activeChat,
//     };

//     socketRef.current.emit("sendMessage", payload);
//     socketRef.current.emit("newMessageNotification", {
//       chatId,
//       senderId: tutorId,
//       message: messageText,
//     });

//     setMessages((prev) => [...prev, payload]);
//     setMessageText("");
//   };

//   const getChatMessages = () => {
//     if (!activeChat || !tutorId) return [];
//     const chatId = [tutorId, activeChat].sort().join("_");
//     return messages.filter((msg) => msg.chatId === chatId);
//   };

//   return (
//     <Layout>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar
//           chatEntries={chatEntries}
//           activeChat={activeChat}
//           setActiveChat={setActiveChat}
//         />
//         <ChatArea
//           activeChat={chatEntries.find((chat) => chat.id === activeChat)}
//           messageText={messageText}
//           setMessageText={setMessageText}
//           handleSendMessage={handleSendMessage}
//           getChatMessages={getChatMessages}
//         />
//       </div>
//     </Layout>
//   );
// }

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
        <ChatList
          chatEntries={chatEntries}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      </div>
    </div>
  );
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
  );
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
  );
}

function ChatEntry({ id, name, lastMessage, time, unread, online, image, initials, active, onClick }) {
  return (
    <div
      className={`flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-100 cursor-pointer ${
        active ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative w-12 h-12">
        {image ? (
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
            {initials}
          </div>
        )}
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
  );
}


// Chat Area
function ChatArea({
  activeChat,
  messageText,
  setMessageText,
  handleSendMessage,
  getChatMessages,
}) {
  const messages = activeChat ? getChatMessages() : [];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {activeChat ? (
        <>
          <ChatHeader
            name={activeChat.name}
            image={activeChat.image}
            online={activeChat.online}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList messages={messages} />
          </div>
          <MessageInput
            messageText={messageText}
            setMessageText={setMessageText}
            handleSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-lg text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
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
  );
}

// Message display
function MessageList({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <Message key={msg._id || idx} {...msg} />
      ))}
    </div>
  );
}

function Message({ senderId, sender, message }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isSelf = currentUser?._id === senderId;

  const name = sender?.name || "Unknown";
  const profileImage =
    sender?.profilePicture || "https://i.pravatar.cc/100?u=" + senderId;

  return (
    <div className={`flex items-end ${isSelf ? "justify-end" : "justify-start"}`}>
      {!isSelf && (
        <img
          src={profileImage}
          alt={name}
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}
      <div
        className={`rounded-lg p-3 max-w-xs ${
          isSelf ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm">{message}</p>
        {!isSelf && <p className="mt-1 text-xs text-gray-500">{name}</p>}
      </div>
    </div>
  );
}

function MessageInput({ messageText, setMessageText, handleSendMessage }) {
  return (
    <div className="border-t p-4">
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-1 resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          rows={1}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FiSmile className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FiPaperclip className="h-6 w-6" />
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          <FiSend className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
