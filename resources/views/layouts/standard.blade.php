<html>
<head>
    <title>App Name - @yield('title')</title>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/dataCollection.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/weather.css') }}" rel="stylesheet">
</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            @yield('form')
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 spinner-container">
            <div class="spinner-grow text-success" role="status">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="weather-tabs">
                <ul class="nav nav-tabs" id="ul-weather-tabs" role="tablist">
                </ul>
                <div class="tab-content" id="weather-tabs-content">
                </div>
            </div>
        </div>
    </div>
</div>


</body>
</html>
