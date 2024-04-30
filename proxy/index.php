<?php
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/vendor/autoload.php';

// Configuration
$config = [
    'destination_url' => 'https://rest.bandsintown.com/',
];

// App
$app = AppFactory::create();

// CORS middleware
$app->add(new CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
    "headers.allow" => ["Authorization", "Content-Type", "X-Requested-With"],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => 0,
]));


// Error middleware to handle exceptions
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$errorMiddleware->setDefaultErrorHandler(function ($request, $exception, $displayErrorDetails, $logErrors, $logErrorDetails) use ($app) {
    $statusCode = $exception->getCode() ?: 500;
    $errorMessage = $exception->getMessage() ?: 'Internal Server Error';

    $response = $app->getResponseFactory()->createResponse($statusCode);
    $response->getBody()->write(json_encode(['error' => $errorMessage]));

    return $response;
});

// Define your proxy route
$app->any('/proxy/{route:.*}', function (Request $request, Response $response, $args) use ($config) {
    $route = $args['route'];
    $queryParams = $request->getQueryParams();
    $url = $config['destination_url'] . $route . (empty($queryParams) ? '' : '?') . http_build_query($queryParams);
    
    $client = new Client();
    
    try {
       // Make a request to the specified URL
       $proxyResponse = $client->request($request->getMethod(), $url, [
            // 'headers' => $request->getHeaders(),
            'body' => $request->getBody(),
            'query' => $request->getQueryParams(),
            'http_errors' => false, // Disable throwing exceptions on HTTP errors
        ]);

        // Pass the response status code and headers back to the client
        $response = $response
            ->withStatus($proxyResponse->getStatusCode())
            ->withHeader('Content-Type', $proxyResponse->getHeader('Content-Type'));

        // Get the response body stream from the proxied response
        $stream = $proxyResponse->getBody();

        // Copy the stream contents to the response body
        while (!$stream->eof()) {
            $response->getBody()->write($stream->read(1024)); // Adjust buffer size as needed
        }

        return $response;
    } catch (RequestException $e) {
        // If an error occurred during the request, return the error response
        if ($e->hasResponse()) {
            $errorResponse = $e->getResponse();
            $response = $response
                ->withStatus($errorResponse->getStatusCode())
                ->withHeader('Content-Type', $errorResponse->getHeader('Content-Type'));

            // Get the error response body stream
            $stream = $errorResponse->getBody();

            // Copy the stream contents to the response body
            while (!$stream->eof()) {
                $response->getBody()->write($stream->read(1024)); // Adjust buffer size as needed
            }

            return $response;
        } 

        // If there was an error without a response, return a generic error message
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json')
            ->getBody()
            ->write(json_encode(['error' => 'Internal server error']));
    }
});

$app->run();