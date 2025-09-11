# Copilot Instructions for AI Agents

## Project Overview

- This is a [Fresh](https://fresh.deno.dev/) project using Deno, with Tailwind
  CSS and daisyUI for UI components.
- Main entry: `main.ts`. App routes are in `routes/`, components in
  `components/`, and interactive islands in `islands/`.
- Data for the app is imported from `components/data.ts`.
- The project uses a single-page app structure with server-side rendering and
  islands for interactivity.

## Key Files & Structure

- `routes/`: Route handlers and page components (e.g., `index.tsx`,
  `answers.tsx`, `api/` for API endpoints)
- `components/`: Shared UI and data modules
- `islands/`: Client-side interactive components
- `static/`: Static assets (images, CSS)
- `tailwind.config.ts`: Tailwind CSS config (note: Tailwind v4+ uses CSS
  `@import`)
- `_fresh/`: Build output (do not edit manually)

## Developer Workflows

- **Start dev server:** `deno task start` (auto-reloads on changes)
- **Build output:** Generated in `_fresh/` (ignore in PRs)
- **No explicit test suite** (as of this writing)
- **No custom build scripts**; use Deno tasks and Fresh conventions

## Project Conventions

- Use daisyUI and Tailwind utility classes for all styling; avoid custom CSS
  unless necessary
- Use `.tsx` for all page and component files
- Data is centralized in `components/data.ts` for easy updates
- Use semantic HTML and accessible ARIA attributes where possible
- Prefer functional React-style components (no classes)

## Integration & Patterns

- External links and social integrations (e.g., Facebook, LINE) are defined in
  `components/data.ts`
- Theme switching uses daisyUI's `theme-controller` radio inputs in the footer
- Images for the gallery are referenced from `data.ts` and stored in `static/`
- API endpoints (if any) are in `routes/api/`

## Examples

- See `routes/index.tsx` for the main page structure, including hero, card,
  carousel, chat, and footer sections
- See `components/data.ts` for the data-driven approach to content and links

## Additional Notes

- Follow Fresh and Deno best practices as described in their official docs
- Do not edit files in `_fresh/` directly
- Use Deno's built-in formatting and linting tools for code quality
