google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    var myLatlng = new google.maps.LatLng(39.4053947,-95.363801);
    var mapOptions = {
        zoom: 4,
        center: myLatlng,
        scrollwheel: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var starting_cities = {
      cities : [
      { city: "San Francisco",
        origin: [37.7682851,-122.4205412],
        marker: "images/markers/SF.png",
      },
      { city: "Akron",
        origin: [41.0771553,-81.5137661],
        marker: "images/markers/AKRON.png",
      },
      { city: "New York City",
        origin: [40.7277495,-73.9924231],
        marker: "images/markers/NYC.png",
      },
      { city: "Mexico City",
        origin: [19.4340894,-99.1323558],
        marker: "images/markers/MEXICO.png",
      },
      { city: "Tampa",
        origin: [27.9420771,-82.4707102],
        marker: "images/markers/TAMPA.png",
      },
      { city: "Vancouver",
        origin: [49.2562176,-123.1939532],
        marker: "images/markers/VAN.png",
       },
      { city: "Boulder",
        origin: [40.0294203,-105.3100175],
        marker: "images/markers/FINALS.png",}
      ]
    };

    var cities = []
    addBusMarkers();

    var points = []
      function fetch_bus_line_color(bus) {
        var line;
	var opacity;
        switch(bus) { 
          case "San Francisco":
            line = "#6bc8d1";
	    var opacity = 1.0;
            break;
          case "Akron":
            line = "#fc0f3f";
	    var opacity = 1.0;
            break;
          case "New York City":
            line = "#fee834";
	    var opacity = 1.0;
            break;
          case "Mexico City":
            line = "#ee9532";
	    var opacity = 1.0;
            break;
          case "Tampa":
            line = "#246bd1";
	    var opacity = 1.0;
            break;
          case "Vancouver":
            line = "#ab3f90";
	    var opacity = 1.0;
            break;
          default:
            line: "FFFFFF";
	    var opacity = 0.0;
            break;
        }

        return {"color": line, "opacity": opacity};
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
                        strokeColor: fetch_bus_line_color(route.name).color,
                        strokeOpacity: fetch_bus_line_color(route.name).opacity,
                        strokeWeight: 5
                    });
                    flightPath.setMap(window.map);
                });
            }, //success
          error:function(exception){
            console.log(+exception);
          }
        });

        google.maps.event.addListenerOnce(window.map, 'idle', function(){
          updateMapBounds();
        });

    }); //document.ready

    function updateMapBounds() {
        var current_bounds = window.map.getBounds();
        var van_pos = new google.maps.LatLng(49.2562176,-123.1939532);
        var tampa_pos = new google.maps.LatLng(27.9420771,-82.4707102);

        if( !current_bounds.contains(van_pos) || !current_bounds.contains(tampa_pos)){
          var bounds = new google.maps.LatLngBounds();
          bounds.extend(van_pos);
          bounds.extend(tampa_pos);
          window.map.fitBounds(bounds);
        }
    }

    function addBusMarkers() {
        cities = _.map(starting_cities.cities, function(city) {
          var icon = {
            url: city.marker,
               anchor: new google.maps.Point(17, 34),
          };

            var new_city = new google.maps.Marker({
                position: new google.maps.LatLng(city.origin[0],city.origin[1]), 
                map: map, 
                icon: icon
            });
        });
    }

}

