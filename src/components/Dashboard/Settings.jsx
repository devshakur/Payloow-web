import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import ChangeEmail from "./Settings/ChangeEmail";
import ChangePassword from "./Settings/ChangePassword";
import ChangeProfilePicture from "./Settings/ChangeProfilePicture";

const Settings = () => {
  return (
    <DashboardLayout>
      <TabGroup className="md:flex w-full md:space-x-10">
        <TabList className="flex flex-col md:w-[20%] justify-start text-left gap-5 h-full">
          <h3 className="md:text-3xl text-2xl font-semibold mb-5">
            Account Settings
          </h3>
          <div className="flex md:flex-col md:gap-5 gap-2">
            <Tab className="settings-tab"><span className="md:block hidden">Change</span> Email</Tab>
            <Tab className="settings-tab"><span className="md:block hidden">Change</span> Password</Tab>
            <Tab className="settings-tab"><span className="md:block hidden">Add</span> Profile Picture</Tab>
          </div>
        </TabList>
        <TabPanels className="md:w-[80%] bg-white h-screen md:p-10 p-5 md:mt-0 mt-10">
          <TabPanel>
            <ChangeEmail />
          </TabPanel>
          <TabPanel>
            <ChangePassword />
          </TabPanel>
          <TabPanel>
            <ChangeProfilePicture />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DashboardLayout>
  );
};

export default Settings;
