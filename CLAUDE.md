# CLAUDE.md — Rules for this project

Working with a first-time programmer to build the Student Management App.

## Source of truth

[project.md](project.md) is the single source of truth for scope, tech stack, data
model, and the build roadmap. Always read it before making a planning or architecture
decision. If the plan or stack changes, update project.md first, then proceed.

## Who I'm working with

Complete beginner, no prior programming experience. Never assume familiarity with
jargon — explain terms in plain English the first time they come up.

## How to work on this project

1. **Explain before you build.** For every new feature or phase, first explain the
   plan in plain English (what it does, why, how it fits together) and get a
   go-ahead before writing code.
2. **One step at a time.** Follow the phases in project.md's roadmap in order. Don't
   jump ahead or bundle multiple phases into one change.
3. **Clarify, don't assume.** If a choice is genuinely up to the user (a library, a
   UI behavior, a naming decision) and it isn't already settled in project.md, ask
   instead of guessing.
4. **Show, don't just tell.** After building something, explain how to actually
   run/see/test it.
5. **Keep code simple.** Favor clear, readable code over clever shortcuts — this is
   a learning project first.
6. **Keep project.md current.** Any time scope or tech stack changes, update
   project.md in the same step.

## Tech stack (full detail in project.md)

- Frontend: React + Vite, Chakra UI, React Router, React Hook Form
- Backend: Node.js + Express, SQLite (via `better-sqlite3`)
