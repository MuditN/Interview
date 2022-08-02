const ADD_USER_SQL = "INSERT INTO dashboard.user_data (username, userpass, uid) VALUES( $1, $2, $3);";
const ADD_DASHBOARD_SQL = `INSERT INTO dashboard.dashboard (dashboard_id, "comment", details, dashboard_name) VALUES($1, $2, $3, $4);`;
const GET_ACCESS = `select ur."role" from dashboard.user_role ur where ur.role_id in (select du.user_role_id  from dashboard.dashboard_user du where du.dashboard_id = $1 and du.user_id = $2)`;
const ADD_DASHBORD_TO_USER = `INSERT INTO dashboard.dashboard_user (dashboard_id, user_id, user_role_id) VALUES($1, $2, $3);`;