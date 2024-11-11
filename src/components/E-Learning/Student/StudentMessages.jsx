import React from "react";
import Layout from "./Layout";
// import Sidebar from "./Sidebar";
// import ChatArea from "./ChatArea";

export default function StudentMessages() {
  const user = {
    name: "Mayowa Sunusi",
  };

  return (
    <Layout>
      <section className="h-[90vh]">
        <div className="main flex-1 flex flex-col">
          <div className="hidden lg:block heading flex-2">
            <h1 className="text-3xl text-gray-700 mb-4">Messages</h1>
          </div>

          <div className="flex-1 flex h-full">
            <Sidebar />
            <ChatArea user={user} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Sidebar() {
  return (
    <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
      <SearchInput />
      <ChatList />
    </div>
  );
}

function SearchInput() {
  return (
    <div className="search flex-2 pb-6 px-2">
      <input
        type="text"
        className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
        placeholder="Search"
      />
    </div>
  );
}

function ChatList() {
  const chatEntries = [
    { name: "Wisdom", message: "Yea, Sure!", time: "11:30am", unread: 23, online: true, image: '/images/user1.jpg' },
    { name: "Naomi Vehance", message: "Yea, Sure!", time: "11:30am", unread: 10, online: false, image: '/images/user2.png' },
    { name: "Mayowa Sunusi", message: "Yea, Sure!", time: "11:30am", unread: 0, online: false, active: true, image: '/images/user1.jpg' },
    { name: "Marvellous", message: "Yea, Sure!", time: "11:30am", unread: 0, online: false, image: '/images/user3.png' },
    { name: "Yusuf", message: "Yea, Sure!", time: "11:30am", unread: 0, online: false, image: '/images/user1.png' },
  ];

  return (
    <div className="flex-1 h-full overflow-auto px-2">
      {chatEntries.map((entry, index) => (
        <ChatEntry key={index} {...entry} />
      ))}
    </div>
  );
}

function ChatEntry({ name, message, time, unread, online, active, image }) {
  return (
    <div className={`entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md ${active ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <img className="w-12 h-12 rounded-full mx-auto" src={image} alt="chat-user" />
          <span className={`absolute w-4 h-4 ${online ? 'bg-green-400' : 'bg-gray-400'} rounded-full right-0 bottom-0 border-2 border-white`}></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32"><span className="text-gray-800">{name}</span></div>
        <div><small className="text-gray-600">{message}</small></div>
      </div>
      <div className="flex-2 text-right">
        <div><small className="text-gray-500">{time}</small></div>
        {unread > 0 && (
          <div>
            <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
              {unread}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatArea({ user }) {
  return (
    <div className="chat-area flex-1 flex flex-col h-[80vh]">
      <ChatHeader user={user} />
      <MessageList />
      <MessageInput />
    </div>
  );
}

function ChatHeader({ user }) {
  return (
    <div className="flex-3">
      <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">Chatting with <b>{user.name}</b></h2>
    </div>
  );
}

function MessageList() {
  const messages = [
    { sender: "Mayowa Sunusi", content: "I have been able to fix the bug, thank you sir!", time: "11:30am", isSelf: false },
    { sender: "Mayowa Sunusi", content: "One more thing!", time: "11:30am", isSelf: false },
    { sender: "You", content: "What is that?", time: "11:45am", isSelf: true },
    { sender: "You", content: "Hope it is not much of a problem!", time: "11:45am", isSelf: true },
    { sender: "Mayowa Sunusi", content: "I am having issues with deployment!", time: "03:30pm", isSelf: false },
  ];

  return (
    <div className="messages flex-1 overflow-auto">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}

function Message({ sender, content, time, isSelf }) {
  return (
    <div className={`message mb-4 flex ${isSelf ? 'text-right' : ''}`}>
      {!isSelf && (
        <div className="flex-2">
          <div className="w-12 h-12 relative">
            <img className="w-12 h-12 rounded-full mx-auto" src="/images/user1.jpg" alt="chat-user" />
            <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
          </div>
        </div>
      )}
      <div className="flex-1 px-2">
        <div className={`inline-block ${isSelf ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} rounded-full p-2 px-6`}>
          <span>{content}</span>
        </div>
        <div className={isSelf ? 'pr-4' : 'pl-4'}><small className="text-gray-500">{time}</small></div>
      </div>
    </div>
  );
}

function MessageInput() {
  return (
    <div className="flex-2 pt-4 pb-10">
      <div className="write bg-white shadow flex rounded-lg">
        <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
          <span className="block text-center text-gray-400 hover:text-gray-800">
            <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </span>
        </div>
        <div className="flex-1">
          <textarea name="message" className="w-full block outline-none py-4 px-4 bg-transparent" rows="1" placeholder="Type a message..." autoFocus></textarea>
        </div>
        <div className="flex-2 w-32 p-2 flex content-center items-center">
          <div className="flex-1 text-center">
            <span className="text-gray-400 hover:text-gray-800">
              <span className="inline-block align-text-bottom">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
              </span>
            </span>
          </div>
          <div className="flex-1">
            <button className="bg-blue-400 w-10 h-10 rounded-full inline-block">
              <span className="inline-block align-text-bottom">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-white"><path d="M5 13l4 4L19 7"></path></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}