# FinTrack

FinTrack is a responsive finance dashboard built with React, Tailwind CSS, and Zustand. It focuses on presenting transaction data in a clean, modern interface while demonstrating role-based access behavior, lightweight state management, and simple financial insights.

## Overview

The project is designed as a frontend-first dashboard foundation for finance-related workflows. It includes a centered responsive layout, card-based sections, transaction visibility by role, insight summaries, filtering support, and local persistence for transaction data using `localStorage`.

## Features

- Role-based access control simulation with `admin` and `user` views.
- Role-based transaction visibility:
  Admin can view all transactions, while user view is limited to user-specific records.
- Category-based filtering support through Zustand state.
- Insights card showing total expenses and highest spending category.
- Responsive transaction table with improved empty states.
- Local transaction persistence using `localStorage`.
- Clean, minimal dashboard UI built with reusable card-based sections.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand

## Setup Steps

### Prerequisites

- Node.js
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Assumptions

- The current implementation is frontend-only and uses sample local transaction data.
- Role switching is simulated in the UI and is not connected to real authentication or authorization services.
- The `user` role currently maps to transactions owned by `Aditya`.
- Only the `transactions` slice is persisted in `localStorage`.
- Filter behavior is store-driven, even though the current UI keeps controls intentionally minimal.

## Future Improvements

- Add transaction create, edit, and delete flows.
- Add dedicated filter controls for category, date range, and transaction type.
- Introduce charts for monthly spending, income vs expense, and category trends.
- Connect the dashboard to a backend API and database.
- Add authentication and real RBAC enforcement.
- Add unit and integration tests for store logic and UI components.
- Support multiple users and dynamic user sessions.
- Add export options such as CSV or PDF reports.

## Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
