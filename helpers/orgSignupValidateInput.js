export const validatePasswordInput = (input) => {
  const hasNumber = /\d/; // Check for a digit
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Check for special characters
  const hasUpperCase = /[A-Z]/; // Check for uppercase letters

  if (input === "") {
    return "Field required.";
  }
  if (!hasNumber.test(input)) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar.test(input)) {
    return "Password must contain at least one special character.";
  }
  if (!hasUpperCase.test(input)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (input.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null; // No errors
};

export const validateEmailInput = (input) => {
  if (input === "") {
    return "Field required.";
  }
};
