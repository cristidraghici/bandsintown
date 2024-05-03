// Testing personas
export const LIST_OF_PERSONAS: Persona[] = [
  {
    id: "john",
    name: "John",

    // fixtures
    fixtures: {
      artist: "artists-john.json",
      events: "artists-john-events.json",
    },

    // comparison data for assertions based on fixtures
    upcomingEvents: "2 upcoming events",
    event1Venue: "Signature Brew Haggerston",
    event2Venue: "Green Man Festival 2024",

    // event description for testing ReadMore component
    event1Description: {
      truncated:
        "Powerhouse duo JOHN stretch their limbs at Signature Brew Haggerston, just before heading South to link up with their many time stage mates IDLES. Having gained a reputation as one of the most uncompr...",
      full: "Powerhouse duo JOHN stretch their limbs at Signature Brew Haggerston, just before heading South to link up with their many time stage mates IDLES. Having gained a reputation as one of the most uncompromising offerings on the UK live circuit, JOHN make a return to their native ground have formed in the East End of London a decade ago,",
    },
  },
  {
    id: "jojo",
    name: "JoJo",

    fixtures: {
      artist: "artists-jojo.json",
      events: "artists-jojo-events.json",
    },

    upcomingEvents: "6 upcoming event",
    eventVenue: "Kultturitalo Valve, Valvesali",
  },
  {
    id: "artist-who-does-not-exist",
    name: "artist-who-does-not-exist",
    fixtures: {
      artist: "artists-who-does-not-exist.json",
    },
  },
];

// APP specifics
export const LOCALSTORAGE_KEY = "favoriteEvents";

// Selectors
export const ARTIST_SEARCH_INPUT = "input.Search";
export const ARTIST_NAME = "article h3";
export const ARTIST_EVENTS = "section.ArtistEvents > article.EventSummary";
export const ARTIST_EVENT_READ_MORE = "a.ReadMore";

export const SELECTED_EVENT_BUTTON = "button.SelectedEvent_Button";

export const FAVORITE_EVENTS =
  "section.Main__Favorites > div > article.EventSummary";

// Texts
export const APP_TITLE = "Who's in town";
export const APP_SUBTITLE =
  "Find out who's in town and where they are playing.";
export const ARTIST_SEARCH_PLACEHOLDER = "Search for an artist";
export const ARTIST_NOT_FOUND = "No such artist.";

export const NO_SELECTED_EVENT = "No selected event";
export const ADD_TO_FAVORITES = "Add to favorites";
export const REMOVE_FROM_FAVORITES = "Remove from favorites";
export const SELECTED_EVENT_DETAILS_TEXT = "Event details";

export const NO_FAVORITE_EVENTS = "No favorite events";

export const ERROR_FETCHING_THE_ARTIST = "Error fetching the artist";
export const ERROR_FETCHING_THE_EVENTS = "Error fetching the events";
