const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--color-inputsBg)',
        borderRadius: '0.375rem',
        borderColor: state.isFocused ? 'var(--color-secondary)' : 'var(--color-inputsBg)',
        boxShadow: state.isFocused ? '0 0 0 2px var(--color-secondary)' : 'none',
        color: '#f3f4f6',
        minHeight: '40px',
        fontSize: '0.875rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
        '&:hover': {
            borderColor: 'var(--color-secondary)',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--color-main)',
        borderRadius: '0.375rem',
        color: '#f3f4f6',
        fontSize: '0.875rem',
        border: '2px solid var(--color-secondary)',
        zIndex: 20,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'var(--color-secondary)'
            : state.isFocused
                ? '#2d3748'
                : 'var(--color-inputsBg)',
        color: '#f3f4f6',
        fontSize: '0.875rem',
        cursor: 'pointer',
        padding: '10px 16px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#f3f4f6',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'var(--color-secondary)',
        color: '#fff',
        borderRadius: '0.375rem',
        padding: '2px 6px',
        fontSize: '0.875rem',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
        fontSize: '0.875rem',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#fff',
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: '#e53e3e',
            color: '#fff',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#a0aec0',
        fontSize: '0.875rem',
    }),
};

export default customSelectStyles;
