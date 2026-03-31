import React from "react";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CoursesGrid } from "@/components/sections/CoursesGrid";
import { Faculty } from "@/components/sections/Faculty";
import { MissionVision } from "@/components/sections/MissionVision";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { FAQ } from "@/components/sections/FAQ";

import { facultyService } from "@/services/facultyService";
import { testimonialService } from "@/services/testimonialService";
import { blogService } from "@/services/blogService";
import { courseService } from "@/services/courseService";
import { heroService } from "@/services/heroService";
import { faqService } from "@/services/faqService";

export default async function Home() {
  // Fetch data in parallel for better performance
  const [facultyData, testimonialData, blogData, allCourses, heroSlides, faqs] = await Promise.all([
    facultyService.getFaculty(true),
    testimonialService.getTestimonials(true),
    blogService.getPosts(true),
    courseService.getCourses(true),
    heroService.getSlides(true),
    faqService.getFaqs(true)
  ]);

  // Filter for top courses only (ADCA, Tally, Web)
  const topCourseIds = ["adca", "tally", "web"];
  const topCourses = allCourses.filter((c: any) => topCourseIds.includes(c.id));

  return (
    <>
      <Hero initialSlides={heroSlides} />
      <WhyChooseUs />
      <CoursesGrid initialCourses={topCourses} />
      <Faculty initialMembers={facultyData} />
      <MissionVision />
      <Testimonials initialTestimonials={testimonialData} />
      <LatestBlog initialPosts={blogData} />
      <FAQ initialFaqs={faqs} />
    </>
  );
}
