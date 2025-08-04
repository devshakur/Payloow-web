// "use client";

// import React, {
//   useState,
//   useEffect,
//   useRef,
// } from "react";
// import { io } from "socket.io-client";
// import { useCourse } from "../../../hooks/useCourse";
// import { toast } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios"; // Import axios
// import { endpoints } from "../../../api/Endpoint";
// import { useRouter } from "../../../Routes/router"; // Import useRouter

// export default function MessageTab({ courseMessages = [], courseId, tutorId }) {
//   const [expandedMessage, setExpandedMessage] = useState(null);
//   const socketRef = useRef(null);
//   const [replies, setReplies] = useState({});
//   const [localMessages, setLocalMessages] = useState([]); // Initialize as an empty array
//   const [users, setUsers] = useState({});
//   const [isSending, setIsSending] = useState(false);
//   const [isRepliesLoading, setIsRepliesLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({ message_id: "", text: "" });
//   const [payload, setPayload] = useState({
//     chatId: "", 
//     message: "", // The message text
//     senderId: "", // Current user ID
//     receiverId: "", 
//   });



//   const { fetchCourseReplies } = useCourse(courseId);
//   const router = useRouter(); // Initialize router

//   // Variants for animation
//   const messageVariant = {
//     hidden: { opacity: 0, height: 0 },
//     visible: { opacity: 1, height: "auto" },
//   };

//   const replyVariant = {
//     hidden: { opacity: 0, height: 0 },
//     visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
//   };

//   // Load messages from local storage on component mount
//   useEffect(() => {
//     const storedMessages = localStorage.getItem(`messages-${courseId}-${tutorId}`);
//     if (storedMessages) {
//       setLocalMessages(JSON.parse(storedMessages));
//     }
//   }, [courseId, tutorId]);

//   // Connect to socket
//   useEffect(() => {
//     if (!tutorId) return; // Prevent socket setup if tutorId is undefined

//     const socket = io("wss://api.payloow.com", {
//       transports: ["websocket"],
//     });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket.id);
//       const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
//       const chatId = [senderId, tutorId].sort().join("_");
//       socket.emit("joinRoom", chatId);

//       // Fetch previous messages
//       const fetchPreviousMessages = async () => {
//         try {
//           const token = localStorage.getItem("auth"); // Get token from local storage
//           const response = await axios.get(
//             endpoints.getReplies(chatId),
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Include token in header
//               },
//             }
//           );
//           setLocalMessages(response.data);
//         } catch (error) {
//           console.error("❌ Fetch previous messages error:", error);
//           if (error?.response?.data?.msg === "-middleware/token-expired") {
//             toast.error("Session expired, please log in again");
//           } else {
//             toast.error("Failed to load previous messages");
//           }
//         }
//       };

//       fetchPreviousMessages();
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Socket connection error:", err.message);
//     });

//     socket.on("receiveMessage", (newMessage) => {
//       console.log("📥 New message received:", newMessage);
//       setLocalMessages((prev) => [...prev, newMessage]);
//     });

//     socket.on("new_reply", ({ messageId, reply }) => {
//       console.log("📥 New reply received:", reply);
//       setReplies((prev) => ({
//         ...prev,
//         [messageId]: [...(prev[messageId] || []), reply],
//       }));
//     });

//     socket.on("messageRead", ({ messageId }) => {
//       console.log(`Message ${messageId} has been read`);
//       // Update message status in localMessages
//       setLocalMessages(prevMessages => {
//         return prevMessages.map(msg => {
//           if (msg._id === messageId) {
//             return { ...msg, isRead: true };
//           }
//           return msg;
//         });
//       });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [courseId, tutorId]);

//   // Store messages in local storage whenever localMessages changes
//   useEffect(() => {
//     localStorage.setItem(`messages-${courseId}-${tutorId}`, JSON.stringify(localMessages));
//   }, [localMessages, courseId, tutorId]);

//   // Toggle replies
//   const handleMessageClick = async (messageId) => {
//     if (expandedMessage === messageId) {
//       setExpandedMessage(null);
//     } else {
//       setExpandedMessage(messageId);
//       if (!replies[messageId]) {
//         setIsRepliesLoading(true);
//         try {
//           const fetched = await fetchCourseReplies(messageId);
//           setReplies((prev) => ({ ...prev, [messageId]: fetched }));
//         } catch (err) {
//           console.error("❌ Fetch replies error:", err);
//         } finally {
//           setIsRepliesLoading(false);
//         }
//       }
//     }
//   };

//   const handleTextChange = (e) => {
//     setPayload({ ...payload, message: e.target.value }); // Changed text to message
//   };

//   const handleMessageChange = (e) => {
//     setFormData({ ...formData, text: e.target.value });
//   };
//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
//     // const receiverId = tutorId; // Get this based on your course data
//     if (!tutorId) {
//       console.error("tutorId is undefined");
//       return;
//     }

//     const chatId = [senderId, tutorId].sort().join("_");

//     const messagePayload = { // Payload according to the guide
//       chatId: `${senderId}_${tutorId}`,
//       message: payload.message,
//       senderId:senderId,
//       receiverId: tutorId,
//     };

//     if (!messagePayload.message.trim()) return;
//     setIsSending(true);

//     try {
//       socketRef.current.emit("sendMessage", messagePayload); // Emit without token
//       toast.success("Message sent");
//       setLocalMessages((prev) => [...prev, messagePayload]); //optimistic update
//     } catch (err) {
//       console.error("Send message error:", err);
//       toast.error("Failed to send message");
//     } finally {
//       setPayload({
//         chatId: "",
//         message: "",
//         senderId: "",
//         receiverId: "",
//       });
//       setIsSending(false);
//     }
//   };

//   const handleReplyMessage = async (e, messageId) => {
//     e.preventDefault();
//     if (!formData.text.trim()) return;
//     setIsLoading(true);
//     try {
//       const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
//       const replyData = { ...formData, message_id: messageId, senderId };
//       socketRef.current.emit("send_reply", replyData); // Emit without token
//       toast.success("Reply sent");
//       const updatedReplies = await fetchCourseReplies(messageId);
//       setReplies((prev) => ({ ...prev, [messageId]: updatedReplies }));
//     } catch (err) {
//       console.error("❌ Reply error:", err);
//       toast.error("Failed to send reply");
//     } finally {
//       setFormData({ message_id: "", text: "" });
//       setIsLoading(false);
//     }
//   };

//   const handleTyping = (chatId, userId) => {
//     socketRef.current.emit("typing", { chatId, userId });
//   };

//   const handleStopTyping = (chatId, userId) => {
//     socketRef.current.emit("stopTyping", { chatId, userId });
//   };

//   const handleMarkAsRead = (messageId) => {
//     socketRef.current.emit("markAsRead", { messageId });
//   };

//   return (
//     <div className="message-container space-y-4">
//       {Array.isArray(localMessages) && localMessages.length > 0 ? (
//         localMessages.map((message) => {
//           const sender = JSON.parse(localStorage.getItem("currentUser"));
//           return (
//             <motion.div
//               key={message._id || message.chatId + message.senderId + message.message}
//               className="bg-white shadow-md rounded-lg p-4"
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               variants={messageVariant}
//             >
//               <div>
//                 <p
//                   className="font-semibold cursor-pointer flex justify-between items-center"
//                   onClick={() => handleMessageClick(message._id)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     {sender?.profilePicture && (
//                       <img
//                         src={sender?.profilePicture}
//                         alt="Profile"
//                         className="w-8 h-8 rounded-full"
//                       />
//                     )}
//                     <span>{sender?.firstName} {sender?.lastName}</span>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {expandedMessage === message._id ? "▲" : "▼"}
//                   </span>
//                 </p>
//                 <p className="pl-2">{message.message}</p>
//                 {message.isRead && <span className="text-xs text-gray-500">Read</span>}
//               </div>

//               <AnimatePresence>
//                 {expandedMessage === message._id && (
//                   <motion.div
//                     className="mt-4 space-y-2"
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                     variants={replyVariant}
//                   >
//                     {isRepliesLoading ? (
//                       <p>Loading replies...</p>
//                     ) : replies[message._id]?.length > 0 ? (
//                       replies[message._id].map((reply) => (
//                         <div
//                           key={reply._id}
//                           className="bg-gray-100 p-3 rounded-md"
//                         >
//                           <p className="font-bold">
//                             {reply.senderId || "Unknown"}
//                           </p>
//                           <p className="text-sm">{reply.text}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">
//                         No replies for this message.
//                       </p>
//                     )}

//                     <form
//                       onSubmit={(e) => handleReplyMessage(e, message._id)}
//                       className="flex gap-2 mt-3"
//                     >
//                       <input
//                         type="text"
//                         className="form-input flex-1 rounded-full"
//                         placeholder="Type reply..."
//                         value={formData.text}
//                         onChange={handleMessageChange}
//                         required
//                       />
//                       <button
//                         type="submit"
//                         className="bg-primary px-4 py-2 rounded-md text-white"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? "..." : "Reply"}
//                       </button>
//                     </form>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })
//       ) : (
//         <p className="text-gray-600">No messages yet.</p>
//       )}

//       {/* Send new message */}
//       <div className="pt-6">
//         <p className="mb-2">Send a message</p>
//         <form onSubmit={handleSendMessage} className="flex gap-2">
//           <input
//             type="text"
//             className="form-input flex-1 rounded-full"
//             placeholder="Type message here..."
//             value={payload.message}
//             onChange={handleTextChange}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-primary px-5 py-3 rounded-md text-white"
//             disabled={isSending}
//           >
//             {isSending ? <div className="loader"></div> : "Send"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function MessageTab({ courseId, tutorId }) {
  const [messages, setMessages] = useState([]);
  const [payload, setPayload] = useState({ message: "" });
  const [formData, setFormData] = useState({ message_id: "", text: "" });
  const [replies, setReplies] = useState({});
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const sender = JSON.parse(localStorage.getItem("currentUser"));
  const senderId = sender?._id;
  const chatId = [senderId, tutorId].sort().join("_");

  // Connect socket and setup listeners
  useEffect(() => {
    if (!senderId || !tutorId) return;

    const socket = io("wss://api.payloow.com", { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("registerUser", senderId);
      socket.emit("joinRoom", chatId);
      socket.emit("getChatHistory", chatId);
    });

    socket.on("chatHistory", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ userId }) => {
      setTypingUsers((prev) => [...new Set([...prev, userId])]);
    });

    socket.on("stopTyping", ({ userId }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.on("messageRead", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, isRead: true } : msg))
      );
    });

    socket.on("newMessageNotification", (notification) => {
      console.log("🔔 New notification:", notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [senderId, tutorId]);

  const handleTyping = () => {
    socketRef.current.emit("typing", { chatId, userId: senderId });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("stopTyping", { chatId, userId: senderId });
    }, 1500);
  };

const handleSendMessage = (e) => {
  e.preventDefault();
  if (!payload.message.trim()) return;

  const messageData = {
    chatId,
    message: payload.message,
    senderId,
    receiverId: tutorId,
  };

  setIsSending(true);
  socketRef.current.emit("sendMessage", messageData);

  // 🔔 Emit new message notification to tutor
  socketRef.current.emit("newMessageNotification", {
    chatId,
    senderId,
    message: payload.message,
  });

  setPayload({ message: "" });
  setIsSending(false);
};


  const handleMarkAsRead = (messageId) => {
    socketRef.current.emit("markAsRead", { messageId });
  };

  const handleMessageClick = (messageId) => {
    if (expandedMessage === messageId) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(messageId);
      handleMarkAsRead(messageId);
    }
  };

  const messageVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <motion.div
          key={msg._id}
          className="bg-white shadow-md rounded-lg p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={messageVariant}
        >
          <div onClick={() => handleMessageClick(msg._id)}>
            <p className="font-semibold cursor-pointer">
              {msg.senderId === senderId ? "You" : "Tutor"}: {msg.message}
            </p>
            {msg.isRead && <span className="text-xs text-gray-500">Read</span>}
          </div>

          <AnimatePresence>
            {expandedMessage === msg._id && (
              <motion.div
                className="mt-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={messageVariant}
              >
                <p className="text-gray-400 italic text-sm">Replies not implemented here</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {typingUsers.includes(tutorId) && (
        <p className="text-sm italic text-gray-400">Tutor is typing...</p>
      )}

      <form onSubmit={handleSendMessage} className="flex gap-2 pt-4">
        <input
          type="text"
          className="form-input flex-1 rounded-full"
          placeholder="Type message..."
          value={payload.message}
          onChange={(e) => {
            setPayload({ ...payload, message: e.target.value });
            handleTyping();
          }}
          required
        />
        <button
          type="submit"
          className="bg-primary px-5 py-3 rounded-md text-white"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
