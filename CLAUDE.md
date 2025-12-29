# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a minimal TypeScript project created to reproduce a bug in lsmcp (Language Server Model Context Protocol). The project is intentionally minimal to isolate and demonstrate the issue.

## Project Structure

- `src/index.ts` - Single source file with minimal TypeScript code
- `tsconfig.json` - TypeScript configuration with strict settings
- Uses pnpm for package management (version 10.26.2)
- Uses TypeScript native preview via `@typescript/native-preview` and tsgo

## Key Dependencies

- `@mizchi/lsmcp@0.10.0` - The package being tested for bug reproduction
- `@typescript/native-preview@7.0.0-dev.20251228.1` - TypeScript native tooling
- `tsgo` - TypeScript compilation tool

## Commands

**Type checking:**

```bash
pnpm tsgo
```

This runs TypeScript type checking with `--noEmit` flag (no output files generated).

## Development Notes

- This is a bug reproduction project, not a production application
- The codebase is intentionally minimal
- Focus on the lsmcp indexing behavior when making changes
