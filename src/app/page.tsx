import React from "react";
import { Hero } from "@/components/sections/Hero"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CoursesGrid } from "@/components/sections/CoursesGrid";
import dynamic from "next/dynamic";

const Faculty = dynamic(() => import("@/components/sections/Faculty").then(mod => mod.Faculty));
const MissionVision = dynamic(() => import("@/components/sections/MissionVision").then(mod => mod.MissionVision));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials));
const LatestBlog = dynamic(() => import("@/components/sections/LatestBlog").then(mod => mod.LatestBlog));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <CoursesGrid />
      <Faculty />
      <MissionVision />
      <Testimonials />
      <LatestBlog />
      <FAQ />
    </>
  );
}
