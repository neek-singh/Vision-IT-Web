import { Metadata } from "next";
import { notFound } from "next/navigation";
import { coursesData } from "@/data/courses";
import { CourseDetailView } from "@/components/views/CourseDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { courseService } from "@/services/courseService";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try dynamic first
  let course = await courseService.getCourseById(slug);
  
  // Fallback to static
  if (!course) {
    course = coursesData[slug];
  }

  if (!course) return { title: "Course Not Found | Vision IT" };
  
  return {
    title: `${course.title} - ${course.fullName} | Vision IT Computer Institute`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Vision IT`,
      description: course.description,
      type: "article",
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try dynamic first
  let course = await courseService.getCourseById(slug);
  
  // Fallback to static
  if (!course) {
    course = coursesData[slug];
  }

  if (!course) {
    notFound();
  }

  return <CourseDetailView course={course} />;
}
