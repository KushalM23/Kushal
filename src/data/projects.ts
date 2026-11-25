import { projectSources, type Project } from "./content";

function repositoryName(url: string, index: number) {
  return url.split("/").pop()?.replace(/\.git$/, "") || `Project ${index + 1}`;
}

function addedText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function addedList(value: unknown) {
  return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [];
}

export function getProjectsData(): Project[] {
  return projectSources.map((source, index): Project => {
    const resolved = {
        id: index + 1,
        title: repositoryName(source.github, index),
        description: "// NO_PROJECT_DESCRIPTION_ADDED",
        longDescription: "// NO_OVERVIEW_DATA_ADDED",
        architecture: "// NO_ARCHITECTURE_DATA_ADDED",
        features: [],
        techStack: [],
        github: source.github,
        live: source.live,
        funFacts: source.funFacts,
        ...source.overrides,
    };

    return {
        ...resolved,
        title: addedText(resolved.title, "// NO_PROJECT_TITLE_ADDED"),
        description: addedText(resolved.description, "// NO_PROJECT_DESCRIPTION_ADDED"),
        longDescription: addedText(resolved.longDescription, "// NO_OVERVIEW_DATA_ADDED"),
        architecture: addedText(resolved.architecture, "// NO_ARCHITECTURE_DATA_ADDED"),
        features: addedList(resolved.features),
        techStack: addedList(resolved.techStack),
        funFacts: addedList(resolved.funFacts),
    };
  });
}
