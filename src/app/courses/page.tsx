import React from "react";
import { courseService } from "@/services/courseService";
import { CoursesPageContent } from "@/components/sections/CoursesPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Courses in Pratappur | Vision IT Computer Institute",
  description: "Explore our wide range of professional computer courses including DCA, PGDCA, Tally, and Web Development at Vision IT Computer Institute Pratappur.",
};

export default async function CoursesPage() {
  // Fetch courses on the server
  const courses = await courseService.getCourses(true); // onlyPublished = true

  return <CoursesPageContent initialCourses={courses} />;
}
