let express = require('express');
let config = require('../resource/environment.json');
let app = express();
let uuid = require('uuid');
let database = require('./databaseConnections');
let bodyParser = require('body-parser');

const ADD_USER_SQL = "INSERT INTO dashboard.user_data (username, userpass, uid) VALUES( $1, $2, $3);";
const ADD_DASHBOARD_SQL = `INSERT INTO dashboard.dashboard (dashboard_id, "comment", details, dashboard_name) VALUES($1, $2, $3, $4);`;
const GET_ACCESS = `select ur."role" from dashboard.user_role ur where ur.role_id in (select du.user_role_id  from dashboard.dashboard_user du where du.dashboard_id = $1 and du.user_id = $2)`;
const ADD_DASHBORD_TO_USER = `INSERT INTO dashboard.dashboard_user (dashboard_id, user_id, user_role_id) VALUES($1, $2, $3);`;

let jsonParser = bodyParser.json();

app.get('/healthCheck', function (_req, res) {
   console.log("Server is Healthy")
   let serverHealth = "Server is up at http://" + config.host + ":" + config.port;
   res.end(serverHealth)
})

app.post('/addUser', jsonParser, function(req, res){
    console.log('Got body:', req.body);
    let data = req.body;
    let uid = uuid.v1();
    console.log("Name: %s", data.name)
    console.log("Password: %s", data.password)
    console.log("UserID: %s", uid)

    let values = [data.name, data.password, uid]
    try{
        database.executeQuery(ADD_USER_SQL, values, 
        function(result) {
            res.end(`Update Complete :  ${result.rowCount}`)
        }, function(error){
            console.error(error.message)
            res.end(`Technical Error : ${error.message}`)
        })
    }
    catch(error){
        console.error(error);
    }

})


app.post('/addDashboard', jsonParser, function(req, res){
    console.log('Got body:', req.body);
    let data = req.body;
    let uid = uuid.v1();
    console.log("Dashboard Name: %s", data.dashboard_name)
    console.log("DashboardID: %s", uid)
    let comment = data.comment != undefined ? data.comment : ''
    let details = data.details != undefined ? data.details : ''
    let values = [uid, comment, details, data.dashboard_name]
    try{
        database.executeQuery(ADD_DASHBOARD_SQL, values, 
        function(result) {
            console.log(result)
            values = [uid, data.user, 7]
            database.executeQuery(ADD_DASHBORD_TO_USER, values, 
                function(result2) {
                    res.end(`Update Complete :  ${result2.rowCount}`)
                }, function(error){
                    console.error(error.message)
                    res.end(`Technical Error : ${error.message}`)
                })
        }, function(error){
            console.error(error.message)
            res.end(`Technical Error : ${error.message}`)
        })
    }
    catch(error){
        console.error(error);
    }

})

app.post('/updateUserRole', jsonParser, function(req, res){
    console.log('Got body:', req.body);
    let data = req.body;
    console.log("Name: %s", data.dashboard_name)
    console.log("Password: %s", data.user)
    console.log("roles: %s", data.roles)

    let values = [data.dashboard_name, data.user, data.roles]
    try{
        database.executeQuery(ADD_DASHBORD_TO_USER, values, 
        function(result) {
            res.end(`Update Complete :  ${result.rowCount}`)
        }, function(error){
            console.error(error.message)
            res.end(`Technical Error : ${error.message}`)
        })
    }
    catch(error){
        console.error(error);
    }

})

app.get("/checkAccess", jsonParser,  function(req, res){
    console.log('Got body:', req.query);
    let values = [req.query.dashboardId, req.query.userId]
    try{
        database.executeQuery(GET_ACCESS, values, 
        function(result) {
            let roles = ''
            for(let role in result.rows){
                roles = roles + ' ' + result.rows[role].role
            }
            res.end(`User has access to Complete :  ${roles}`)
        }, function(error){
            console.error(error.message)
            res.end(`Technical Error : ${error.message}`)
        })
    }
    catch(error){
        console.error(error);
    }
})

let server = app.listen(config.port, config.host,  function () {
   console.log("Example app listening at http://%s:%s", config.host, config.port)
})