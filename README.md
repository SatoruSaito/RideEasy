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

CREATE TABLE `vehicle_type` (
`uuid` varchar(255) NOT NULL,
`type` varchar(40) NOT NULL,
`created_at` DATETIME NOT NULL DEFAULT NOW(),
`updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
PRIMARY KEY (`uuid`),
UNIQUE KEY `idx_vehicle_type_type` (`type`)
);

INSERT INTO vehicle_type (`uuid`,`type`) VALUES ('2W323FDS','CAR');
INSERT INTO vehicle_type VALUES ('3W323FDS','TRUCK',NOW(),NOW());

---

CREATE TABLE `location` (
`uuid` varchar(255) NOT NULL,
`name` varchar(255) NOT NULL,
`address` varchar(255) NOT NULL,
`city` varchar(255) NOT NULL,
`state` varchar(255) NOT NULL,
`zip_code` varchar(40) NOT NULL,
`capacity` int NOT NULL,
`number_of_vehicles` int NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`uuid`),
KEY `idx_location_zip_code_number_of_vehicles` (`zip_code`,`number_of_vehicles`)
);

INSERT INTO location VALUES ('4W323FDS','San Jose Airpot','1701 Airport Blvd', 'San Jose', 'CA', '95110', 100, 40, NOW(),NOW());

---

CREATE TABLE `vehicle` (
`uuid` varchar(255) NOT NULL,
`vehicle_type_uuid` varchar(255) NOT NULL,
`model` varchar(100) NOT NULL,
`make` varchar(100) NOT NULL,
`year` smallint NOT NULL,
`registration_number` varchar(255) NOT NULL,
`current_mileage` int NOT NULL,
`last_serviced_date` datetime NOT NULL,
`is_reserved` boolean NOT NULL,
`vehicle_condition` varchar(255) NOT NULL,
`next_available_time` datetime NOT NULL,
`location_uuid` varchar(255) NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`uuid`),
FOREIGN KEY (vehicle_type_uuid) REFERENCES vehicle_type(uuid) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (location_uuid) REFERENCES location(uuid) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO vehicle VALUES
('34W323FDS','2W323FDS','Model X','Tesla', '2020','R36346','5321','2020-02-01 00:01:00',false,'Needs Cleaning', '2020-04-05 09:00:00', '4W323FDS', NOW(),NOW());

---

CREATE TABLE `vehicle_price_range` (
`uuid` varchar(255) NOT NULL,
`vehicle_type_uuid` varchar(255) NOT NULL,
`min_hours` int NOT NULL,
`max_hours` int NOT NULL,
`price` int NOT NULL,
`late_fee` int NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`uuid`),
KEY `idx_vehicle_price_range_vehicle_type_uuid_min_hours_max_hours` (`vehicle_type_uuid`,`min_hours`,`max_hours`),
CONSTRAINT `vehicle_price_range_ibfk_1` FOREIGN KEY (`vehicle_type_uuid`) REFERENCES `vehicle_type` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO vehicle_price_range VALUES ('3BJHFSB', '2W323FDS',2,24,68,100,NOW(),NOW());

---

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
);

INSERT INTO user VALUES ('423FSFDWE','Brad','Pitt','rockstar2020','D323423','California','brad@gmail.com','123 Beverly Hills','Los Angeles','CA','93526','4987654127645297',NOW(),NOW());

---

CREATE TABLE `membership` (
`uuid` varchar(255) NOT NULL,
`user_uuid` varchar(255) NOT NULL,
`start_date` datetime NOT NULL,
`end_date` datetime NOT NULL,
`status` varchar(20) NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`uuid`),
UNIQUE KEY `idx_membership_user_uuid` (`user_uuid`),
CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO membership VALUES ('3243SFSRUWE','423FSFDWE','2020-02-21 00:07:00','2020-08-21 00:07:00','ACTIVE',NOW(),NOW());

---

CREATE TABLE reservation(
uuid VARCHAR(255) PRIMARY KEY,
vehicle_uuid VARCHAR(255) NOT NULL,
user_uuid VARCHAR(255) NOT NULL,
start_date DATETIME NOT NULL,
end_date DATETIME NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (vehicle_uuid) REFERENCES vehicle(uuid) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (user_uuid) REFERENCES user(uuid) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO reservation VALUES ('43243SFSRUWE','34W323FDS','423FSFDWE','2020-04-10 00:07:00','2020-04-21 00:07:00',NOW(),NOW());


ALTER TABLE vehicle MODIFY last_serviced_date datetime;
ALTER TABLE reservation MODIFY is_car_returned boolean;

ALTER TABLE membership MODIFY start_date datetime;
ALTER TABLE membership MODIFY end_date datetime;

ALTER TABLE reservation ADD COLUMN is_car_returned boolean; \
ALTER TABLE reservation ADD COLUMN car_returned_date datetime; \

CREATE TABLE `policy` (
  `uuid` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `time_in_months` int NOT NULL,
  `is_expired` boolean NOT NULL DEFAULT false,
   `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`uuid`)\
)
	ALTER TABLE reservation ADD COLUMN is_pickedUp boolean
---
