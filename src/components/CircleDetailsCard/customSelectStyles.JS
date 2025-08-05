export default customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "var(--color-main)",
        border: `${state.isFocused ? "3px" : "1px"} solid var(--color-primary)`,
        borderRadius: "1rem",
        minHeight: "42px",
        boxShadow: "none",
        transition: "border-width 0.2s ease-in-out",
        "&:hover": {
            borderColor: "var(--color-primary)",
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: "0 8px",
    }),
    input: (provided) => ({
        ...provided,
        color: "white",
        margin: "0",
        padding: "0",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "var(--color-primary)",
        fontSize: "12px",
        margin: "0",
        textTransform: "lowercase",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "var(--color-primary)",
        borderRadius: "6px",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "white",
        padding: "2px 6px",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: "white",
        ":hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "var(--color-main)",
        border: `3px solid var(--color-primary)`,
        borderRadius: "1rem",
        marginTop: "4px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "var(--color-primary)"
            : state.isFocused
                ? "rgba(255, 107, 139, 0.2)"
                : "transparent",
        color: "white",
        ":active": {
            backgroundColor: "var(--color-primary)",
        },
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        paddingRight: "6px",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "var(--color-primary)",
        ":hover": {
            color: "var(--color-primary)",
        },
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: "var(--color-primary)",
        ":hover": {
            color: "white",
        },
    }),
};