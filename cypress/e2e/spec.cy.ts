describe("loads the html", () => {
  it("passes", () => {
    cy.visit("/");
    cy.title().should("eq", "Who's in town");
  });
});
