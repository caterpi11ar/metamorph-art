# CLAUDE.md

## Project Overview

MetamorphArt - AI image stylization WeChat Mini Program (AI 图片风格化微信小程序). Built with Taro 4.0.12, React 18, and TypeScript. Uses Vite as the compiler.

## Commands

Package manager: **pnpm** (with npmmirror registry via `.npmrc`)

```bash
pnpm dev:weapp          # Dev build for WeChat Mini Program (primary target)
pnpm build:weapp        # Production build for WeChat Mini Program
pnpm lint               # Run ESLint
pnpm lint:fix           # Run ESLint with auto-fix
```

Other targets exist (h5, alipay, swan, tt, qq, jd) but weapp is the primary platform.

## Architecture

- **Framework**: Taro 4 page-based routing with React functional components
- **Styling**: SCSS with global variables in `src/styles/variables.scss`
- **Design width**: 750 (Taro pxtransform enabled — write px values at 750 design scale)
- **Path alias**: `@/*` maps to `./src/*`

### Directory Structure

```
src/
  app.config.ts        # App config: pages, tabBar, window settings
  app.ts / app.scss    # App entry
  pages/               # Page components (index, workspace, profile, my, home)
  components/          # Shared components
  constants/           # Constants (e.g., image style definitions)
  styles/              # Global SCSS variables
  assets/              # Static assets
config/                # Taro build config (dev/prod)
```

### Pages (from app.config.ts)

- `pages/index/index` — Home (tab)
- `pages/workspace/index` — Workspace (tab)
- `pages/profile/index` — Profile (tab)
- `pages/my/index` — My page

## Code Conventions

- **ESLint**: `@antfu/eslint-config` (flat config in `eslint.config.mjs`)
- **Indentation**: 2 spaces, no semicolons (Anthony Fu style)
- **Components**: Functional components with Taro hooks (`useLoad`, etc.)
- **Imports**: Use `@/` path alias for src-relative imports
- **Design system**: iOS-style — uses Apple SF colors (`#007AFF` primary, `#F2F2F7` background), rounded corners, blur effects. See `src/styles/variables.scss` for tokens.
- **Console**: `console.log/warn/error/info` allowed; other console methods are errors
