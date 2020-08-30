<?php


namespace App\Weather;

use Illuminate\Support\Facades\Http;

class OpenWeatherMapGateway implements WeatherGatewayInterface
{
    private $apiKey;
    private $city;
    private $response;
    private $apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
    private $reformattedData;

    public function __construct(string $apiKey, string $city)
    {
        // setting basic data for API request
        $this->apiKey = $apiKey;
        $this->city = $city;
    }

    /**
     * get API's response
     *
     * @return \Illuminate\Http\Client\Response
     */
    public function getApiResponse()
    {
        // creating GET request to weather service provider's API
        return $this->response = Http::get($this->apiBaseUrl, [
            'q' => $this->city,
            'APPID' => $this->apiKey
        ]);
    }

    public function reformatResponse(){

        // We use Open Weather Map's format as standard.
        // Other data providers' response should be reformatted if needed to match standard.

        return $this->reformattedData = $this->response->body();
    }

    /**
     * Return API's response' data
     *
     * @return string
     */
    public function getInfo(): string
    {
        $this->getApiResponse();
        $this->reformatResponse();

        return $this->reformattedData;
    }

}
