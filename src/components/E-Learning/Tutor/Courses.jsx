import React from "react";
import Layout from "./Layout";
import CreateCourseBanner from "./CreateCourseBanner";
import CourseList from "./CourseList";

const Courses = () => {
  return (
    <Layout>
      <CreateCourseBanner />
      <CourseList />
    </Layout>
  );
};

export default Courses;
