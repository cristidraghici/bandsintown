# Proxy

This proxy will be used to bypass the CORS issue with the API. Since we started on the path of react + vite, we will add this proxy as a fix. However, using a solution like Next.js with server side rendering might have saved us some time.

To use this proxy, you need docker installed. The commands are:

- `docker build -t slim-proxy .`
- `docker run -d -p 8080:8080 slim-proxy`

Useful commands:

- `docker run -d -v "/$(pwd -W)/proxy:/app" -p 8080:8080 slim-proxy`

Once started, you can access the api at: [http://localhost:8080](http://localhost:8080)
