# Use the server
The API development is still ongoing.
But you can use a part of it, `consumption` & `exchange` routes can be used while `installation` routes are under development.
You'll need local data before starting the server.
Warning : the error handling as not being done yet.

## Get some data

```
node daemons/current_day.js
```
Retrieves fresh data (will be used as a deamon on the server).
```
node daemons/store_previous_day.js
```
Retrieves the last day (will be used as a deamon on the server).
```
DAY=2020-07-23 node daemons/store_specific.js
```
Retrieves the specified day (for develoment and maintenance purpose).

## Start the server
```
node api/server.js
```
Later, we'll use `forever`, for now we can simply launch the javascript file.

## Using the API
The doc is available on `http://localhost:8080/docs`.
The API is directly available on `http://localhost:8080`.

Example : `http://localhost:8080/api/v1/zones/consumption?from=2020-07-22&to=2020-07-25`
