## ✅ Testing

This project includes both **unit tests (Jest)** and **end-to-end tests (Cypress)**:

- **Jest** → covers Redux `authSlice` logic.
- **Cypress** → covers the full authentication flow:
  - Load the login page
  - Log in with valid credentials
  - Log out and return to login
  - Prevent access to dashboard if not authenticated
  - Show error on invalid login attempt

### Run tests

```bash
# Unit tests (Jest)
npm run test

# E2E tests (Cypress in UI mode)
npx cypress open

# E2E tests (headless)
npx cypress run
```
