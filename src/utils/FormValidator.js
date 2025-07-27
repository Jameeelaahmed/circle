// Validate select (array of options)
export function validateSelect(value, fieldName = "field") {
  if (!Array.isArray(value) || value.length === 0) {
    return `Please select at least one ${fieldName}`;
  }
  return "";
}
export function validateDate(value) {
  if (!value || !value.trim()) {
    return "Please enter a date";
  }
  // Check if value is a valid date string (YYYY-MM-DD)
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Please enter a valid date";
  }
  // Check if date is not at least one day after today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  if (date < minDate) {
    return "Date must be at least one day after today";
  }
  return "";
}

// Returns error string or empty string
export function validateText(value, fieldName = "field") {
  if (!value || !value.trim()) {
    return `Please enter your ${fieldName}`;
  }
  return "";
}

export function validateEmail(value) {
  if (!value || !value.trim()) {
    return "Please enter your email";
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    return "Please enter a valid email address";
  }
  return "";
}

export function validatePassword(value) {
  if (!value || !value.trim()) {
    return "Please enter your password";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
}
// Validate form with text and date fields
export function validateForm(fields) {
  const errors = {};
  // Circle Name (text)
  if ('circleName' in fields) {
    const err = validateText(fields.circleName, 'circle name');
    if (err) errors.circleName = err;
  }
  // Type (select)
  if ('type' in fields) {
    if (!fields.type || !fields.type.trim()) {
      errors.type = 'Please select circle type';
    }
  }
  // Privacy (select)
  if ('circlePrivacy' in fields) {
    if (!fields.circlePrivacy || !fields.circlePrivacy.trim()) {
      errors.circlePrivacy = 'Please select circle privacy';
    }
  }
  // Description (text)
  if ('description' in fields) {
    const err = validateText(fields.description, 'description');
    if (err) errors.description = err;
  }
  // Due Date (expireDate)
  if ('expireDate' in fields && fields.type === 'Flash Circle') {
    const err = validateDate(fields.expireDate);
    if (err) errors.expireDate = err;
  }
  // Members (select)
  if ('members' in fields) {
    const err = validateSelect(fields.members, 'member');
    if (err) errors.members = err;
  }
  // Interests (select)
  if ('interests' in fields) {
    const err = validateSelect(fields.interests, 'interest');
    if (err) errors.interests = err;
  }
  return errors;
}

// Validate form with email and password fields
export function validateLoginForm(fields) {
  const errors = {};
  if ('email' in fields) {
    const err = validateEmail(fields.email);
    if (err) errors.email = err;
  }
  if ('password' in fields) {
    const err = validatePassword(fields.password);
    if (err) errors.password = err;
  }
  return errors;
}