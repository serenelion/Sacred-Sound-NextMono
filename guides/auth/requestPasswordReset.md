# Password Reset Request API

## Endpoint
`POST /api/request-password-reset`

## Description
This endpoint allows users to request a password reset. If the provided email is associated with an account, a password reset link will be sent to the user's email address. For security reasons, the response does not reveal whether the email exists in the database.

## Request Body
- `email` (string, required): The email address associated with the user's account.

### Example
json
{
"email": "user@example.com"
}

## Response
- **Success (200)**: A message indicating that if an account exists with the provided email, a password reset link will be sent.
  - Example:
    ```json
    {
      "message": "If an account exists with this email, you will receive a password reset link"
    }
    ```

- **Error (500)**: An error message indicating a server-side issue.
  - Example:
    ```json
    {
      "message": "Error processing password reset request"
    }
    ```

## Implementation Details
- The endpoint uses MongoDB to check if the user exists and stores a password reset token in the `passwordResetTokens` collection.
- A reset token is generated using bcrypt's salt generation and is hashed before storage.
- The reset token is valid for 1 hour.
- An email is sent to the user with a link to reset their password. The link includes the reset token and the user's email as query parameters.
- The email is sent using Nodemailer, configured with Gmail as the service provider.

## Security Considerations
- The response does not indicate whether the email exists to prevent information leakage.
- The reset token is hashed before storage to enhance security.
- The reset link expires after 1 hour to minimize the risk of unauthorized access.