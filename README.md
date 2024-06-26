# Who's in town

> Find out which artists are in town using the BandsInTown API

## How to run

There are 2 ways in which you can run this application:

1. directly with the proxy started manually;
2. with docker-compose, with both the React and the SlimPHP proxy started automatically.

In either case, a proxy will be used to bypass the CORS setting with the API. And in both cases you must set the environment file upfront:

- `cp .env.example .env` and edit the file to add the proper values

### Directly

- `npm ci`
- `npm run dev`

The commands to run the proxy directly are:

- `cd ./proxy`
- `docker build -t slim-proxy .`
- `docker run -d -p 8080:8080 slim-proxy`

Useful commands:

- `docker run -d -v "/$(pwd -W)/proxy:/app" -p 8080:8080 slim-proxy`

Once started, you can access the api at: [http://localhost:8080](http://localhost:8080).

### docker-compose

By using docker-compose, you lose some of the speed with with the FE changes are made (since a sync with the container must happen), but you gain comfort with setting up and starting your environment. The command to start is:

- `docker compose up -d`

With this solution, the proxy will run on the same port, but the app will be available on port 3001. This way, you will still be able to run vite locally, should you prefer that.

## The plan

We will create an app based on React + Typescript + Vite + SASS. It will not have a server component and it will use [pico](https://picocss.com/) for easy styling. We will aim for an atomic structure for the components, but we will start as simple as possible, which means we will only break components into smaller ones only as their complexity grows.

Since the file structure will be quite unstable at the beginning, we will keep the CSS in one place and write the tests for the application only slightly later. picocss should help quite a lot with styling, so we might leave the CSS in one place if it turns out we don't need too much custom code.

We will fetch data using [SWR](https://swr.vercel.app/) and also attempt to use it as a state manager. The base for this decision is that it has a good internal caching system, which will help out of the box with reusing already fetched data. At this point it's not expected, but if we will need more as far as a global state goes, we will first try [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as a fun touch to the project.

A high level plan for the app is the following:

1. Set the base app and create a plan of the features;
2. Make the first request to the API and display some data;
3. Create the interfaces with minimal functionality;
4. Add proper functionality and start implementing tests;
5. Overall cleanup and maybe extra features for the repo (e.g. git hooks).

## The first request (/artists)

We will store the api app id in an `.env` file. But since we consume a public API with only one version, we will store the address as a constant. Having such values in a constants file keeps the code cleaner.

The first hurdle encountered was that the API has a restrictive CORS policy. To circumvent it we could have used SSR, but since we already started on the path of using vite and react and don't want to implement SSR ourselves based on what React offers out of the box. Another solution is to create a proxy. The implementation of the proxy is with Docker and SlimPHP. The PHP way is not the most efficient solution, so if there is time we will try to replace the latter with something better.

One important aspect to mention is that we will debounce the search for artists, to make sure we don't make useless requests to the API.

Some thing to note about the /artists route:

- we do not have access to the list of artists, so we are forced to display one at the time;
- when there are no results, sometimes the API returns an empty string and other times it return `{"error": "Not Found"}`.

### Implement the second request (/artists/<artistName>/events)

Using the model on the first request, we will next implement a request for getting the events. Notes about the route:

- when there are no results, the api returns: `{"errorMessage": "[NotFound] The artist was not found"}`

### Implement zod

We will use Zod to implement a minimal validation for the responses from the API.

## Create the interfaces

The first thing we will do is to make a small cleanup in the `<App />` component and separate some of the logic into smaller components. We will start with `<Header />` and `<Search />` which will share the artist name though a new global context.

Then we will create 3 columns, with static empty text placeholders. Once this is done, we will focus on the artist column.

The next step will be implementing the selected event functionality. We will add the functionality in the context and as an extra thing, we will update the way we display the date using `date-fns`, which is more efficient than `moment`.

We will next implement the favorites list. For the sake of simplicity and for saving time, we will not go on the path of saving the minimal information and loading it from the api.

## Add more functionality

The first thing we will do is persist the favorites into localStorage. Since localStorage is [pretty generous](https://web.dev/articles/storage-for-the-web#:%7E:text=LocalStorage%20should%20be%20avoided%20because,web%20workers%20or%20service%20workers) with the space, we will store the information about the favorite event there. However, we will add a minimal safety net with cleaning the loaded content of events which already happened.

## Global state management

We don't have much state that we need to manage, so React's context will do just fine. We will use a global state to store the data, but we will spit it into smaller bits. Since we are in react, we will split them in hooks which are supposed to be used only when creating the global context.

## Final thoughts

- I have started the implementation with the implicit assumption that CORS will not be a problem. Had I known in the beginning, I would have probably picked Next.js for the job, since it should solve the CORS issue out of the box with SSR. To continue with the current implementation, I have implemented a proxy in SlimPHP, which should be fairly easy to access. It's not the best language/solution for creating a CORS proxy, but it's only supposed to work and advance us in the frontend challenge. See the readme in `./proxy` for more info. An example `.env` file for the app with the proxy is:
  ```
  VITE_API_URL="http://localhost:8080/proxy"
  VITE_API_APP_ID=bandsintown
  ```
- I made another wrong assumption about how the cache works out of the box with SWR. However, debouncing the search should be fine for not overloading the API;
- The plan is to implement end to end tests, after which some refactoring to cleanup and maybe simplify the components is in order, after which unit tests would be added;
- As far as the favorites go, the current implementation fits the requirements. However, a more efficient approach would have been to save only the representative data for artists and events and load the extra data on click.
