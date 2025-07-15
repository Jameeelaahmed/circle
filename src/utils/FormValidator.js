export const validateForm = (fields, toast) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value?.trim()) {
      toast.error(`Please enter your ${key}`);
      return false;
    }

    if (key === "email" && !value.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (key === "password" && value.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
  }

  return true;
};