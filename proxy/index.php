<?php
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

// CORS middleware
$app->add(function (Request $request, $handler) {
    // Allow from any origin
    $response = $handler->handle($request)
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    return $response;
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Define your proxy route
$app->any('/proxy/{route:.*}', function (Request $request, Response $response, $args) {
    $route = $args['route'];
    $queryParams = $request->getQueryParams();
    $targetUrl = "https://rest.bandsintown.com/$route" . (empty($queryParams) ? '' : '?') . http_build_query($queryParams);
    
    $client = new Client();
    $proxyResponse = $client->request($request->getMethod(), $targetUrl, ['body' => $request->getBody()]);

    // Forward the response headers
    foreach ($proxyResponse->getHeaders() as $name => $values) {
        foreach ($values as $value) {
            $response = $response->withHeader($name, $value);
        }
    }

    // Convert Guzzle HTTP stream to string before writing to response body
    $bodyContent = $proxyResponse->getBody()->getContents();
    $response->getBody()->write($bodyContent);

    return $response;
});

$app->run();