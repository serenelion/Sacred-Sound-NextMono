# ResetPassword Component

## Purpose
Handles password reset functionality after email verification.

## State Management
- **`password` (string):** New password input
- **`confirmPassword` (string):** Password confirmation input
- **`message` (string):** Success message display
- **`error` (string):** Error message display
- **`isLoading` (boolean):** Loading state during API call

## URL Parameters
- **`token`**: Reset token from email link
- **`email`**: User's email from link

## Password Reset Flow
1. Validate URL parameters on mount.
2. User enters new password twice.
3. Submit triggers API call.
4. **Success:**
   - Display confirmation message.
   - Redirect to login after 2 seconds.
5. **Failure:**
   - Display error message.

## API Integration
- **Endpoint:** `${process.env.REACT_APP_API_BASE_URL}/api/reset-password`
- **Method:** POST
- **Payload:**
  ```json
  {
    "token": "string",
    "email": "string",
    "newPassword": "string"
  }
  ```

## Security Features
- Password confirmation.
- Minimum password length (6 characters).
- Token validation.
- Email validation.

## Layout Sections
### 1. Header
- "Set New Password" title.

### 2. Messages
- Error/Success display.

### 3. Form
- Password input.
- Confirm password input.
- Submit button.

## Styled Components
- **`ResetPasswordContainer`:** Full-screen gradient background.
- **`Title`:** Main heading.
- **`Input`:** Password fields.
- **`Button`:** Submit button.
- **`Message`:** Success/Error display.

## Form Validation
- Both fields required.
- Passwords must match.
- Minimum length: 6 characters.
- Valid token required.
- Valid email required.

## Loading States
- Button text changes to "Resetting...".
- Inputs disabled.
- Button disabled.

## Error Handling
- Invalid/missing token.
- Invalid/missing email.
- Password mismatch.
- Password too short.
- Network errors.
- Server errors.

## Navigation
- **Success:** Redirects to `/login`.

## Responsive Design
- Full viewport height (`100vh`).
- Centered content.
- Consistent padding (`20px`).
- Flexible input width (`100%`).

## Accessibility
- Required field indication.
- Disabled state handling.
- Error message association.
- Password visibility toggle (future enhancement).

## Dependencies
- `react`
- `react-router-dom` (`useNavigate`, `useLocation`)
- `styled-components`
- `process.env` for API URL

## Color Scheme
- **Background:** `linear-gradient(#a1c4fd, #c2e9fb)`
- **Success:** `#4CAF50`
- **Error:** `#ff0000`
- **Button:** `#4a90e2` (hover: `#357ab8`)
