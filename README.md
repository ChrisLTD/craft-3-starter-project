# docker-compose-lamp
A simple set of dockers for running a local LAMP
- Apache
- PHP 7
- MariaDB
- phpMyAdmin

## General Usage Information

By default this mounts the `/var/www/html` directory to `./app` on your host OS.  It is intended to keep all of the web application files outside of the containers so you can easily work on the files. The database files are mounted to the `./data` directory.

### To run the containers

`docker-compose up -d` (Starts the Containers)


### Accessing the web server

Navigate to [http://localhost:8080](http://localhost:8080)

### Accessing phpMyAdmin

Navigate to [http://localhost:8081](http://localhost:8081)

### Accessing the database from your host

Use a tool like [Sequel Pro](https://sequelpro.com) to connect to:
```
host: 127.0.0.1
username: root
password: root
port: 8082
```

### Accessing the database from the web server container

```
host: db
username: root
password: root
port: 3306
```
