import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getBlogPostBySlug, getProfileContent } from "@/lib/portfolio";

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, profile] = await Promise.all([params, getProfileContent()]);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} profileName={profile.name} />;
}
