import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/data/blog";
import { BlogDetailView } from "@/components/views/BlogDetailView";
import { blogService } from "@/services/blogService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Try Firestore first, then static
  let post = await blogService.getPostById(id);
  if (!post) post = staticPosts[id];
  
  if (!post) return { title: "Article Not Found | Vision IT" };
  
  return {
    title: `${post.title} | Vision IT Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Try Firestore first, then static
  let post = await blogService.getPostById(id);
  if (!post) post = staticPosts[id];

  if (!post) {
    notFound();
  }

  // Fetch all posts to get related (dynamic and static)
  const allFirestore = await blogService.getPosts();
  const firestoreIds = new Set(allFirestore.map(p => p.id));
  const combined = [
    ...allFirestore,
    ...Object.values(staticPosts).filter(p => !firestoreIds.has(p.id))
  ];

  const relatedPosts = combined
    .filter(p => p.id !== post!.id)
    .slice(0, 2);

  return <BlogDetailView post={post} relatedPosts={relatedPosts} />;
}
