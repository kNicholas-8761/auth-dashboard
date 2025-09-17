describe("Auth Dashboard", () => {
  it("should load the login page", () => {
    cy.visit("http://localhost:3000/login"); // adjust if your app runs on a different port
    cy.contains("Login").should("exist");
  });
});
