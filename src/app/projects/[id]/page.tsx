import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import { getPortfolioProjectBySlug, getProfileContent } from "@/lib/portfolio";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, profile] = await Promise.all([params, getProfileContent()]);
  const project = await getPortfolioProjectBySlug(decodeURIComponent(id));

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage profileName={profile.name} project={project} />;
}
