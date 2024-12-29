# User Signup API

## Endpoint
`POST /api/signup`

## Description
This endpoint allows new users to create an artist account on the platform. It collects necessary user information, validates it, and stores the user data securely in the database. Upon successful registration, the user receives a JWT token for authentication.

## Request Body
- `accountName` (string, required): The desired artist name for the account.
- `email` (string, required): The user's email address, used for account identification and communication.
- `password` (string, required): A secure password for the account.
- `confirmPassword` (string, required): Confirmation of the password to ensure accuracy.

### Example
{
"accountName": "ArtistName",
"email": "artist@example.com",
"password": "securePassword123",
"confirmPassword": "securePassword123"
}


## Response
- **Success (200)**: Returns a success message and a JWT token for authentication.
  - Example:
    ```json
    {
      "message": "Account created successfully",
      "token": "jwt-token-here"
    }
    ```

- **Error (400)**: Indicates validation errors, such as mismatched passwords or invalid email format.
  - Example:
    ```json
    {
      "message": "Validation error: Passwords do not match"
    }
    ```

- **Error (409)**: Indicates that an account with the provided email or artist name already exists.
  - Example:
    ```json
    {
      "message": "An account with this email or artist name already exists"
    }
    ```

- **Error (500)**: Indicates a server-side error occurred during account creation.
  - Example:
    ```json
    {
      "message": "Internal server error"
    }
    ```

## Implementation Details
- The endpoint validates the input data, ensuring the email is in a valid format and the passwords match.
- Passwords are hashed using bcrypt before storage to enhance security.
- A new user record is created in the database, and a JWT token is generated for the user.
- The JWT token is signed with a secret key and includes user identification information.

## Security Considerations
- Ensure passwords are stored securely using hashing algorithms like bcrypt.
- Use HTTPS to protect data in transit.
- Implement rate limiting to prevent abuse of the signup endpoint.
- Regularly update and rotate secret keys used for signing JWT tokens.