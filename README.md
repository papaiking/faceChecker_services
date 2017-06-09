# About module

This is one module in application: FaceChecker at: [http://labsofthings.com/facechecker](http://labsofthings.com/facechecker)

Module repository: [https://github.com/papaiking/faceChecker_services](https://github.com/papaiking/faceChecker_services)

This module act as: data service and socket io server

Do following tasks:

1.  Authenticate device
2.  Distribute Linkedface++ application token to device
3.  Receive check event from device and do following:

    -   Save event into DB
    -   Emit event to socket io

# Installation

### Clone project

Clone FaceChecker-Service from repository: [https://github.com/papaiking/faceChecker_services.git](https://github.com/papaiking/faceChecker_services.git)

### Database

As you see in FaceChecker architecture, this service use a relation database. In this version, we use MySQL version: 5.6

You can get reference on how to install MySQL on Ubuntu here: [https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04](https://www.di    gitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04)

After this step, let’s create database:

```
$ mysql -u root –p
Enter password
mysql> CREATE DATABASE facechecker
mysql> CREATE USER 'facechecker'@'localhost' IDENTIFIED BY 'lot123';
```

Then import database.

Module folder: faceChecker_services/data and run:

```
$ mysql -u facechecker -p facechecker < facechecker.sql
enter password
```

# Configurations

### Register application in Linkedface++

You have to register Linkedface++ application in order to access Linkedface++ services.

Refer to use Linkedface++ platform at: [http://plusplus.linkedface.com](http://plusplus.linkedface.com)

After registering application, save your app_id and app_secret

### Configure parameters

Go to project folder, edit the configuration file: `/config/settings.js` , update values for

-   port: service port
-   DB connection,
-   secret: this is the random string working as seed for JWT. After running system, don’t change this value.
-   identity information of Linkedface++ third party application (app_id and app_secret)

```
var settings = {
    path        : path.normalize(path.join(__dirname, '..')),
    port        : process.env.NODE_PORT || 9100,
    database    : {
        protocol: "mysql",
        query   : { pool: true },
        host    : "127.0.0.1",
        database: "facechecker",
        user    : "facechecker",
        password: "lot123"
    },
    secret      : 'ANY_STRING_HERE',
    Linkedface_OAUTH    : 'https://api.linkedface.com/oauth',
    app_identity: {
        app_id:"73705ee75cbdf46f7d68539e7523e879",
        secret:"RC3VZ53O5DJH3V687WCKOXZ81XQF80RY"
    }
};
```

# Run application

Go to project folder and run command: `npm start`

Following output as successful installation:

```
osboxes@linkedface:~/faceChecker/facechecker_server$ npm start

> FaceChecker_Server@ start /home/osboxes/faceChecker/facechecker_server
> script/start

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /home/osboxes/faceChecker/facechecker_server/app/**/* /home/osboxes/faceChecker/facechecker_server/config/**/* /home/osboxes/faceChecker/facechecker_server/models/**/* node_modules/sql-query server.js
[nodemon] starting `node server.js`
Listening on port 9100
```

# Reference

For full document on FaceChecker application, please access: [http://labsofthings.com/facechecker](http://labsofthings.com/facechecker)
