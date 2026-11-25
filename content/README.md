# Portfolio content

Edit `portfolio.json` to update the portfolio without editing application code.

- `profileData`: name, bio, contact links, photo, resume, and site metadata.
- `experienceData`: work history and bullet points.
- `blogData`: posts, excerpts, dates, slugs, and post content.
- `projects`: manually reviewed project content, repository links, live URLs, screenshots, and fun facts.

Project content is intentionally authored from repository inspection and stored directly in `portfolio.json`. The `overrides` object can contain any project field when a repository-derived detail needs a manual correction:

```json
{
  "github": "https://github.com/owner/repository",
  "overrides": {
    "title": "Display name",
    "description": "A short portfolio summary."
  }
}
```
