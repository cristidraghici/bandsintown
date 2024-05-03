import * as CONSTANTS from "../support/constants";

describe("app", () => {
  it("walks the happy path", () => {
    cy.mockPersonas();

    cy.visit("/");

    // Load the app
    cy.contains(CONSTANTS.APP_TITLE);
    cy.contains(CONSTANTS.APP_SUBTITLE);

    cy.get(CONSTANTS.ARTIST_SEARCH_INPUT).should("exist");
    cy.contains(CONSTANTS.NO_SELECTED_EVENT);
    cy.contains(CONSTANTS.NO_FAVORITE_EVENTS);

    // Search for an artist and their events
    cy.getPersona("john").then((persona) => {
      cy.visit("/");
      cy.selectPersona(persona.name);

      cy.get(CONSTANTS.ARTIST_NAME).contains(persona.name);
      cy.contains(persona.upcomingEvents);
      cy.contains(persona.event1Venue);
      cy.contains(persona.event2Venue);

      // Select the first event
      cy.contains(CONSTANTS.NO_SELECTED_EVENT);
      cy.get(CONSTANTS.ARTIST_EVENTS).first().click();
      cy.contains(CONSTANTS.NO_SELECTED_EVENT).should("not.exist");

      // Add the event to favorites
      cy.contains(CONSTANTS.ADD_TO_FAVORITES);
      cy.get(CONSTANTS.SELECTED_EVENT_BUTTON).click();
      cy.contains(CONSTANTS.REMOVE_FROM_FAVORITES);
      cy.contains(CONSTANTS.NO_FAVORITE_EVENTS).should("not.exist");

      // Remove the event from favorites
      cy.get(CONSTANTS.SELECTED_EVENT_BUTTON).click();
      cy.contains(CONSTANTS.ADD_TO_FAVORITES);
      cy.contains(CONSTANTS.NO_FAVORITE_EVENTS);

      // Select the second event
      cy.get(CONSTANTS.ARTIST_EVENTS).eq(1).click();
      cy.contains(CONSTANTS.NO_SELECTED_EVENT).should("not.exist");

      // Clear the search
      cy.get(CONSTANTS.ARTIST_SEARCH_INPUT).clear();
    });
  });
});
