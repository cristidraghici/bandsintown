import * as CONSTANTS from "../support/constants";

describe("selected-event", () => {
  beforeEach(() => {
    cy.fixture("localstorage.json").then((data: object) => {
      localStorage.setItem(
        CONSTANTS.LOCALSTORAGE_KEY,
        JSON.stringify(data[CONSTANTS.LOCALSTORAGE_KEY])
      );
    });
  });

  it("shows events from different artists saved in localStorage", () => {
    cy.mockPersonas();
    cy.visit("/");

    cy.getPersona("john").then((persona) => {
      cy.get(CONSTANTS.FAVORITE_EVENTS).eq(1).click();

      cy.contains(CONSTANTS.SELECTED_EVENT_DETAILS_TEXT);
      cy.get(CONSTANTS.ARTIST_NAME).contains(persona.name);
    });

    cy.getPersona("jojo").then((persona) => {
      cy.get(CONSTANTS.FAVORITE_EVENTS).eq(0).click();

      cy.contains(CONSTANTS.SELECTED_EVENT_DETAILS_TEXT);
      cy.get(CONSTANTS.ARTIST_NAME).contains(persona.name);
    });
  });

  it("adds and removes events from favorites", () => {
    cy.mockPersonas();
    cy.visit("/");

    cy.getPersona("john").then(() => {
      cy.get(CONSTANTS.FAVORITE_EVENTS).then(($events) => {
        const eventsCount = $events.length;

        cy.expect(eventsCount).to.eq(2);
      });

      cy.get(CONSTANTS.FAVORITE_EVENTS).eq(1).click();
      cy.get(CONSTANTS.SELECTED_EVENT_BUTTON).click();

      cy.get(CONSTANTS.FAVORITE_EVENTS).then(($events) => {
        const eventsCount = $events.length;

        cy.expect(eventsCount).to.eq(1);
      });

      cy.get(CONSTANTS.SELECTED_EVENT_BUTTON).click();

      cy.get(CONSTANTS.FAVORITE_EVENTS).then(($events) => {
        const eventsCount = $events.length;

        cy.expect(eventsCount).to.eq(2);
      });
    });
  });

  it("adds event to favorites from artist details", () => {
    cy.mockPersonas();
    cy.visit("/");

    cy.getPersona("john").then((persona) => {
      cy.selectPersona(persona.name);

      cy.get(CONSTANTS.FAVORITE_EVENTS).then(($events) => {
        const eventsCount = $events.length;

        cy.expect(eventsCount).to.eq(2);
      });

      cy.get(CONSTANTS.ARTIST_EVENTS).eq(1).click();
      cy.get(CONSTANTS.SELECTED_EVENT_BUTTON).click();

      cy.get(CONSTANTS.FAVORITE_EVENTS).then(($events) => {
        const eventsCount = $events.length;

        cy.expect(eventsCount).to.eq(3);
      });
    });
  });
});
