# User Login API

## Endpoint
`POST /api/login`

## Description
This endpoint authenticates users by verifying their credentials. Upon successful authentication, it issues a JWT token that allows the user to access protected resources within the application.

## Request Body
- `email` (string, required): The user's email address used for account identification.
- `password` (string, required): The user's password for authentication.

### Example
json
{
"email": "user@example.com",
"password": "userPassword123"
}

## Response
- **Success (200)**: Returns a JWT token for accessing protected resources.
  - Example:
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token-here"
    }
    ```

- **Error (400)**: Indicates invalid credentials or missing fields.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Error (500)**: Indicates a server-side error occurred during the login process.
  - Example:
    ```json
    {
      "message": "Internal server error"
    }
    ```

## Implementation Details
- The endpoint checks the provided email and password against stored user records.
- Passwords are compared using bcrypt to ensure security.
- If authentication is successful, a JWT token is generated and returned to the user.
- The JWT token is signed with a secret key and includes user identification information.

## Security Considerations
- Ensure passwords are securely hashed and never stored in plain text.
- Use HTTPS to protect data in transit.
- Implement rate limiting to prevent brute force attacks on the login endpoint.
- Regularly update and rotate secret keys used for signing JWT tokens.