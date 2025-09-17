describe("Auth Dashboard", () => {
  it("should load the login page", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign In").should("exist");
  });

  it("should log in with valid credentials", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("eve.holt@reqres.in");
    cy.get("input[type='password']").type("HireMe2025!");
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Posts").should("exist");
  });

  it("should log out successfully", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("eve.holt@reqres.in");
    cy.get("input[type='password']").type("HireMe2025!");
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Logout").click();

    cy.url().should("include", "/login");
    cy.get("h2").should("contain.text", "Sign In");
  });

  it("should redirect to login if visiting dashboard while logged out", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.url().should("include", "/login");
    cy.get("h2").should("contain.text", "Sign In");
  });

  it("should show error with invalid credentials", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[type='email']").type("wrong@email.com");
    cy.get("input[type='password']").type("wrongpass");
    cy.get("button[type='submit']").click();

    cy.contains("Invalid credentials").should("exist");
  });
});
