<?php

namespace App\Providers;

use App\Weather\OpenWeatherMapGateway;
use App\Weather\WeatherGatewayInterface;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        $this->app->bind(WeatherGatewayInterface::class, function ($app) {

            $request = $this->app->request;

            // currently only Open Weather Map provider is used
            return new OpenWeatherMapGateway($request->get('api_key'), $request->get('city'));

            // other providers can be returned too
            //...
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
