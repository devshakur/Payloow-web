import React, { useState } from "react"
import { FiSearch, FiSmile, FiPaperclip, FiSend } from "react-icons/fi"
import Layout from "./Layout"

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null)

  const chatEntries = [
    {
      id: 1,
      name: "Wisdom",
      lastMessage: "Yea, Sure!",
      time: "11:30am",
      unread: 23,
      online: true,
      image: '/images/user1.jpg',
      messages: [
        { id: 1, content: "Hey, how's the project going?", time: "11:00am", isSelf: false },
        { id: 2, content: "I've made some progress on the frontend.", time: "11:15am", isSelf: true },
        { id: 3, content: "That's great! Can you show me?", time: "11:20am", isSelf: false },
        { id: 4, content: "Sure, I'll send you a screenshot.", time: "11:25am", isSelf: true },
        { id: 5, content: "Yea, Sure!", time: "11:30am", isSelf: false },
      ]
    },
    {
      id: 2,
      name: "Naomi Vehance",
      lastMessage: "Let's discuss the design.",
      time: "10:45am",
      unread: 10,
      online: false,
      image: '/images/user2.png',
      messages: [
        { id: 1, content: "Hi Naomi, do you have a moment?", time: "10:30am", isSelf: true },
        { id: 2, content: "Sure, what's up?", time: "10:35am", isSelf: false },
        { id: 3, content: "I wanted to talk about the new design.", time: "10:40am", isSelf: true },
        { id: 4, content: "Let's discuss the design.", time: "10:45am", isSelf: false },
      ]
    },
    {
      id: 3,
      name: "Mayowa Sunusi",
      lastMessage: "I've fixed the bug!",
      time: "09:15am",
      unread: 0,
      online: false,
      image: '/images/user1.jpg',
      messages: [
        { id: 1, content: "I've been working on that bug you mentioned.", time: "09:00am", isSelf: false },
        { id: 2, content: "Any progress?", time: "09:05am", isSelf: true },
        { id: 3, content: "Yes, I think I've found the issue.", time: "09:10am", isSelf: false },
        { id: 4, content: "I've fixed the bug!", time: "09:15am", isSelf: false },
      ]
    },
    {
      id: 4,
      name: "Marvellous",
      lastMessage: "Meeting at 2 PM?",
      time: "08:50am",
      unread: 0,
      online: false,
      image: '/images/user3.png',
      messages: [
        { id: 1, content: "Good morning! Are we still on for the meeting?", time: "08:45am", isSelf: false },
        { id: 2, content: "Yes, I believe so. What time was it again?", time: "08:48am", isSelf: true },
        { id: 3, content: "Meeting at 2 PM?", time: "08:50am", isSelf: false },
      ]
    },
    {
      id: 5,
      name: "Yusuf",
      lastMessage: "I'll send the report soon.",
      time: "Yesterday",
      unread: 0,
      online: false,
      image: '/images/user1.png',
      messages: [
        { id: 1, content: "How's the quarterly report coming along?", time: "Yesterday", isSelf: true },
        { id: 2, content: "I'm almost done with it.", time: "Yesterday", isSelf: false },
        { id: 3, content: "Great, when can I expect it?", time: "Yesterday", isSelf: true },
        { id: 4, content: "I'll send the report soon.", time: "Yesterday", isSelf: false },
      ]
    },
  ]

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        <Sidebar chatEntries={chatEntries} activeChat={activeChat} setActiveChat={setActiveChat} />
        <ChatArea activeChat={activeChat ? chatEntries.find(chat => chat.id === activeChat) : null} />
      </div>
    </Layout>
  )
}

ffunction Sidebar({ chatEntries, activeChat, setActiveChat }) {
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