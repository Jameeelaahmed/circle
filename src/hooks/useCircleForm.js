import { useForm } from "react-hook-form";
import { useState } from "react";

export function useCircleForm() {
    const { register, handleSubmit, reset } = useForm();
    const [errors, setErrors] = useState({});

    // Helper to reset all fields
    const resetAllFields = (...resetFns) => {
        reset();
        resetFns.forEach(fn => fn && fn());
        setErrors({});
    };

    return {
        register,
        handleSubmit,
        reset,
        errors,
        setErrors,
        resetAllFields,
    };
}
