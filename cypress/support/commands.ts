/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

import * as CONSTANTS from "./constants";
import { getPersona } from "./utils";

Cypress.Commands.add("mockPersonas", () => {
  const getUrl = (path: string) => {
    const API_URL = Cypress.env("VITE_API_URL").replace(/\/$/, "");
    const API_APP_ID = Cypress.env("VITE_API_APP_ID");

    return `${API_URL}${path}?app_id=${API_APP_ID}`;
  };

  // Mock the personas requests
  CONSTANTS.LIST_OF_PERSONAS.forEach(({ id, name, fixtures }) => {
    const { artist, events } = fixtures;

    if (artist) {
      cy.intercept("GET", getUrl(`/artists/${id}`), {
        fixture: `artists-${id}.json`,
      }).as(`artist-${id}`);
    }

    if (events) {
      // Remember that in the app we use the retrieved artist name for the events request
      const eventsFixture = `artists-${id}-events.json`;
      cy.intercept("GET", getUrl(`/artists/${name}/events`), {
        fixture: eventsFixture,
      }).as(`artist-${id}-events`);
    }
  });

  cy.log(
    `Mocked personas: ${CONSTANTS.LIST_OF_PERSONAS.map(
      (persona) => persona.name
    ).join(", ")}`
  );
});

Cypress.Commands.add("selectPersona", (name: string) => {
  const persona = CONSTANTS.LIST_OF_PERSONAS.filter((persona) =>
    [persona.name.toLocaleLowerCase(), persona.id.toLocaleLowerCase()].includes(
      name.toLocaleLowerCase()
    )
  )[0];

  if (!persona) {
    throw new Error(`Persona ${name} not found`);
  }

  const { id, name: personaName, fixtures } = persona;

  cy.get(CONSTANTS.ARTIST_SEARCH_INPUT)
    .clear()
    .type(personaName.toLocaleLowerCase());

  if (fixtures.artist) {
    cy.wait(`@artist-${id.toLocaleLowerCase()}`);
  }

  if (fixtures.events) {
    cy.wait(`@artist-${persona.id}-events`);
  }

  cy.log(`Selected persona: ${personaName}`);
});

Cypress.Commands.add("getPersona", (name: string) => {
  return cy.wrap(getPersona(name));
});
