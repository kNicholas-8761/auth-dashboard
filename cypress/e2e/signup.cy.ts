describe("Signup Flow", () => {
  it("should load the signup page", () => {
    cy.visit("http://localhost:3000/signup");
    cy.contains("Sign Up").should("exist");
  });

  it("should register with valid details", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("input[type='email']").type("newuser@example.com");
    cy.get("input[placeholder='Enter password']").type("NextJS_Rocks!");
    cy.get("input[placeholder='Confirm password']").type("NextJS_Rocks!");
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Posts").should("exist");
  });

  it("should show error if passwords do not match", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("input[type='email']").type("wronguser@example.com");
    cy.get("input[placeholder='Enter password']").type("password123");
    cy.get("input[placeholder='Confirm password']").type("password456");
    cy.get("button[type='submit']").click();

    cy.contains("Passwords do not match").should("exist");
  });

  it("should show error for invalid email", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("input[type='email']").type("notanemail");
    cy.get("input[placeholder='Enter password']").type("password123");
    cy.get("input[placeholder='Confirm password']").type("password123");
    cy.get("button[type='submit']").click();

    cy.contains("Invalid email address").should("exist");
  });
});
