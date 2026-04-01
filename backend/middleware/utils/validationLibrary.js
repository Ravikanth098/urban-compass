// Validation Utility Library

// Check empty input
export function isEmpty(value) {
  return !value || value.trim() === "";
}

// Validate username
export function isValidUsername(username) {
  return username.length >= 3;
}

// Validate password
export function isValidPassword(password) {
  return password.length >= 4;
}