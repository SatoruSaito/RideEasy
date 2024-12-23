const mysql = require('mysql');
const config = require('./config');
const {uuid} = require('uuidv4');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.dbHost,
    user: config.dbUser,
    password: config.password,
    database: config.database
});
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        console.log("USER REGISTRATION EVENT: \n" + JSON.stringify(event));
        const userProperties = event.request.userAttributes;
        const newUser = {
            uuid: userProperties.sub,
            first_name: userProperties.given_name,
            last_name: userProperties.family_name,
            user_name: event.userName,
            address: userProperties.address,
            email_address: userProperties.email
        };

        const newMembership = {
            uuid: uuid(),
            user_uuid: userProperties.sub,
            status: 'INCOMPLETE'
        };
        console.log("######### newMembership payload ",newMembership);
        console.log("######### newUser payload ",newUser);
        // Use the connection
        connection.query("INSERT INTO user SET ?", newUser, function (error, results, fields) {
            if (error) {
                console("############ ERROR OCCURRED WHILE INSERTING INTO USER");
                console.log(error);
                callback(error);
            }
            connection.query("INSERT INTO membership SET ?", newMembership, function (error, results, fields) {
                if (error) {
                    console("############ ERROR OCCURRED WHILE INSERTING INTO membership");
                    console.log(error);
                    callback(error);
                }
            });
            // When done with the connection, release it.
            connection.release();
            callback(null, event);
        });
    });
};
