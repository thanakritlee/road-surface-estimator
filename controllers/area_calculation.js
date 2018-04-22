const express = require('express');
const router = express.Router();


// Image processing modules import.
const getPixels = require('get-pixels');


router.route('/')
    /**
     * For route directory to /api/area_calculation/
     */
    .get((req, res) => {
        /**
         * Return a JSON object with key 'text' and value is a string
         * describing the API.
         */
        res.json({'text': 'This is the area_calculation API.'});
    })
    .post((req, res) => {
        /**
         * Recieve latitude and longitude coordinates from client.
         * 
         * Make calculation of estimated total surface area of road on Google
         * map in a 1 km^2 area where the provided coordinates is the center
         * of the sequare area.         
         * Need to make a calculation of the zoom level to use, and the
         * image size of the Google Maps Static image.
         * 
         * (meters for pixel)
         * metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)
         * 'latLng.lat()' = map.getCenter.lat()
         * 'zoom' = map.getZoom()
         * 
         *  
         * 1. calculate the meters per pixel
         * 2. get number of pixels in the map length or width
         * 3. times the meters of a pixel to the number of pixels
         * 4. check that the total meters is 1000 meters.
         * 
         * Have to take into consideration the Google Logo at the bottom
         * of the map.
         * 
         * Formula taken from:
         * https://groups.google.com/forum/#!topic/google-maps-js-api-v3/hDRO4oHVSeM
        */

        var startTime = Date.now();

        /**
         * ======================================================================================
         * NOTE
         * ======================================================================================
         * After finding the perfect zoom level and image pixel size, make 
         * the zoom level and image pixel size, width, height a constant so 
         * that this calculation loop won't have to be executed again.
         * 
         * 
         * ======================================================================================
         * NOTE 2
         * ======================================================================================
         * The maximum dimensions for the map static image is 1280 x 1280 pixels.
         * Therefore one should look for the zoom level where 1280 pixels in the length adds up
         * to 1 km.
         * 
         * 
         * ======================================================================================
         * NOTE 3
         * ======================================================================================
         * The perfect pixel length and height dimensions is ***675*** at zoom level ***16***.
         * Turning the dimensions of meters to meters at 999.7732, close enough to 1000 meters,
         * whereas with pixel dimensions at 676 the meters to meters is 1001.2544.
         * 
         * Comparing the 2 to the distance to 1000, 999.77 is (+)0.2, and 1001.25 is (-)1.3.
         * Therefore pixel dimension of 675 is the more suitable choice.
         * 
         * 
         * ======================================================================================
         * NOTE 4
         * ======================================================================================
         * Had to resize the image to equal and under 640 x 640 image pixel size because of Google
         * Maps Static API premium plan limitations.
         * The NEW perfect zoom is 15.
         * The NEW perfect image size is 338 x 338.
         * 
         * However, to avoid the Google Logo and Copyright and licencing text at the bottom of the
         * image, I've increase the height of the image to "push down" the logos.
         */

         /* var coordinates = {lat: req.body.lat, lng: req.body.lng};
         for (zoom = 0; zoom <= 20; zoom++) {
            var metersPerPx = 156543.03392 * Math.cos(coordinates.lat * Math.PI / 180) / Math.pow(2, zoom);
            console.log(metersPerPx * 338 + " " + zoom);
         } */
         

         /**
          * Contructing the Google Maps Static image URL.
          * 
          * Example:
          * https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=-37.67284383174988,145.00379366268612&zoom=15&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Cvisibility:off&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape%7Cvisibility:off&style=feature:landscape.natural%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360
          */

          let staticImageURL = "https://maps.googleapis.com/maps/api/staticmap?";
          let coordinates = {lat: req.body.lat, lng: req.body.lng};
          let GoogleMapsStaticAPIKey = "AIzaSyCrNQupAq7wTeaUPBWBfD0YwFq_U8mESB0";
          
          // API key.
          staticImageURL += "key=" + GoogleMapsStaticAPIKey;
          // Coordinate centre.
          staticImageURL += "&" + "center=" + coordinates.lat + "," + coordinates.lng;
          // Zoom.
          staticImageURL += "&" + "zoom=" + 15;
          // Format
          staticImageURL += "&" + "format=" + "png";
          // Maptype.
          staticImageURL += "&" + "maptype=" + "roadmap";
          // Style.
          staticImageURL += "&" + "style=element:geometry%7Ccolor:0x212121&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Cvisibility:off&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape%7Cvisibility:off&style=feature:landscape.natural%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d";
          // Size.
          staticImageURL += "&" + "size=" + 338 + "x" + 380;
          
        
          
        //   console.log(staticImageURL);


        getPixels(staticImageURL, function(err, pixels) {
            if (err) {
                console.log(err);
            }
            else {
                let index = 27040;
                let roadPixelCounter = 0;
                while (index <= 485367) {
                    if (pixels.data[index] != 0 & pixels.data[index+1] != 0 & pixels.data[index+2] != 0 & pixels.data[index+3] != 0) {
                        /**
                         * If the current pixel selected is not black nor fully transparent.
                         */
                        roadPixelCounter++;
                    }
                    index += 4;
                }


                // Calculate the meters per pixel of the image in the Google Maps Static image URL.
                let coordinates = {lat: req.body.lat, lng: req.body.lng};
                let zoom = 15;
                let metersPerPx = 156543.03392 * Math.cos(coordinates.lat * Math.PI / 180) / Math.pow(2, zoom);

                /**
                 * Total surface area is calculated by:
                 * 1. getting the surface area of a pixel.
                 * 2. multiply the surface area of a pixel by the total number of pixels that are classified
                 * as road pixels.
                 * 3. divide the result by 1000000 to convert the total surface area from square metres to
                 * square kilometres.
                 */
                let totalSurfaceAreaKM = (((metersPerPx * metersPerPx) * roadPixelCounter) / 1000000);

                // Get the elapsed time it take to construct the road image url
                // and to calculate the total surface area of roads in the square 
                // kilometre area.
                var elapsedTime = Number(Date.now() - startTime);

                // Return the response to client.
                res.json({area: totalSurfaceAreaKM, time: elapsedTime});
            }
        });
    });

module.exports = router;