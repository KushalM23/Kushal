import { notFound } from "next/navigation";
import { getProjectsData } from "@/data/projects";
import ProjectPageClient from "./ProjectPageClient";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = (await getProjectsData()).find((item) => item.id === Number(id));
  if (!project) notFound();
  return <ProjectPageClient params={params} project={project} />;
}
