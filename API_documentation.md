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