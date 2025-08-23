export default customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "var(--color-main)",
        border: `${state.isFocused ? "3px" : "1px"} solid var(--color-primary)`,
        borderRadius: "1rem",
        minHeight: "42px",
        width: "100%",
        maxWidth: "400px", // Fixed maximum width
        boxShadow: "none",
        transition: "border-width 0.2s ease-in-out",
        "&:hover": {
            borderColor: "var(--color-primary)",
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: "0 8px",
        maxWidth: "calc(100% - 60px)", // Leave space for indicators
        overflow: "hidden",
        flexWrap: "wrap", // Allow wrapping but with controlled height
        maxHeight: "60px", // Limit height to prevent excessive growth
        overflowY: "auto", // Add scroll if needed
    }),
    input: (provided) => ({
        ...provided,
        color: "var(--color-text)",
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
        color: "var(--color-text)",
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "var(--color-primary)",
        borderRadius: "6px",
        margin: "1px", // Reduced margin for compactness
        maxWidth: "120px", // Fixed max width for each tag
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "var(--color-text)",
        padding: "2px 6px",
        fontSize: "11px", // Smaller font size
        overflow: "hidden",
        textOverflow: "ellipsis",
        var(--color- text) Space: "nowrap",
            maxWidth: "90px", // Leave space for remove button
    }),
multiValueRemove: (provided) => ({
    ...provided,
    color: "var(--color-text)",
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
        width: "100%",
        maxWidth: "400px", // Match control width
    }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "var(--color-primary)"
                : state.isFocused
                    ? "rgba(255, 107, 139, 0.2)"
                    : "transparent",
            color: "var(--color-text)",
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
                            color: "var(--color-text)",
                        },
                    }),
};