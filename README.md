# Who's in town

> A fun app backed by crowded &#128572;

## How to run

To view the app locally:

- `cp .env.example .env` and edit the file to add the proper values
- `npm ci`
- `npm run dev`

Should you need the proxy, check the readme inside the `./proxy` folder of this project.

## The plan

We will create an app based on React + Typescript + Vite + SASS. It will not have a server component and it will use [pico](https://picocss.com/) for easy styling. We will aim for an atomic structure for the components, but we will start as simple as possible, which means we will only break components into smaller ones only as their complexity grows. Since the file structure will be quite unstable at the beginning, we will keep the CSS in one place and write the tests for the application only slightly later. Pico should help quite a lot with styling, so we might leave the CSS in one place if it turns out we don't need too much custom code.

We will fetch data using [SWR](https://swr.vercel.app/) and also attempt to use it as a state manager. The base for this decision is that it has a good internal caching system, which will help out of the box with reusing already fetched data. At this point it's not expected, but if we will need more as far as a global state goes, we will first try [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as a fun touch to the project.

A high level plan for the app is the following:

1. Set the base app and create a plan of the features;
2. Make the first request to the API and display some data;
3. Create the interfaces with minimal functionality;
4. Add proper functionality and start implementing tests;
5. Overall cleanup and maybe extra features for the repo (e.g. git hooks).

## The first request (/artists)

We will store the api app id in a .env file. But since we consume a public API with only one version, we will store the address as a constant. Having such values in a constants file keeps the code cleaner.

The first hurdle encountered was that the API has a restrictive CORs policy. To circumvent it we could have used SSR, but since we already started on the path of using vite and react, another solution is to create a proxy. The implementation of the proxy is with Docker and SlimPHP. This is not the most efficient solution, so if there is time we will try to replace the latter with something better.

One important aspect to mention is that we will debounce the search for artists, to make sure we don't make useless requests to the API.

Some thing to note about the /artists route:

- we do not have access to the list of artists, so we are forced to display one at the time;
- when there are no results, sometimes the API returns an empty string and other times it return `{"error": "Not Found"}`.

### Implement the second request (/artists/<artistName>/events)

Using the model on the first request, we will next implement a request for getting the events.

Notes about the route:

- when there are no results, the api returns: `{"errorMessage": "[NotFound] The artist was not found"}`

### Implement zod

We will use Zod to implement a minimal validation for the responses from the API

## Create the interfaces

The first thing we will do is to make a small cleanup in the `<App />` component and separate some of the logic into smaller components. We will start with `<Header />` and `<Search />` which will share the artist name though a new global context.

Then we will create the three columns in the example layout, with static empty text placeholders. Once this is done, we will focus on the artist column.
