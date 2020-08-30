// Green button for getting information pressed
$(document).on('click', '.check-container', function () {
    if (inputsValid()) {
        var formData = collectFormData();
        var $spinner = $('.spinner-container');

        $spinner.show();

        getWeatherData(formData)
            .then(function (weatherData) {
                $('div.weather-tabs').insertNewCityTab(JSON.parse(weatherData));
            })
            .catch(function (msg) {
                alert(msg);
            })
            // hide spinner after request is done
            .finally(function () {
                $spinner.hide();
            });
    } else {
        alert('Please enter required information!');

        return false;
    }
})

$.fn.extend({
    // Loading new data into DOM
    insertNewCityTab: function (weatherData) {
        if (weatherData.cod === 200) {
            var cityName = weatherData.name;
            var cityNameID = 'city-' + weatherData['sys']['id'];

            if (!cityExists(cityNameID)) {
                var $tabUl = this.find('ul.nav.nav-tabs');
                var $tabContentDiv = this.find('div.tab-content');
                var newTabBodyContent = 'City: ' + weatherData.name + '<br/>'
                    + 'Temp: ' + weatherData['main']['temp'] + '<br/>'
                    + 'Temp (feels like): ' + weatherData['main']['feels_like'] + '<br/>'
                    + 'Coord (lat.): ' + weatherData['coord']['lat'] + '<br/>'
                    + 'Coord (lon.): ' + weatherData['coord']['lon'] + '<br/>'
                    + 'Wind (deg.): ' + weatherData['wind']['deg'] + '<br/>'
                    + 'Wind (speed.): ' + weatherData['wind']['speed'];

                var newTabHead = '<li class="nav-item">' +
                    '<a class="nav-link active" id="' + cityNameID + '-tab" data-toggle="tab" href="#' + cityNameID + '" role="tab" aria-controls="home" aria-selected="true">' + cityName + '</a>' +
                    '</li>';

                var newTabBody = '<div class="tab-pane fade" id="' + cityNameID + '" role="tabpanel" aria-labelledby="' + cityNameID + '-tab">' + newTabBodyContent + '</div>';

                $tabUl.append(newTabHead);
                $tabContentDiv.append(newTabBody);

                $tabUl.makeInactiveAllTabs();
                $tabContentDiv.makeInactiveAllPanes();

                $('#' + cityNameID + '-tab').makeActiveTab();
                $('div.tab-pane#' + cityNameID).makeActivePane();
            } else {
                alert('The city is already loaded!');
            }
        } else {
            alert('Error: ' + weatherData.message);
        }

        return this;
    },
    // Deactivating all tabs before activation of newly loaded city
    makeInactiveAllTabs: function () {
        this.find('a.nav-link').each(function (i, item) {
            $(item).removeClass('active');
        });

        return this;
    },
    // Deactivating all info panes before activation of newly loaded city
    makeInactiveAllPanes: function () {
        this.find('div.tab-pane').each(function (i, item) {
            $(item).removeClass('active').removeClass('show');
        });

        return this;
    },
    // Activating tab of newly loaded city
    makeActiveTab: function () {
        this.addClass('active').addClass('show');

        return this;
    },
    // Activating info pane of newly loaded city
    makeActivePane: function () {
        this.addClass('active').addClass('show');

        return this;
    }
});

/**
 * Check if inputs are not empty
 *
 * @returns {boolean|boolean}
 */
function inputsValid() {
    return $('#api-key').val().length > 0 && $('#city').val().length > 0;
}

/**
 * Check if requested city is already loaded
 *
 * @param city
 * @returns {boolean}
 */
function cityExists(city) {
    return $('a.nav-link#' + city + '-tab').length > 0;
}

/**
 * Collect data of the form
 *
 * @returns {{api_key: (jQuery|string|undefined), city: (jQuery|string|undefined)}}
 */
function collectFormData() {
    return {
        api_key: $('input#api-key').val(),
        city: $('input#city').val()
    };
}

/**
 * Request information from weather service provider
 *
 * @param formData
 * @returns {Promise<unknown>}
 */
function getWeatherData(formData) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: 'get-weather-data',
            data: formData,
            dataType: 'text',
            success: function (data) {
                resolve(data);
            },
            error: function (xhr) {
                reject('Error: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
    });
}
