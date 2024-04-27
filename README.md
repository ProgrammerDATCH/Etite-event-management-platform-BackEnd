# Etite Event Management Platform Backend

This backend is for the Etite Event Management Platform and was made by David.

## Table of Contents

- [Endpoints](#endpoints)
- [Local Development](#local-development)
- [Deployment](#deployment)

## Endpoints

The backend provides the following endpoints:

### Admin

- **POST /admin/login**: Login as an admin
- **POST /admin/check**: Check if admin is logged in
- **GET /admin/dashboard**: View all admin statistics
- **GET /user/users**: View all users

### Event

- **POST /event/add**: Add a new event
- **PATCH /event/update**: Update an existing event
- **DELETE /event/delete**: Delete an event
- **GET /event/events**: Get all events

### Ticket

- **POST /ticket/add**: Add a new ticket
- **PATCH /ticket/update**: Update an existing ticket by USER
- **PATCH /ticket/updateStatus**: Update ticket status by ADMIN
- **DELETE /ticket/delete**: Delete a ticket
- **GET /ticket/tickets/{eventId}**: Get all tickets of an event

### User

- **POST /user/register**: Register a new user
- **POST /user/login**: Login an existing user
- **POST /user/check**: Check if user is logged in by Token
- **PATCH /user/update**: Update user information
- **DELETE /user/delete**: Delete user

## Local Development

To run the backend locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. rename `.example.env` to `.env` and add all variables values.
3. Start the server using `npm run dev` for Development.
4. The server will start at `http://localhost:9000/api`.

## Deployment

Backend swagger documentation  `https://---.onrender.com/api-docs`.
The backend is deployed and can be accessed at `https://---.onrender.com/api`.