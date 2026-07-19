import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import { getPortfolioPageData } from "@/lib/portfolio";

export default async function Home() {
  const { profile, projects, blogPosts, skills, stats } = await getPortfolioPageData();

  return (
    <>
      <HeroSection name={profile.name} />

      <main className="relative max-w-7xl mx-auto pb-8 pt-8 md:pt-12 px-1 md:px-4">
        <AboutSection profile={profile} skills={skills} stats={stats} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={profile.experience} />
        <BlogSection posts={blogPosts} />
        <ContactSection profile={profile} />

        <div className="text-center py-8 text-[10px] text-fg-faint tracking-[0.3em] uppercase">
          -- END OF TAPE --
        </div>
      </main>
    </>
  );
}
