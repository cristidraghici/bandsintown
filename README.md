# Who's in town

> A fun app backed by crowded &#128572;

## The plan

We will create an app based on React + Typescript + Vite + SASS. It will not have a server component and it will use [pico](https://picocss.com/) for easy styling. We will aim for an atomic structure for the components, but we will start as simple as possible, which means we will only break components into smaller ones only as their complexity grows. Since the file structure will be quite unstable at the beginning, we will keep the CSS in one place and write the tests for the application only slightly later. Pico should help quite a lot with styling, so we might leave the CSS in one place if it turns out we don't need too much custom code.

We will fetch data using [SWR](https://swr.vercel.app/) and also attempt to use it as a state manager. The base for this decision is that it has a good internal caching system, which will help out of the box with reusing already fetched data. At this point it's not expected, but if we will need more as far as a global state goes, we will first try [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as a fun touch to the project.

A high level plan for the app is the following:

1. Set the base app and create a plan of the features;
2. Make the first request to the API and display some data;
3. Create the interfaces with minimal functionality;
4. Add proper functionality and start implementing tests;
5. Overall cleanup and maybe extra features for the repo (e.g. git hooks).

To view the app locally:

- `npm ci`
- `npm run dev`
