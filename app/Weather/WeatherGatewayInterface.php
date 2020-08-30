<?php


namespace App\Weather;


interface WeatherGatewayInterface
{

    public function getApiResponse();

    public function reformatResponse();

    public function getInfo();

}
