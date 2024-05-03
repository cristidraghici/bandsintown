/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mockPersonas(): Chainable<void>;
    selectPersona(name: string): Chainable<void>;
    getPersona: (name: string) => Chainable<Persona>;
  }
}

type Persona = {
  id: string;
  name: string;
  fixtures: {
    artist: string;
    events?: string;
  };
  upcomingEvents?: string;
  eventVenue?: string;
  event1Venue?: string;
  event2Venue?: string;
  event1Description?: {
    truncated: string;
    full: string;
  };
};
