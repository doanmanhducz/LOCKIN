# Content, Routing, and Career Path Polish Design

## Goal

Correct GitHub Pages project-site navigation, replace residual template copy with a personal voice, refine the Career Path into a readable field-notes timeline, and turn the two published papers into editable research notes.

## Routing

The deployment remains a GitHub Pages project site at `/LOCKIN/`. A shared path helper prefixes every internal route with Astro's configured base URL. Header navigation, home-page research links, article cards, 404 recovery, and any internal calls-to-action use that helper. External links, anchor links, mailto links, and the IEEE paper URL remain unmodified.

## About Voice

The opening states that Doan Manh Duc, also known as Dokja Doan / doanmanhducz, works where AI security research meets practical offensive thinking. The text is short, first-person in spirit, and avoids generic portfolio claims. The only public contact is the existing email link; no telephone number or unredacted CV is published.

## Career Path

The Hall of Fame becomes a single `Career Path` sequence. It uses a fine vertical rule, restrained oxblood year markers, large serif role names, compact organization labels, and one short contribution statement for each role. Reverse chronological order is retained: NAB Innovation Centre Vietnam, INSECLAB TeamQ, then Lien Phat Technology Corporation. The landing-page Hall of Fame marketing band and generic footer copy are removed.

## Research Notes

The two paper pages use their published titles and concise, editable note structures: a personal opening, the problem being explored, the approach, what remains interesting, and a short source link. They do not invent unpublished experiments, author roles, data, or claims. The RIVF paper links to `https://ieeexplore.ieee.org/document/11365186`; the ACIIDS paper keeps a visible placeholder source link until one is supplied.

## Verification

- Unit test the path helper with `/LOCKIN/` base behavior.
- Run the existing unit suite, Astro check, and production build.
- Confirm build output uses `/LOCKIN/` for internal navigation and includes both article routes.
