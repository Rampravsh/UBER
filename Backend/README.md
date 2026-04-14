# User Registration Endpoint

## `POST /users/register`

Registers a new user in the system.

### Description

This endpoint creates a new user account using the provided first name, last name, email, and password. Input validation is performed on the request body, and the password is hashed before the user record is saved.

### Request Body

The endpoint expects a JSON object with the following fields:

- `firstName` (string, required) - User first name. Must be at least 3 characters long.
- `lastName` (string, required) - User last name. Must be at least 3 characters long.
- `email` (string, required) - User email address. Must be a valid email format.
- `password` (string, required) - User password. Must be at least 6 characters long.

Example request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Success Response

- Status: `201 Created`

Response body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "message": "User registered successfully"
}
```

### Validation Errors

- Status: `400 Bad Request`

Occurs when required fields are missing or invalid.

Example response:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Notes

- The endpoint expects JSON in the request body.
- Passwords are hashed before storage.
- The returned `token` is a JSON Web Token generated with `JWT_SECRET` from environment variables.
