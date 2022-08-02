# Interview

## Link

<https://docs.google.com/document/d/1ESr2r1Q6YOKtLRb_ykg2Cr6IKbhEV1RdBqKW0gXTY0I/edit>

## Question

Backend tasks

Create the architecture diagram for a platform which does user signup, dashboard creation, collects and displayed data from multiple 3rd party widgets, allows user to do access management (multiple users can join but you have an option to decide which users can access what).

Access Management - Users might have different access levels on multiple dashboards (Read, Write, Comment, View, No Access). From the users who can access the dashboard, only certain users will have access to certain sub parts of the dashboard - (settings, edit access management)

Create a DB schema for the same (SQL based).

Create a nodejs API to create a user in a postgres db. Generate a unique id for every new user.

Create a nodejs API to create a dashboard in the dashboard db based on input provided by user. Only use the field name to create this. Every new dashboard entity to be assigned a unique ID.

## How to Use

1.) Update the resource\environment.json with connection details\
2.) Update the DB using resource\ddl.sql and resource\dml.sql postgres queries
3.) Use npm start to run

## Resources

- ERD Diagram -> .\postgres - dashboard - ERD.png
- Postman Collection -> .\Samudai.postman_collection.json