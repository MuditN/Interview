-- DROP SCHEMA dashboard;

CREATE SCHEMA dashboard AUTHORIZATION postgres;
-- dashboard.user_data definition

-- Drop table

-- DROP TABLE dashboard.user_data;

CREATE TABLE dashboard.user_data (
	username varchar(255) NOT NULL,
	userpass varchar(255) NOT NULL,
	uid varchar NOT NULL,
	CONSTRAINT user_data_pk PRIMARY KEY (uid),
	CONSTRAINT user_data_un UNIQUE (username)
);
CREATE INDEX user_data_uid_idx ON dashboard.user_data USING btree (uid);


-- dashboard.user_role definition

-- Drop table

-- DROP TABLE dashboard.user_role;

CREATE TABLE dashboard.user_role (
	role_id numeric NOT NULL,
	"role" varchar NOT NULL,
	CONSTRAINT user_role_pk PRIMARY KEY (role_id)
);


-- dashboard.dashboard definition

-- Drop table

-- DROP TABLE dashboard.dashboard;

CREATE TABLE dashboard.dashboard (
	dashboard_id varchar NOT NULL,
	"comment" varchar NULL,
	details varchar NULL,
	dashboard_name varchar NULL,
	CONSTRAINT dashboard_pk PRIMARY KEY (dashboard_id)
);


-- dashboard.dashboard_user definition

-- Drop table

-- DROP TABLE dashboard.dashboard_user;

CREATE TABLE dashboard.dashboard_user (
	dashboard_id varchar NOT NULL,
	user_id varchar NULL,
	user_role_id numeric NULL,
	CONSTRAINT dashboard_user_fk FOREIGN KEY (user_role_id) REFERENCES dashboard.user_role(role_id),
	CONSTRAINT dashboard_user_fk_1 FOREIGN KEY (user_id) REFERENCES dashboard.user_data(uid),
	CONSTRAINT dashboard_user_fk_2 FOREIGN KEY (dashboard_id) REFERENCES dashboard.dashboard(dashboard_id)
);
