import * as CONSTANTS from "../support/constants";

describe("artist", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("fails to get the artist data", () => {
    cy.getPersona("john").then((persona) => {
      cy.intercept("GET", `**/artists/${persona.id}**`, {
        forceNetworkError: true,
      });

      cy.get(CONSTANTS.ARTIST_SEARCH_INPUT)
        .clear()
        .type(persona.name.toLocaleLowerCase());

      cy.contains(CONSTANTS.ERROR_FETCHING_THE_ARTIST);
    });
  });

  it("fails to get the artist events", () => {
    cy.intercept("GET", `**/artists/john?app_id=**`, {
      fixture: `artists-john.json`,
    }).as(`artist-john`);

    cy.intercept("GET", `**/artists/**/events?app_id=**`, {
      forceNetworkError: true,
    }).as(`artist-john-events`);

    cy.getPersona("john").then(() => {
      cy.selectPersona("john");
      cy.contains(CONSTANTS.ERROR_FETCHING_THE_EVENTS);
    });
  });

  it("searches for a non-existent artist", () => {
    cy.mockPersonas();

    cy.selectPersona("artist-who-does-not-exist");

    cy.contains(CONSTANTS.ARTIST_NOT_FOUND);
  });

  it("searches for 2 artists and their events", () => {
    cy.mockPersonas();

    cy.getPersona("john").then((persona) => {
      cy.selectPersona(persona.name);

      cy.get(CONSTANTS.ARTIST_NAME).contains(persona.name);
      cy.contains(persona.upcomingEvents);
      cy.contains(persona.event1Venue);
      cy.contains(persona.event2Venue);
    });

    cy.getPersona("jojo").then((persona) => {
      cy.selectPersona(persona.name);

      cy.get(CONSTANTS.ARTIST_NAME).contains(persona.name);
      cy.contains(persona.upcomingEvents);
      cy.contains(persona.eventVenue);
    });
  });

  it("shows the full description on the artist event", () => {
    cy.mockPersonas();

    cy.getPersona("john").then((persona) => {
      cy.selectPersona(persona.name);

      cy.contains(persona.event1Description.truncated);
      cy.contains(persona.event1Description.full).should("not.exist");

      cy.get(CONSTANTS.ARTIST_EVENTS)
        .first()
        .find(CONSTANTS.ARTIST_EVENT_READ_MORE)
        .click();

      cy.contains(persona.event1Description.truncated).should("not.exist");
      cy.contains(persona.event1Description.full);
    });
  });
});
