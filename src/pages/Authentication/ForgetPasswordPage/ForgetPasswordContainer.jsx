import { useState } from "react";

import PresentationalForgetPassword from "./PresentationalForgetPassword";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/ErrorMessage";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase-config";

const ForgotPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await sendPasswordResetEmail(auth, email);
      toast.success("Your password has been successfully reset");
    } catch (error) {
      toast.error(getErrorMessage(error.code));
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PresentationalForgetPassword
      email={email}
      setEmail={setEmail}
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      isLoading={isLoading}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPasswordContainer;
