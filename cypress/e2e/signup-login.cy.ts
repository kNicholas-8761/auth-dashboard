describe("Auth Dashboard - Signup & Login Flow", () => {
  it("should sign up a new user and log in successfully", () => {
    const uniqueEmail = `user${Date.now()}@test.com`; // ensure unique email each run
    const password = "password123";

    // Step 1: Go to signup
    cy.visit("http://localhost:3000/signup");

    cy.get("input[type='email']").type(uniqueEmail);
    cy.get("input[placeholder='Enter password']").type(password);
    cy.get("input[placeholder='Confirm password']").type(password);
    cy.get("button[type='submit']").click();

    // Step 2: Should be redirected to dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Posts").should("exist");

    // Step 3: Log out
    cy.contains("Logout").click();
    cy.url().should("include", "/login");

    // Step 4: Log in again with same credentials
    cy.get("input[type='email']").type(uniqueEmail);
    cy.get("input[type='password']").type(password);
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Posts").should("exist");
  });
});
