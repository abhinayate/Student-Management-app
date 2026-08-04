# Student Management App — Project Plan

> Status: Planning only. No code has been written yet. This document is our shared
> agreement on *what* we're building and *how*, before we touch a single line of code.

## 1. What We're Building

A web application (works on desktop, tablet, and phone) where you can manage a list of
students: add them, view them, edit their details, delete them, search/filter/sort
through them, and see a dashboard with charts summarizing the data.

## 2. Tech Stack (and why)

Since you're new to programming, here's the plan in plain terms — each piece has one job:

| Layer | Choice | What it actually does |
|---|---|---|
| **Frontend framework** | **React + Vite** | React builds the visible webpage — forms, tables, buttons, charts. Vite is the tool that runs the project on your computer while building it and quickly reflects every change you make. |
| **UI Components** | **Chakra UI** | A library of ready-made, already-responsive building blocks (buttons, inputs, modals, layout grids...) so we don't have to hand-write CSS for every single element. |
| **Routing** | **React Router** | Lets the app switch between pages (Dashboard, Students list, Add Student, Edit Student) without fully reloading the browser, like flipping between tabs. |
| **Forms** | **React Hook Form** | Manages the Add/Edit student forms — capturing what you type, validating it (e.g. "mobile number must be 10 digits"), and submitting it — with much less code than doing it by hand. |
| **Backend** (the "brain" behind the scenes) | **Node.js + Express** | A small server program that receives requests from the browser ("give me all students", "add this student") and talks to the database. |
| **Database** (where data actually lives) | **SQLite** | A lightweight, file-based database — the *entire* database is just one file living alongside the backend code. No cloud account, no separate database server to install or manage. Great for learning and for an app like this. |
| **Charts** | **Recharts** (a React charting library) | Draws the pie/bar/line charts on the dashboard. Works fine alongside Chakra UI. |

**Note on SQLite vs. what we discussed earlier:** we originally talked about a cloud
database so data is shared across devices. SQLite itself is just a *local file* — so
data is shared across devices only in the sense that everyone talks to the **same
running backend server** (which is where the SQLite file lives), the same way it would
with any other database. It just means there's no separate "database service" to sign
up for — one less thing to set up while learning.

**Honest note for a first-time programmer:** React and Node are both built on top of
JavaScript. Before diving into them, it will pay off to first get comfortable with basic
JavaScript building blocks — variables, functions, arrays, objects, if/else, loops. That's
"Phase 0" in the roadmap below, and it's the foundation everything else sits on.

## 3. How the Pieces Talk to Each Other

```
[ Your Browser ]  <-- displays pages, forms, charts (React + Chakra UI + React Router)
       |
       |  "Please add this student" / "Give me all students" (an HTTP request)
       v
[ Node.js + Express server ]  <-- receives the request, decides what to do
       |
       |  "Save this" / "Fetch these records"
       v
[ SQLite database file ]  <-- the actual filing cabinet where student data lives,
                               sitting right next to the backend code
```

Analogy: React is the waiter taking your order and showing you the menu (Chakra UI is
the pre-printed menu template, React Router lets the waiter walk you to a different
table/room, React Hook Form is the order pad). Express is the kitchen staff who
receives the order and knows what to do. SQLite is the pantry/filing cabinet in the
same building where the actual ingredients (data) are stored.

## 4. Data Model — the Student record

| Field | Type | Notes |
|---|---|---|
| Student ID | Text, auto-generated | System generates something like `STU0001`, `STU0002`, ... automatically each time a student is added. You never type this. |
| Student Name | Text | Required |
| Gender | Male / Female / Other | Dropdown selection |
| Grade | 6–12 | Dropdown selection |
| Section | A / B / C | Dropdown selection |
| Parent Name | Text | Required |
| Mobile Number | Text/Number | With basic format validation (e.g. 10 digits) |
| Admission Date | Date | Date picker |

## 5. Features → Screens

| Feature | Screen / Component |
|---|---|
| Add new student | "Add Student" form page |
| View all students | "Students" page — a table (list) of all records |
| Edit student details | "Edit Student" form, pre-filled with existing data |
| Delete student | Delete button on each row, with a confirmation prompt |
| Search students | A search box on the Students page (matches name, ID, parent name, or mobile number) |
| Filter students | Dropdown filters for Grade, Section, Gender |
| Sort student records | Clickable table column headers (e.g. click "Name" to sort A→Z / Z→A) |
| Interactive dashboard | A separate "Dashboard" page with stat cards + charts |

## 6. Dashboard — Planned Stats & Charts

- **Stat cards:** Total students, total per grade band, etc.
- **Gender distribution** — pie/donut chart
- **Students per Grade (6–12)** — bar chart
- **Students per Section** — bar chart
- **Admissions over time** (by month/year, from Admission Date) — line or bar chart

## 7. Responsive Design Plan

- Mobile-first approach: design for small screens first, then enhance for larger ones.
- **Chakra UI's responsive style props** handle most of this (e.g. one line of code can
  say "full width on mobile, half width on desktop") instead of writing separate CSS
  media-query files by hand.
- Breakpoints roughly: mobile (<640px), tablet (641–1024px), desktop (>1024px) —
  matches Chakra UI's default breakpoints.
- The student **table becomes a stacked card list** on small screens (tables don't fit
  well on phones).
- Navigation collapses into a simple menu (Chakra UI drawer/menu) on mobile.
- Dashboard charts stack vertically on mobile, sit in a grid on desktop.

## 8. Project Folder Structure (high level)

```
student-management-app/
├── client/                  (React app, created with Vite)
│   └── src/
│       ├── components/      (StudentTable, StudentForm, SearchBar, FilterBar, Navbar, Charts...)
│       ├── pages/            (Dashboard, StudentsList, AddStudent, EditStudent)
│       ├── routes/            (React Router setup — which page shows at which URL)
│       └── services/         (functions that call the backend API)
├── server/                  (Node.js + Express API)
│   ├── models/               (Student table definition)
│   ├── routes/                (URL endpoints, e.g. /api/students)
│   ├── controllers/           (the actual add/edit/delete/search logic)
│   ├── database/              (SQLite connection setup + the .sqlite file itself)
│   └── server.js
└── project.md                (this file)
```

**Libraries used inside these folders:**
- `client`: React, Vite, Chakra UI (components + theming), React Router (`pages`/`routes`),
  React Hook Form (inside `StudentForm` for Add/Edit).
- `server`: Express (routes/controllers), `better-sqlite3` (a simple, beginner-friendly
  package for talking to a SQLite file from Node.js).

## 9. Tools You'll Need to Install (once, up front)

- **Node.js** (lets your computer run JavaScript outside the browser — includes `npm`,
  used to install packages)
- **VS Code** (the code editor we'll write everything in)
- **Git** (optional but recommended, for saving versions of your work)
- A modern browser (Chrome/Edge) for viewing the app
- **Thunder Client** or **Postman** (optional — lets us test the backend independently
  of the frontend while building it)

No database account/signup is needed this time — SQLite is just an npm package
(`better-sqlite3`) plus a file on disk, both handled entirely inside the project.

## 10. Build Roadmap (the order we'll actually build in)

- **Phase 0 — JavaScript basics. (Skipped by request.)** User chose to skip a
  dedicated fundamentals phase and learn JavaScript concepts (variables, functions,
  arrays, objects, loops, etc.) inline, as they come up while building real features,
  rather than as a separate lesson block.
- **Phase 1 — Backend setup.** Node + Express server running locally; create the
  SQLite database file and define the `students` table.
- **Phase 2 — Backend CRUD.** Build the API endpoints: create, read, update, delete,
  search. Test them with Thunder Client — before any frontend exists.
- **Phase 3 — Frontend skeleton.** Set up the React app with Vite, install Chakra UI
  and React Router, build the empty pages/layout (Navbar, Students page, Add/Edit
  form, Dashboard) with no real data yet.
- **Phase 4 — Wire frontend to backend.** Students page shows real data from the
  database; Add/Edit forms (built with React Hook Form) and Delete actually work.
- **Phase 5 — Search, Filter, Sort.** Add the search box, filter dropdowns, and
  sortable columns.
- **Phase 6 — Dashboard & Charts.** Compute the stats, add Recharts, build the
  dashboard page.
- **Phase 7 — Responsive polish.** Test on different screen sizes, fix layout on
  mobile/tablet, add loading and empty states, form validation messages.
- **Phase 8 (optional, later) — Deployment.** Put the app on the internet (e.g.
  frontend on Vercel/Netlify, backend on Render/Railway) so it's reachable from
  anywhere, not just your own computer. *Note for later:* some hosting platforms
  don't keep local files permanently, which would affect a SQLite file — if we get to
  this phase we'll pick a host that supports persistent storage, or switch databases.

## 11. Explicitly Out of Scope (for now)

Not part of the original request, so not planned — but easy to add later if wanted:
user login/authentication, exporting to Excel/PDF, bulk import, multi-language support.

---
*This plan will be used as the guide for every step going forward. Nothing here is
final — if anything should change, we update this file before changing course.*
