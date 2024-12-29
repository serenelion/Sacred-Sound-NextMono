# Authentication Overview

The authentication system provides a secure way for users to interact with the application, managing user sessions, and ensuring secure access to resources. Below is an overview of the authentication-related endpoints and their functionalities.

## Endpoints

### 1. User Registration
- **POST /api/signup**
  - **Description**: Allows new users to create a listener or an artist account (isArtist = false or isArtist = true).
  - **Request**: Requires user details such as email, password, and account name.
  - **Response**: Returns a success message and a JWT token upon successful account creation.

### 2. User Login
- **POST /api/login**
  - **Description**: Authenticates users and initiates a session.
  - **Request**: Requires email and password.
  - **Response**: Returns a JWT token for accessing protected resources.

### 3. User Logout
- **POST /api/logout**
  - **Description**: Terminates the user's session.
  - **Request**: Requires a valid session token.
  - **Response**: Confirms session termination.

### 4. Password Management
- **POST /api/request-password-reset**
  - **Description**: Initiates a password reset process by sending a reset link to the user's email.
  - **Request**: Requires the user's email address.
  - **Response**: Confirms that a reset link has been sent if the email exists.

- **POST /api/reset-password**
  - **Description**: Resets the user's password using a valid reset token.
  - **Request**: Requires a new password and a valid reset token.
  - **Response**: Confirms password reset success.

### 5. Token Management
- **POST /api/refreshToken**
  - **Description**: Refreshes the user's access token using a valid refresh token.
  - **Request**: Requires a refresh token.
  - **Response**: Returns a new access token and optionally a new refresh token.

## Security Considerations
- All endpoints should be accessed over HTTPS to ensure data security.
- JWT tokens should be securely stored and managed on the client-side.
- Implement rate limiting and monitoring to prevent abuse of authentication endpoints.
- Regularly update and rotate secret keys used for signing tokens.