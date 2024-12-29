# Password Reset API

## Endpoint
`POST /api/reset-password`

## Description
This endpoint allows users to reset their password using a valid reset token. It verifies the token, updates the user's password, and ensures the token cannot be reused.

## Request Body
- `token` (string, required): The password reset token sent to the user's email.
- `email` (string, required): The user's email address associated with the account.
- `newPassword` (string, required): The new password the user wishes to set.

### Example
{
"token": "reset-token-here",
"email": "user@example.com",
"newPassword": "newSecurePassword123"
}

## Response
- **Success (200)**: Confirms that the password has been reset successfully.
  - Example:
    ```json
    {
      "message": "Password successfully reset"
    }
    ```

- **Error (400)**: Indicates an invalid or expired reset token.
  - Example:
    ```json
    {
      "message": "Invalid or expired reset token"
    }
    ```

- **Error (500)**: Indicates a server-side error occurred during the password reset process.
  - Example:
    ```json
    {
      "message": "Error resetting password"
    }
    ```

## Implementation Details
- The endpoint verifies the reset token against stored tokens in the database.
- If valid, the user's password is hashed using bcrypt and updated in the database.
- The used reset token is deleted to prevent reuse.
- The response confirms the successful update of the password.

## Security Considerations
- Ensure passwords are securely hashed using bcrypt before storage.
- Use HTTPS to protect data in transit.
- Implement token expiration and invalidation mechanisms to enhance security.
- Regularly review and update password reset practices to prevent unauthorized access.