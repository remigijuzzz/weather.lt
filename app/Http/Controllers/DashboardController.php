<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Weather\WeatherGatewayInterface;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Show the site's index page
     *
     * @return string
     */
    public function index(): string
    {
        return view('dashboard.index');
    }

    /**
     * Return provider's result from API using weather info request data
     *
     * @param Request $request
     * @param WeatherGatewayInterface $weatherGateway
     * @return string
     */
    public function getWeatherData(Request $request, WeatherGatewayInterface $weatherGateway): string
    {
        return $weatherGateway->getInfo();
    }
}
