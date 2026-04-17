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

## Captain Registration Endpoint

### Overview
The captain registration endpoint allows new captains to create an account in the system. It handles validation, password hashing, captain record creation, and JWT token generation.

### Endpoint Details

**Endpoint:** `POST /register`

### Request Body

```json
{
  "email": "captain@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehiclesType": "car"
  }
}
```

### Request Validation

The endpoint validates all input fields:

| Field | Type | Rules |
|-------|------|-------|
| `email` | string | Must be a valid email address |
| `password` | string | Minimum 6 characters |
| `firstName` | string | Minimum 3 characters |
| `lastName` | string | Minimum 3 characters |
| `vehicle.color` | string | Minimum 3 characters |
| `vehicle.plate` | string | Minimum 3 characters, must be unique |
| `vehicle.capacity` | number | Minimum value of 1 |
| `vehicle.vehiclesType` | string | Must be one of: `"car"`, `"motorcycle"`, `"auto"` |

### Request Flow

```
POST /register
  ↓
Routes: captain.routes.js - validates input with express-validator
  ↓
Controller: captain.controller.js (registerCaptain)
  ↓
Service: captain.service.js (createCaptain) - validates required fields
  ↓
Model: captain.model.js (captainModel.create)
  ↓
Database: MongoDB captain collection
```

### Response

#### Success Response (201 Created)
```json
{
  "message": "Captain registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Cookie Set:**
- `token`: JWT token (httpOnly, secure in production)

#### Error Response (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Data Storage

The captain is stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId,
  email: "captain@example.com",
  password: "hashed_password_string",
  fullName: {
    firstName: "John",
    lastName: "Doe"
  },
  vehicles: {
    color: "black",
    plate: "ABC123",
    capacity: 4,
    vehiclesType: "car"
  },
  socketId: null,
  status: "inactive", // default
  location: {
    latitude: null,
    longitude: null
  }
}
```

### Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt before storage (10 salt rounds)
2. **HTTP-Only Cookies**: JWT tokens are set as HTTP-only cookies to prevent XSS attacks
3. **Secure Flag**: Cookie secure flag is enabled in production
4. **Unique Constraints**: Email and vehicle plate are enforced as unique at database level
5. **Input Validation**: All fields are validated before processing

### Example Usage

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123",
    "firstName": "John",
    "lastName": "Doe",
    "vehicle": {
      "color": "black",
      "plate": "MH01AB1234",
      "capacity": 4,
      "vehiclesType": "car"
    }
  }'
```

### Error Scenarios

| Error | Status | Cause |
|-------|--------|-------|
| Validation Error | 400 | Invalid email, weak password, invalid vehicle type, etc. |
| Missing Fields | 400 | Any required field missing in request body |
| Duplicate Email | 400 | Email already exists in database |
| Duplicate Plate | 400 | Vehicle plate already registered |
| Server Error | 500 | Database or server issues |

### Notes

- The captain account is created with a default status of `"inactive"`
- A JWT token is automatically generated and sent back to the client
- The token is valid for 7 days from creation
- The `socketId` field is initially null and used for real-time socket connections later