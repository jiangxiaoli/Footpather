
## TILE API
### get nearby reports
* **uri:** /tile/nearby/reports?lat={}&lng={}
* **method:** get
* **response sample:**
```
[
    {
        "latitude": 37.348836,
        "longitude": -121.966855,
        "type": "robbery",
        "description": "more details",
        "date": "2015-08-24T00:31:52.354Z",
        "likes": 0,
        "_id": "55da65f81e69dddf042cc6bf"
    },
    ....
]
```

### get nearby users
* **uri:** /tile/nearby/users?lat={}&lng={}
* **method:** get
* **response sample:**
```
[
    {
        "_id": "55da26b7370982224fe047fd",
        "icon": "icon1",
        "user_name": "user1",
        "__v": 0,
        "col": 2640,
        "row": 6357,
        "longitude": -121.976855,
        "latitude": 37.337417
    },
    ...
]
```

### get nearby crime reports
* **uri:** /tile/nearby/crimereports?lat={}&lng={}&ids={} 
```   
(if ids is null or empty, then will be default to "104,100,98,103,99,101,8,97,148,9,149,150")
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
```
* **method:** get
* **response sample:**
```
{
    "crimes": [
        {
            "id": 726465681,
            "ccn": "P152180848",
            "incident_date_time": "2015-08-06T21:49:48Z",
            "time_spread": 0,
            "org_id": 23,
            "org_name": "San Jose Police Department",
            "tipsoft_id": 504,
            "incident_type_id": 98,
            "incident_type_name": "ROBBERY (211)",
            "incident_type_pinnable": true,
            "lng": -121.99833,
            "lat": 37.335895,
            "public_narrative": "Time: 21:49:48<br>Final Disposition: R<br>Call Type: ROBBERY<br/><br/>For disposition information <a href=\"http://www.sjpd.org/CrimeStats/CrimeReportsFAQ.html\" target=\"_blank\">click here</a>",
            "processing_level": 3,
            "address": "700 Block LAWRENCE EXPY",
            "description": null,
            "agency_page_link": "SJPD"
        },
        ...
    ],
    "offenders": [
        {
            "id": 146119,
            "pin": {
                "type": "Point",
                "coordinates": [
                    -121.9909929,
                    37.3378185
                ],
                "y": 37.3378185,
                "x": -121.9909929
            },
            "address": "3414 HOMESTEAD RD",
            "city": "SANTA CLARA",
            "state": "CA",
            "zip": "95051",
            "name": "BURGESS, DAVID WRAG",
            "photoUrl": "http://photo.familywatchdog.us/OffenderPhoto/OffenderPhoto.aspx?id=CA1869408322324",
            "lng": -121.9909929,
            "lat": 37.3378185,
            "race": "WHITE",
            "sex": "M",
            "height": "5'10\"",
            "weight": "230",
            "eyeColor": "BROWN",
            "hairColor": "BROWN",
            "age": 0,
            "url": "http://www.meganslaw.ca.gov/disclaimer.aspx"
        },
        ...
    ]
}
```

### get nearby places
* **uri:** /tile/nearby/places?lat={}&lng={}&types={}&radius={}
```
   @param radius (if null or empty, then default to 500)
   @param types (if null or empty, then default to 'store')
   supported types: [https://developers.google.com/places/supported_types]
   when filter multiple types: type1|type2|...
```
* **method:** get
* **response sample:**
```
[
    {
        "geometry": {
            "location": {
                "lat": 37.337908,
                "lng": -121.975229
            }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        "id": "c9a74e7f6fb7ca4785d065860ffec544929eb719",
        "name": "Safeway",
        "opening_hours": {
            "open_now": true,
            "weekday_text": []
        },
        "photos": [
            {
                "height": 256,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/117077121254270343091\">Safeway</a>"
                ],
                "photo_reference": "CmRdAAAACVcD2xHCfvATRcbpCxx8g-Zb9RzeCejgDN5RTDhtfrmdRcOD-aT237gVcwWzbzH4v93fasvlO0MbR6fnuWcxEo_ilW64vENaV1ojJgX0jM3xQqOevpKYac8cfEycCCXhEhB2_y7vrJsfkgHMRzeDwRdBGhSIILI-RYzWZphbv5ck2Y3QWUsTyw",
                "width": 256
            }
        ],
        "place_id": "ChIJfRm1yWbKj4ARf9wIRSVdY64",
        "price_level": 2,
        "rating": 4,
        "reference": "CmRbAAAAw_1h4Cql4wCtCqd3VYOFk_wtYFVpUvuj_fcv1FtI3CC38Rw-bHZoaURmOySx_Pl3jEZvSy8dvZ3vI86wdaZyxYnm1-I1Q8a8qhN-BpctZuVx9CTob0p87Rr2OJ8KeqidEhAl655Q0mOG848qCbmrsXH2GhTBM6-mUWm_x1l_q2gagfABA79BUQ",
        "scope": "GOOGLE",
        "types": [
            "grocery_or_supermarket",
            "bakery",
            "pharmacy",
            "health",
            "florist",
            "store",
            "food",
            "point_of_interest",
            "establishment"
        ],
        "vicinity": "2760 Homestead Road, Santa Clara"
    },
    ....
]
```

## USER API
### add user
* **uri:** /user
* **method:** post
* **request_body:**
```
{
  "icon": "icon1",
  "user_name": "user1"
}
```

### update user location
* **uri:** /user/{id}
* **method:** post
* **request_body:**
```
{
  "latitude": 37.308836,
  "longitude": -121.9939066
}
```

## REPORT API
### add report
* **uri:** /tile/report
* **method:** post
* **request_body:**
```
{
  "latitude": 38.308856,
  "longitude": -123.9939046,
  "type": "theft",
  "description": "more details"
}
```

### like report
* **uri:** /tile/{tile_id}/report/{report_id}
* **method:** post
