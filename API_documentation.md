
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
* **uri:** /tile/nearby/crimereports?lat={}&lng={}
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