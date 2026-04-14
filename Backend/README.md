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

## `POST /users/login`

Authenticates an existing user in the system.

### Description

This endpoint authenticates a user using their email and password. Input validation is performed on the request body, and the password is compared against the hashed password stored in the database.

### Request Body

The endpoint expects a JSON object with the following fields:

- `email` (string, required) - User email address. Must be a valid email format.
- `password` (string, required) - User password. Must be at least 6 characters long.

Example request:

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Success Response

- Status: `200 OK`

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
  "message": "User logged in successfully"
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
    }
  ]
}
```

### Authentication Errors

- Status: `401 Unauthorized`

Occurs when the email or password is incorrect.

Example response:

```json
{
  "message": "Invalid email or password"
}
```

## `GET /users/profile`

Retrieves the profile of the currently authenticated user.

### Description

This endpoint returns the user object for the user associated with the provided authentication token. The user object does not contain sensitive information like the password.

### Authentication

A valid JSON Web Token (JWT) must be included in the request. The token can be provided in two ways:

1.  As a cookie named `token`.
2.  In the `Authorization` header as a Bearer token (`Authorization: Bearer <jwt-token>`).

### Success Response

-   Status: `200 OK`

Response body:

```json
{
  "user": {
    "_id": "<user-id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Authentication Errors

-   Status: `401 Unauthorized`

Occurs when the token is missing, invalid, expired, or the associated user does not exist.

Example responses:

```json
{ "message": "No token provided" }
```

```json
{ "message": "Invalid token" }
```

## `GET /users/logout`

Logs out the currently authenticated user.

### Description

This endpoint invalidates the user's current session by clearing the authentication cookie and blacklisting the JWT to prevent it from being used again.

### Authentication

A valid JSON Web Token (JWT) must be included in the request, either via a `token` cookie or an `Authorization` header.

### Success Response

-   Status: `200 OK`

Response body:

```json
{
  "message": "User logged out successfully"
}
```
```
