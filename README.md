🚀 Auth Dashboard

A simple Next.js + Redux Toolkit authentication dashboard with login, signup, and protected routes.

This project demonstrates:

🔐 Authentication flow (login, signup, logout)

🗂 State management with Redux Toolkit

🎨 UI built with Tailwind CSS

🧪 Testing with Jest + Cypress

📦 Tech Stack

Next.js 14 (App Router)

React 18

Redux Toolkit

Tailwind CSS

Jest (unit tests)

Cypress (end-to-end tests)

⚡ Features

✅ Signup with email + password (confirmation + validation)
✅ Login with stored user credentials (saved in localStorage)
✅ Error handling for invalid login or duplicate signup
✅ Redirects unauthenticated users back to /login
✅ Redux state persists session until logout
✅ Basic dashboard after login

🛠 Installation

# Clone repo

git clone https://github.com/your-username/auth-dashboard.git

# Install dependencies

npm install

# Run dev server

npm run dev

App runs on 👉 http://localhost:3000

✅ Testing

This project includes both unit tests (Jest) and end-to-end tests (Cypress):

Jest → covers Redux authSlice logic.

Cypress → covers the full authentication flow:

Load the login page

Sign up with a new account

Log in with that account

Log out and return to login

Prevent access to dashboard if not authenticated

Show errors on invalid inputs

Run tests

# Unit tests (Jest)

npm run test

# E2E tests (Cypress in UI mode)

npx cypress open

# E2E tests (headless)

npx cypress run

🚀 Deployment

Deployed with Vercel → https://kevs-auth-dashboard.vercel.app/login

📌 Next Steps

Add real API integration (e.g. Firebase, Supabase, or custom backend)

Add persistent sessions with cookies/JWT

Expand dashboard with profile & settings pages
