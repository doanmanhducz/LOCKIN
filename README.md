# Personal Research Archive

A static personal site for research notes, vulnerability disclosures, and professional milestones.

## Local development

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run check
npm.cmd test -- --run
npm.cmd run build
```

## Publishing content

- Update identity, social links, CV path, and optional Giscus settings in `src/config/site.ts`.
- Add a Markdown file under `src/content/research/` with the required frontmatter fields.
- Add a paper, CVE, credential, acknowledgement, or career step in `src/data/hall-of-fame.ts`.
- Run `npm.cmd run check`, `npm.cmd test -- --run`, and `npm.cmd run build`, then commit and push to `main`.

GitHub Pages deploys automatically through `.github/workflows/deploy.yml`. Before enabling comments, create a GitHub Discussions category and add its Giscus IDs to the site configuration.
