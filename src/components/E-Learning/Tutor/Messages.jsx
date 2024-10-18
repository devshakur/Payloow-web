import React, { useState } from "react";
import Layout from "./Layout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IoFilterOutline } from "react-icons/io5";

const Messages = () => {
  const messages = [
    {
      userImage: "/images/user1.png",
      userName: "John Doe",
      userMessage: "How do I get started with HTML?",
      replyToMessage: null,
    },
    {
      userImage: "/images/user2.png",
      userName: "John Doe",
      userMessage: "You can start by learning the basic tags.",
      replyToMessage: "How do I get started with HTML?",
    },
    {
      userImage: "/images/user3.png",
      userName: "John Doe",
      userMessage: "What are the best practices for using Figma?",
      replyToMessage: null,
    },
  ];

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };
  return (
    <>
      <Layout>
        <div className="">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-3 bg-white w-64 rounded-lg p-4">
              <IoFilterOutline />
              <select name="courses" id="courses" className="bg-transparent w-full outline-none">
                <option value="">Filter by courses</option>
                <option value="intro-to-html">Introduction to HTML</option>
                <option value="intro-to-figma">Introduction to Figma</option>
              </select>
            </div>
          </div>
          <TabGroup>
            <TabList className="flex items-center mb-5">
              <Tab className="border-b data-[selected]:border-b-primary px-10 data-[selected]:text-primary pb-3 focus:outline-none cursor-pointer">
                Questions
              </Tab>
              <Tab className="border-b data-[selected]:border-b-primary px-10 data-[selected]:text-primary pb-3 focus:outline-none cursor-pointer">
                Announcements
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="flex w-full h-[80vh] md:space-x-10">
                  <div className="space-y-6 md:w-[40%] h-full overflow-y-scroll pr-10 border-r">
                    <h3 className="text-2xl">Introduction to Figma</h3>
                    <div className="space-y-8">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          onClick={() => handleMessageClick(message)}
                          className="flex items-center space-x-4 cursor-pointer"
                        >
                          <img src={message.userImage} alt="user Image" />
                          <div className="space-y-3">
                            <h4 className="text-xl font-medium">{message.userName}</h4>
                            <p>{message.userMessage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-[60%] flex flex-col h-full border rounded-lg p-10 ">
                    <div className="h-full overflow-y-scroll flex-1">
                      {selectedMessage ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="border-b pb-5 w-full mb-5">
                              <h4 className="text-xl font-medium">{selectedMessage.userName}</h4>
                              <p>Online</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <img
                              src={selectedMessage.userImage}
                              alt="user Image"
                              className="w-12 h-12 rounded-full"
                            />
                            <p className="bg-white text-lg p-5 rounded-3xl rounded-bl-none mr-20 max-w-sm">
                              {selectedMessage.userMessage}
                            </p>
                          </div>
                          {selectedMessage.replyToMessage && (
                            <div className="flex items-center space-x-3 justify-end">
                              <p className="bg-primary text-white p-5 rounded-3xl rounded-br-none mt-2 max-w-sm">
                                {selectedMessage.replyToMessage}
                              </p>
                              <img
                                src={selectedMessage.userImage}
                                alt="user Image"
                                className="w-12 h-12 rounded-full"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center">Select a message to view details</p>
                      )}
                    </div>
                    {selectedMessage && (  // Only show input area when a message is selected
                      <div className="w-full h-10 bg-background flex items-center justify-between space-x-5">
                        <input
                          type="text"
                          name="message"
                          id="message"
                          placeholder="Type a message"
                          className="w-full outline-none bg-white p-4 placeholder:text-sm border rounded-xl"
                        />
                        <button className="bg-primary text-white px-10 py-4 whitespace-nowrap rounded-xl">
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Layout>
    </>
  );
};

export default Messages;
