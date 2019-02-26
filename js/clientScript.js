var utcHours, utcMinutes, utcDayName, utcDayNumber, utcMonth, utcYear;

setTimeout(function () {
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut('slow');
},3500);

function initMap() {
    var myLatLng = {lat: 0, lng: 0};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'ISS is here now!'
    });

    setInterval(function () {
        var latitude=0;
		var longitude=0;
        var currentLocationRequest = new XMLHttpRequest();
        currentLocationRequest.open('GET', 'http://api.open-notify.org/iss-now.json', true);
        currentLocationRequest.send();

        currentLocationRequest.onreadystatechange = function () {
            if (currentLocationRequest.readyState != 4) return;
            if (currentLocationRequest.status !=200) {
                console.log(currentLocationRequest.status + ':' + currentLocationRequst.statusText);
            } else {
                var currentLocationJSON = currentLocationRequest.responseText;
                var currentLocation = JSON.parse(currentLocationJSON);

                latitude = parseFloat(currentLocation.iss_position.latitude);
                longitude = parseFloat(currentLocation.iss_position.longitude);
                map.setCenter({ lat: latitude, lng: longitude });
                marker.setPosition({ lat: latitude, lng: longitude });

                $('.latitude').text(currentLocation.iss_position.latitude);
                $('.longitude').text(currentLocation.iss_position.longitude);
            }
        };

        // InSpaceRightNow
        var inSpaceRightNowRequest = new XMLHttpRequest();
        inSpaceRightNowRequest.open('GET', 'http://api.open-notify.org/astros.json', true);
        inSpaceRightNowRequest.send();

        inSpaceRightNowRequest.onreadystatechange = function () {
            if (inSpaceRightNowRequest.readyState != 4) return;
            if (inSpaceRightNowRequest.status !=200) {
                console.log(inSpaceRightNowRequest.status + ':' + inSpaceRightNowRequest.statusText);
            } else {
                var inSpaceRightNowJSON = inSpaceRightNowRequest.responseText;
                var inSpaceRightNow = JSON.parse(inSpaceRightNowJSON);

                var inSpaceRightNowPeople = inSpaceRightNow.people.filter(function (num) {
                    return num.craft == 'ISS';
                });
                $('.inSpaceRightNowNumber').text(inSpaceRightNowPeople.length);
                (function(){
                    $('.submenu').empty();
                    for (var i = 0; i<inSpaceRightNowPeople.length; i++) {
                        $('.submenu').append('<li><a href=#>'+inSpaceRightNowPeople[i].name+'</a></li>');
                    }
                })();
            }
        }
    },3000);
}

(function Time() {
    setInterval(function () {
        var date = new Date();
        utcHours = date.getUTCHours();
        utcMinutes = date.getMinutes();
        utcDayNumber = date.getUTCDate();
        utcYear = date.getUTCFullYear();

// switch SUNDAY-SATURDAY
        switch (date.getUTCDay()){
            case 0:
                utcDayName="Sunday";
                break;
            case 1:
                utcDayName="Monday";
                break;
            case 2:
                utcDayName="Tuesday";
                break;
            case 3:
                utcDayName="Wednesday";
                break;
            case 4:
                utcDayName="Thursday";
                break;
            case 5:
                utcDayName="Friday";
                break;
            case 6:
                utcDayName="Saturday";
                break;
            default:
                utcDayName="Invalid day";
        }

// switch JANUARY-DECEMBER
       switch(date.getUTCMonth()) {
            case 0:
                utcMonth="January";
                break;
            case 1:
                utcMonth="February";
                break;
            case 2:
                utcMonth="March";
                break;
            case 3:
                utcMonth="April";
                break;
            case 4:
                utcMonth="May";
                break;
            case 5:
                utcMonth="June";
                break;
            case 6:
                utcMonth="July";
                break;
            case 7:
                utcMonth="August";
                break;
            case 8:
                utcMonth="September";
                break;
            case 9:
                utcMonth="October";
                break;
            case 10:
                utcMonth="November";
                break;
            case 11:
                utcMonth="December";
                break;
            default:
                utcMonth="Invalid month";
        }
        utcHours = utcHours < 10 ? '0' + utcHours : utcHours;
        utcMinutes = utcMinutes < 10 ? '0' + utcMinutes : utcMinutes;
        utcMonth = utcMonth.substr(0, 3);

        $('#time').text(`Current UTC time: ${utcHours}:${utcMinutes}`);
        var dateNow = utcDayName+", "+ utcDayNumber +" "+ utcMonth +" "+ utcYear;
        $('.dateNow').text(dateNow);
    },5000);
})();









