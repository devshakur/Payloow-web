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

// export default function MessageTab({ courseMessages = [], courseId, tutorId }) {
//   const [expandedMessage, setExpandedMessage] = useState(null);
//   const socketRef = useRef(null);
//   const [replies, setReplies] = useState({});
//   const [localMessages, setLocalMessages] = useState(courseMessages);
//   const [users, setUsers] = useState({});
//   const [isSending, setIsSending] = useState(false);
//   const [isRepliesLoading, setIsRepliesLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({ message_id: "", text: "" });
//   const [payload, setPayload] = useState({
//     chatId: "", // Will be constructed dynamically
//     message: "", // The message text
//     senderId: "", // Current user ID
//     receiverId: "", // Target user ID (e.g., tutor)
//   });

//   const { fetchCourseReplies } = useCourse(courseId);

//   // Variants for animation
//   const messageVariant = {
//     hidden: { opacity: 0, height: 0 },
//     visible: { opacity: 1, height: "auto" },
//   };

//   const replyVariant = {
//     hidden: { opacity: 0, height: 0 },
//     visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
//   };

//   // Connect to socket
//   useEffect(() => {
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
//           const response = await axios.get(
//             `{{base_url}}/v1/e-learning/live-messaging/messages/${chatId}` // Replace with your API endpoint
//           );
//           setLocalMessages(response.data);
//         } catch (error) {
//           console.error("❌ Fetch previous messages error:", error);
//           toast.error("Failed to load previous messages");
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

//     return () => {
//       socket.disconnect();
//     };
//   }, [courseId, tutorId]);

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
//     const receiverId = tutorId; // Get this based on your course data

//     const chatId = [senderId, receiverId].sort().join("_");

//     const messagePayload = {
//       chatId,
//       message: payload.message,
//       senderId,
//       receiverId,
//     };

//     if (!messagePayload.message.trim()) return;
//     setIsSending(true);

//     try {
//       socketRef.current.emit("sendMessage", messagePayload);
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
//       socketRef.current.emit("send_reply", replyData);
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

//   return (
//     <div className="message-container space-y-4">
//       {localMessages.length > 0 ? (
//         localMessages.map((message) => (
//           <motion.div
//             key={message._id || message.chatId + message.senderId + message.message} // Use a combination of fields for key
//             className="bg-white shadow-md rounded-lg p-4"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={messageVariant}
//           >
//             <div>
//               <p
//                 className="font-semibold cursor-pointer flex justify-between"
//                 onClick={() => handleMessageClick(message._id)}
//               >
//                 <span>{message.senderId}</span> {/* Display senderId */}
//                 <span className="text-sm text-gray-500">
//                   {expandedMessage === message._id ? "▲" : "▼"}
//                 </span>
//               </p>
//               <p className="pl-2">{message.message}</p>
//             </div>

//             <AnimatePresence>
//               {expandedMessage === message._id && (
//                 <motion.div
//                   className="mt-4 space-y-2"
//                   initial="hidden"
//                   animate="visible"
//                   exit="hidden"
//                   variants={replyVariant}
//                 >
//                   {isRepliesLoading ? (
//                     <p>Loading replies...</p>
//                   ) : replies[message._id]?.length > 0 ? (
//                     replies[message._id].map((reply) => (
//                       <div
//                         key={reply._id}
//                         className="bg-gray-100 p-3 rounded-md"
//                       >
//                         <p className="font-bold">
//                           {reply.senderId || "Unknown"}
//                         </p>
//                         <p className="text-sm">{reply.text}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-500">
//                       No replies for this message.
//                     </p>
//                   )}

//                   <form
//                     onSubmit={(e) => handleReplyMessage(e, message._id)}
//                     className="flex gap-2 mt-3"
//                   >
//                     <input
//                       type="text"
//                       className="form-input flex-1 rounded-full"
//                       placeholder="Type reply..."
//                       value={formData.text}
//                       onChange={handleMessageChange}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="bg-primary px-4 py-2 rounded-md text-white"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "..." : "Reply"}
//                     </button>
//                   </form>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))
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

import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useCourse } from "../../../hooks/useCourse";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Import axios
import { endpoints } from "../../../api/Endpoint";

export default function MessageTab({ courseMessages = [], courseId, tutorId }) {
  const [expandedMessage, setExpandedMessage] = useState(null);
  const socketRef = useRef(null);
  const [replies, setReplies] = useState({});
  const [localMessages, setLocalMessages] = useState([]); // Initialize as an empty array
  const [users, setUsers] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ message_id: "", text: "" });
  const [payload, setPayload] = useState({
    chatId: "", // Will be constructed dynamically
    message: "", // The message text
    senderId: "", // Current user ID
    receiverId: "", // Target user ID (e.g., tutor)
  });

  const { fetchCourseReplies } = useCourse(courseId);

  // Variants for animation
  const messageVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const replyVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  // Connect to socket
  useEffect(() => {
    const socket = io("wss://api.payloow.com", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
      const chatId = [senderId, tutorId].sort().join("_");
      socket.emit("joinRoom", chatId);

      // Fetch previous messages
      const fetchPreviousMessages = async () => {
        try {
          const response = await axios.get(
            endpoints.getReplies(chatId)
          );
          setLocalMessages(response.data);
        } catch (error) {
          console.error("❌ Fetch previous messages error:", error);
          toast.error("Failed to load previous messages");
        }
      };

      fetchPreviousMessages();
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("receiveMessage", (newMessage) => {
      console.log("📥 New message received:", newMessage);
      setLocalMessages((prev) => [...prev, newMessage]);
    });

    socket.on("new_reply", ({ messageId, reply }) => {
      console.log("📥 New reply received:", reply);
      setReplies((prev) => ({
        ...prev,
        [messageId]: [...(prev[messageId] || []), reply],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [courseId, tutorId]);

  // Toggle replies
  const handleMessageClick = async (messageId) => {
    if (expandedMessage === messageId) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(messageId);
      if (!replies[messageId]) {
        setIsRepliesLoading(true);
        try {
          const fetched = await fetchCourseReplies(messageId);
          setReplies((prev) => ({ ...prev, [messageId]: fetched }));
        } catch (err) {
          console.error("❌ Fetch replies error:", err);
        } finally {
          setIsRepliesLoading(false);
        }
      }
    }
  };

  const handleTextChange = (e) => {
    setPayload({ ...payload, message: e.target.value }); // Changed text to message
  };

  const handleMessageChange = (e) => {
    setFormData({ ...formData, text: e.target.value });
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
    const receiverId = tutorId; // Get this based on your course data

    const chatId = [senderId, receiverId].sort().join("_");

    const messagePayload = {
      chatId,
      message: payload.message,
      senderId,
      receiverId,
    };

    if (!messagePayload.message.trim()) return;
    setIsSending(true);

    try {
      socketRef.current.emit("sendMessage", messagePayload);
      toast.success("Message sent");
      setLocalMessages((prev) => [...prev, messagePayload]); //optimistic update
    } catch (err) {
      console.error("Send message error:", err);
      toast.error("Failed to send message");
    } finally {
      setPayload({
        chatId: "",
        message: "",
        senderId: "",
        receiverId: "",
      });
      setIsSending(false);
    }
  };

  const handleReplyMessage = async (e, messageId) => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    setIsLoading(true);
    try {
      const senderId = JSON.parse(localStorage.getItem("currentUser"))._id;
      const replyData = { ...formData, message_id: messageId, senderId };
      socketRef.current.emit("send_reply", replyData);
      toast.success("Reply sent");
      const updatedReplies = await fetchCourseReplies(messageId);
      setReplies((prev) => ({ ...prev, [messageId]: updatedReplies }));
    } catch (err) {
      console.error("❌ Reply error:", err);
      toast.error("Failed to send reply");
    } finally {
      setFormData({ message_id: "", text: "" });
      setIsLoading(false);
    }
  };

  return (
    <div className="message-container space-y-4">
      {Array.isArray(localMessages) && localMessages.length > 0 ? ( // Check if localMessages is an array
        localMessages.map((message) => {
          const sender = JSON.parse(localStorage.getItem("currentUser"));
          return (
            <motion.div
              key={message._id || message.chatId + message.senderId + message.message} // Use a combination of fields for key
              className="bg-white shadow-md rounded-lg p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={messageVariant}
            >
              <div>
                <p
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => handleMessageClick(message._id)}
                >
                  <div className="flex items-center space-x-2">
                    {sender?.profilePicture && (
                      <img
                        src={sender?.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span>{sender?.firstName} {sender?.lastName}</span> {/* Display sender's name */}
                  </div>
                  <span className="text-sm text-gray-500">
                    {expandedMessage === message._id ? "▲" : "▼"}
                  </span>
                </p>
                <p className="pl-2">{message.message}</p>
              </div>

              <AnimatePresence>
                {expandedMessage === message._id && (
                  <motion.div
                    className="mt-4 space-y-2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={replyVariant}
                  >
                    {isRepliesLoading ? (
                      <p>Loading replies...</p>
                    ) : replies[message._id]?.length > 0 ? (
                      replies[message._id].map((reply) => (
                        <div
                          key={reply._id}
                          className="bg-gray-100 p-3 rounded-md"
                        >
                          <p className="font-bold">
                            {reply.senderId || "Unknown"}
                          </p>
                          <p className="text-sm">{reply.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No replies for this message.
                      </p>
                    )}

                    <form
                      onSubmit={(e) => handleReplyMessage(e, message._id)}
                      className="flex gap-2 mt-3"
                    >
                      <input
                        type="text"
                        className="form-input flex-1 rounded-full"
                        placeholder="Type reply..."
                        value={formData.text}
                        onChange={handleMessageChange}
                        required
                      />
                      <button
                        type="submit"
                        className="bg-primary px-4 py-2 rounded-md text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "..." : "Reply"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })
      ) : (
        <p className="text-gray-600">No messages yet.</p>
      )}

      {/* Send new message */}
      <div className="pt-6">
        <p className="mb-2">Send a message</p>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            className="form-input flex-1 rounded-full"
            placeholder="Type message here..."
            value={payload.message}
            onChange={handleTextChange}
            required
          />
          <button
            type="submit"
            className="bg-primary px-5 py-3 rounded-md text-white"
            disabled={isSending}
          >
            {isSending ? <div className="loader"></div> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}