/**
 * Created by lan on 8/22/15.
 */

var request = require('request');

module.exports = {
    getCrimeReports: function(row, col, start, end, ids, callback) {

        /**
         * incident type id:
         * 104:Homicide
         * 100:Breaking & Entering
         * 98:Robbery
         * 103:Theft
         * 99:Theft of Vehicle
         * 101:Theft from Vehicle
         * 170:Vehicle Recovery
         * 8:Sexual Offense
         * 97:Other Sexual Offense
         * 148:Sexual Assault
         * 9:Assault
         * 149:Assault
         * 150:Assault with Deadly Weapon
         */
        var base_url = "https://www.crimereports.com/v3/crime_reports/map/search_by_tile.json";
        var url = base_url + "?start_date=" + start +
            "&end_date=" + end +
            "&incident_type_ids=" + ids +
            "&row=" + row +
            "&column=" + col +
            "&zoom=14&include_sex_offenders=true";

        request.get(url,
            function (error, response, body) {
                if (error)
                    callback("err get: " + url);
                else
                    callback(null, JSON.parse(body));
            }
        );
    }
}