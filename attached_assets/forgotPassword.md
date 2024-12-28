# ForgotPassword Component

## Purpose
Handles password reset requests through email verification.

## State Management
- **`email` (string):** User's email input
- **`message` (string):** Success message display
- **`error` (string):** Error message display
- **`isLoading` (boolean):** Loading state during API call

## Password Reset Flow
1. User enters email.
2. Submit triggers API call.
3. **Success:**
   - Display confirmation message.
   - Clear email input.
4. **Failure:**
   - Display error message.

## API Integration
- **Endpoint:** `${process.env.REACT_APP_API_BASE_URL}/api/request-password-reset`
- **Method:** POST
- **Payload:**
  ```json
  {
    "email": "string"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "string"
  }
  ```

## Security Features
- Generic success message (prevents email enumeration).
- Rate limiting (handled by backend).
- Input sanitization.

## Layout Sections
### 1. Header
- **Elements:**
  - "Forgot Password" title.
  - Instruction subtitle.

### 2. Form
- **Elements:**
  - Email input.
  - Submit button.

### 3. Messages
- **Elements:**
  - Success/Error display.

### 4. Navigation
- **Elements:**
  - Login link.

## Styled Components
- **`ForgotPasswordContainer`:** Full-screen gradient background.
- **`Title`:** Main heading.
- **`Subtitle`:** Secondary text and links.
- **`Input`:** Email field.
- **`Button`:** Submit button.
- **`Message`:** Success/Error display.

## Form Validation
- **Email:** Required.
- **Email format validation.**

## Loading States
- Button text changes to "Sending...".
- Input field disabled.
- Button disabled.

## Error Handling
- Network errors.
- Invalid email format.
- Server errors.

## Responsive Design
- Full viewport height (`100vh`).
- Centered content.
- Consistent padding (`20px`).
- Flexible input width (`100%`).
- Uniform height for inputs/buttons (`50px`).

## Navigation
- **Login link** routes to `/login`.

## Accessibility
- Required field indication.
- Disabled state handling.
- Error message association.

## Dependencies
- `react`
- `styled-components`
- `process.env` for API URL

## Color Scheme
- **Background:** `linear-gradient(#a1c4fd, #c2e9fb)`
- **Success:** `#4CAF50`
- **Error:** `#ff0000`
- **Button:** `#4a90e2` (hover: `#357ab8`)
