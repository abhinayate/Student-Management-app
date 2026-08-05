# Features — Student Management App

Pulled from [project.md](project.md) (the full plan/tech stack lives there — this file
is just the feature checklist). Status updates here as we build.

## Student Data Fields

| Field | Notes |
|---|---|
| Student ID | Auto-generated (e.g. `STU0001`), never typed manually |
| Student Name | Text |
| Gender | Male / Female / Other |
| Grade | 6–12 |
| Section | A / B / C |
| Parent Name | Text |
| Mobile Number | Validated format |
| Admission Date | Date picker |

## Core Features

| # | Feature | What it does | Status |
|---|---|---|---|
| 1 | **Add new student** | Form to enter a new student's details; Student ID is generated automatically on save. | Built |
| 2 | **View all students** | Lists every student in a table (desktop) / card list (mobile). | Built |
| 3 | **Edit student details** | Opens the same form pre-filled with a student's current data; saves changes to that record. | Built |
| 4 | **Delete students** | Removes a student record, after a confirmation prompt. | Built |
| 5 | **Search students** | Free-text search across name, Student ID, parent name, mobile number. | Built |
| 6 | **Filter students** | Narrow the list by Grade, Section, and/or Gender (combinable). | Built |
| 7 | **Sort student records** | Click a column header to sort by that field, ascending/descending. | Built |
| 8 | **Interactive dashboard** | Separate page with stat cards + charts (gender split, students per grade, students per section, admissions over time). | Built |

## Non-Functional Requirement

| Requirement | Details | Status |
|---|---|---|
| **Fully responsive** | App works and looks correct on desktop, tablet, and mobile — table becomes a card list on small screens. | Built |

---
*"Built" means the code is written, the backend was tested with curl, and the
frontend build compiles with no errors — it has not yet been clicked through in an
actual browser by the assistant (no browser tool available). Please try it yourself
at http://localhost:5173 and flag anything that looks or behaves wrong.*

*Update the Status column as each feature is actually built. Scope/tech-stack changes
still belong in project.md, not here.*
