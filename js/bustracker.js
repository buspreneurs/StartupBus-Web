google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    var myLatlng = new google.maps.LatLng(39.4053947,-95.363801);
    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var cities = []
    addBusMarkers();

    var points = []

    function fetch_bus_icon(bus) {
        var marker;
        switch(bus) {
            case "San Francisco":
                marker = "static/images/Carl_pin_OJ_3.png";
                break;
            case "Vancouver":
                marker = "static/images/Carl_pin_blue_3.png";
                break;
            case "Mexico City":
                marker = "static/images/Carl_pin_red_3.png";
                break;
            case "Akron":
                marker = "static/images/Carl_pin_pink_3.png";
                break;
            case "New York City":
                marker = "static/images/Carl_pin_purp_3.png";
                break;
            case "Tampa":
                marker = "static/images/Carl_pin_green_3.png";
                break;
            default:
                marker = "static/images/Carl_pin_ugh_3.png";
                break;
        }
        return marker;
    }

    function fetch_bus_line_color(bus) {
        var marker;
        switch(bus) {
            case "Tampa":
                marker = "#FEB000";
                break;
            case "Mexico City":
                marker = "#22DCFF";
                break;
            case "New York City":
                marker = "#FC4E00";
                break;
            case "Akron":
                marker = "#F012D6";
                break;
            case "Southeast":
                marker = "#C901F3";
                break;
            case "Vancouver":
                marker = "#32E972";
                break;
            default:
                marker = "static/images/Carl_pin_ugh_3.png";
                break;
        }
        return marker;
    }

    $(document).ready(function(){ 

        $.ajax({
          url: "http://subtracker.herokuapp.com/allPointsLowPrecision/2016",
            success: function(data){
                _.each(data.routes, function(route){
                    var lat_lng = [];
                    var lines = _.map(route.points, function(point){
                        //this is sending commas or zeros
                         lat_lng.push(new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lon)))
                    });

                    var flightPath = new google.maps.Polyline({
                        path: lat_lng,
                        geodesic: true,
                        strokeColor: fetch_bus_line_color(route.name),
                        strokeOpacity: 1.0,
                        strokeWeight: 5
                    });
                    flightPath.setMap(map);
                });
            }, //success
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp'
        });
    }); //document.ready

      var starting_cities = {
        cities : [
        { city: "San Francisco",
          origin: [37.7682851,-122.4205412],
          marker: "images/markers/SF.png",
          line_color: "6bc8d1"},
        { city: "Akron",
          origin: [41.0771553,-81.5137661],
          marker: "images/markers/AKRON.png",
          line_color: ""},
        { city: "New York City",
          origin: [40.7277495,-73.9924231],
          marker: "images/markers/NYC.png",
          line_color: ""},
        { city: "Mexico City",
          origin: [19.4340894,-99.1323558],
          marker: "images/markers/MEXICO.png",
          line_color: ""},
        { city: "Tampa",
          origin: [27.9420771,-82.4707102],
          marker: "images/markers/TAMPA.png",
          line_color: ""},
        { city: "Vancouver",
          origin: [49.2562176,-123.1939532],
          marker: "images/markers/VAN.png",
          line_color: ""}
        ]
      };

    function addBusMarkers() {

        cities = _.map(starting_cities.cities, function(city) {
            var new_city = new google.maps.Marker({
                position: new google.maps.LatLng(city.origin[0],city.origin[1]), 
                map: map, 
                icon: city.marker
            });
        });
    }

}

