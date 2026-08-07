# Personal Research Site Design

## Goal

Replace the existing full-stack productivity application with a public, English-only personal research site. The site presents a concise personal profile, security research writing, professional recognition, a downloadable CV, and moderated discussion without operating a custom backend or database.

## Product Boundaries

The first release includes `About`, `Research`, individual research articles, and `Hall of Fame` pages. It excludes accounts, contact forms, analytics, search engines, a custom API, a database, and an authoring dashboard.

The source repository is public on GitHub. The published site is a static GitHub Pages deployment. New articles and achievements are published through Git commits.

## Stack

- Astro generates fully static HTML, CSS, and minimal client-side JavaScript.
- Markdown files hold research articles; frontmatter holds their metadata.
- TypeScript modules hold structured Hall of Fame records and site configuration.
- CSS variables and locally bundled web fonts establish the visual system.
- GitHub Actions builds the site and deploys the generated `dist` directory to GitHub Pages on pushes to `main`.
- Giscus embeds a GitHub Discussions thread below each research article. The embed is omitted until its repository/discussion configuration values are provided.

## Information Architecture

### Global navigation

The header contains `About`, `Research`, and `Hall of Fame`. A compact wordmark returns to the home page. The footer repeats social links and a short archive note.

### Home

The home page introduces the person as a researcher, security practitioner, and writer. It includes a portrait placeholder, a short summary, recent research entries, and a restrained Hall of Fame callout. It is an index, not a long resume.

### About

The page has a profile opening with full name and nickname placeholders, a short professional/personal summary, work passions, interests, social links, and a portrait placeholder. A small CV call-to-action links to a PDF kept in `public/`. Social destinations are configured in one data file so the page and footer stay consistent.

### Research

This is the complete writing archive. Article cards display title, date, excerpt, tags, and one content type: `CVE Analysis`, `Paper Notes`, `Disclosure`, or `Field Note`. Readers can filter the list client-side by type and tags. Each article route renders its Markdown body, a table of contents when headings exist, external references, related entries based on shared tags, and Giscus comments when configured.

### Hall of Fame

The page presents a chronological, grouped record of public papers, CVE identifiers, certificates, bounty-program acknowledgements, and career milestones. It draws from typed local data rather than Markdown so each record has consistent fields and can link to a conference, CVE record, credential issuer, or acknowledgement source.

## Content Models

### Research article frontmatter

Every article requires `title`, `description`, `publishedAt`, `type`, `tags`, and `draft`. It may include `cveIds`, `references`, `featured`, and `coverLabel`. Drafts build locally but are excluded from the production archive.

### Hall of Fame record

Every record has `kind`, `title`, `date`, `organization`, `summary`, and optional `url`. Kinds are `paper`, `cve`, `certification`, `acknowledgement`, and `career`.

### Site configuration

One configuration module holds the name/nickname placeholders, summary, social URLs, CV filename, Giscus configuration, and navigation labels. Placeholder values are visibly safe defaults and do not link to a real external profile.

## Visual Direction: Night Essay

The visual language is literary and editorial rather than futuristic. The primary canvas is warm paper (`#ece7dc`) with near-black ink (`#161513`), muted grey-brown supporting text, fine dark rules, and a restrained oxblood accent for small stamps only. Large, expressive serif display text contrasts with a compact monospace face for labels, dates, and metadata.

Dark blocks mark transitions or portrait/achievement areas, never dominate the page. There are no gradients, neon colors, parallax, animated illustrations, or stock photography. A geometric portrait placeholder is used until a real photo is supplied.

The layout must remain readable at 320px wide: navigation wraps or condenses, multi-column sections stack, and touch targets remain usable. Motion is limited to a short page-enter fade and respectful hover/focus transitions; `prefers-reduced-motion` disables them.

## Data and Publishing Flow

1. The author adds or edits Markdown and data files locally.
2. Astro validates content collections during the build.
3. A local production build generates `dist/` and reports invalid frontmatter or broken internal routes.
4. Pushing `main` runs the GitHub Pages workflow and publishes the static output.
5. When configured, Giscus maps an article URL to a GitHub Discussion. Moderation, deletion, locking, and blocking happen in GitHub Discussions, not on the site.

## Error Handling

- Invalid article frontmatter fails the build with a clear error; it never silently publishes malformed research content.
- Missing optional CV, portrait, social URL, Giscus configuration, or achievement URL suppresses only that element and leaves the surrounding page intact.
- Unknown research types and Hall of Fame kinds are rejected during the build.
- The Giscus block is opt-in: absent configuration renders an unobtrusive `Discussion is not configured yet` note rather than a broken third-party iframe.
- A custom static 404 page keeps the archive navigable when a route is invalid.

## Verification

- Run formatting, static type/content checks, and a production build before each commit.
- Add focused tests for article metadata validation and related-article selection.
- Verify all named routes, article generation, filters, CV URL, social links, responsive breakpoints, reduced-motion behavior, and the 404 page in a local browser.
- Confirm the GitHub Pages workflow produces a deployable static artifact before enabling it on `main`.

## Migration

During implementation, delete the old Express, MongoDB, Vite, Docker, productivity-dashboard, and legacy documentation files from the repository working tree. Preserve existing Git history; the replacement is a normal commit so prior content remains recoverable from older commits.
