# The Targaryens - RideEasy Car Rental Project

* Project Diagrams


# [Use Case Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/UseCase.png)

![Use Case Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/UseCase.png)




# [Architecture Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/Architecture.png)

![Architecture Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/Architecture.png)




# [Deployment Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/Deployment.png)

![Deployment Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/Deployment.png)



* MVC Design Pattern


# [Technology Stack](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/TechStack.png)


![Deployment Diagram](https://github.com/gopinathsjsu/sp20-cmpe-202-sec-49-team-project-the-targaryens/blob/master/Diagrams/TechStack.png)



The ReactJS Framework acts as our View. In NodeJS we configure routes to send requests to the appropriate controller which then does request validation and uses the model to fetch data from the database. The data model i.e. RDS in this application is UI agnostic. In this way, we are able to separate the View from the Model. Users of the application will be served consistent data from the model simultaneously at different contexts.


## Using this project

Clone the project, change into the directory and install the dependencies.

```bash

npm install
```

Create a `.env` file at root directory for environment variables in your server.

```
PORT= 5000
SERVER_PORT = 3000
DEV_ENV = "dev"
PROD_ENV = "prod"
```

You can start the server on its own with the command:

```bash
npm run server
```

Run the React application on its own with the command:

```bash
npm start
```

Run both applications together with the command:

```bash
npm run dev
```

The React application will run on port 5000 and the server port 3000.

## Database Setup:

- Run the following script as is in mysql workbench.
- Foreign key indexes have been created.
- Dummy data has been inserted to run tests.

```
CREATE TABLE `location` (
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip_code` varchar(40) NOT NULL,
  `capacity` int(11) NOT NULL,
  `number_of_vehicles` int(11) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT FALSE,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `idx_location_zip_code_number_of_vehicles` (`zip_code`,`number_of_vehicles`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `vehicle_type` (
  `uuid` varchar(255) NOT NULL,
  `type` varchar(40) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `idx_vehicle_type_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `vehicle` (
  `uuid` varchar(255) NOT NULL,
  `vehicle_type_uuid` varchar(255) NOT NULL,
  `model` varchar(100) NOT NULL,
  `make` varchar(100) NOT NULL,
  `year` smallint(6) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `current_mileage` int(11) NOT NULL,
  `last_serviced_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT FALSE,
  `vehicle_condition` varchar(255) NOT NULL,
  `next_available_time` datetime NOT NULL,
  `location_uuid` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `vehicle_type_uuid` (`vehicle_type_uuid`),
  KEY `location_uuid` (`location_uuid`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`vehicle_type_uuid`) REFERENCES `vehicle_type` (`uuid`),
  CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`location_uuid`) REFERENCES `location` (`uuid`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `vehicle_price_range` (
  `uuid` varchar(255) NOT NULL,
  `vehicle_type_uuid` varchar(255) NOT NULL,
  `min_hours` int(11) NOT NULL,
  `max_hours` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `late_fee` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `idx_vehicle_price_range_vehicle_type_uuid_min_hours_max_hours` (`vehicle_type_uuid`,`min_hours`,`max_hours`),
  CONSTRAINT `vehicle_price_range_ibfk_1` FOREIGN KEY (`vehicle_type_uuid`) REFERENCES `vehicle_type` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `user` (
  `uuid` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `driver_license_number` varchar(10) NOT NULL,
  `license_state` varchar(40) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `credit_card_number` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `idx_user_user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `policy` (
  `uuid` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `time_in_months` int(11) NOT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `membership` (
  `uuid` varchar(255) NOT NULL,
  `user_uuid` varchar(255) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `idx_membership_user_uuid` (`user_uuid`),
  CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `reservation` (
  `uuid` varchar(255) NOT NULL,
  `vehicle_uuid` varchar(255) NOT NULL,
  `user_uuid` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `is_car_returned` tinyint(1) DEFAULT NULL,
  `car_returned_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_pickedUp` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `vehicle_uuid` (`vehicle_uuid`),
  KEY `user_uuid` (`user_uuid`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`vehicle_uuid`) REFERENCES `vehicle` (`uuid`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE membership ADD COLUMN policy_uuid varchar(255);
```
---
