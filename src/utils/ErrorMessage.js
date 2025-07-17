export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No account found with this email address";
      case "auth/wrong-password":
        return "Incorrect password. Please try again";
      case "auth/invalid-email":
        return "Please enter a valid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";
      case "auth/network-request-failed":
        return "Network error. Please check your connection";
      default:
        return "Invalid email or password. Please try again";
    }
  };