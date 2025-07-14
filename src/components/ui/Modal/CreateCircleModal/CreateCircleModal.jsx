// libs
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from "react-i18next"
import CreateModalPresentional from './CreateModalPresentionalContainer'

function CreateCircleModal() {
    const [uploadedImages, setUploadedImages] = useState([])
    const [circleType, setCircleType] = useState('')
    const fileInputRef = useRef(null)
    const { t } = useTranslation();
    const memberOptions = [
        { value: 'user1', label: 'John Doe' },
        { value: 'user2', label: 'Jane Smith' },
        { value: 'user3', label: 'Mike Johnson' },
        { value: 'user4', label: 'Sarah Wilson' },
        { value: 'user5', label: 'David Brown' },
    ];

    const interestOptions = [
        { value: 'technology', label: 'Technology' },
        { value: 'sports', label: 'Sports' },
        { value: 'music', label: 'Music' },
        { value: 'art', label: 'Art' },
        { value: 'travel', label: 'Travel' },
        { value: 'cooking', label: 'Cooking' },
        { value: 'reading', label: 'Reading' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'fitness', label: 'Fitness' },
        { value: 'photography', label: 'Photography' },
    ];

    const circleTypeOptions = [
        { value: t('public'), label: 'public' },
        { value: t('private'), label: 'private' },
    ];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const imagePreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setUploadedImages([...uploadedImages, ...imagePreviews])
    }

    const removeImage = (index) => {
        const newImages = [...uploadedImages]
        URL.revokeObjectURL(newImages[index].preview)
        newImages.splice(index, 1)
        setUploadedImages(newImages)
    }

    useEffect(() => {
        return () => {
            uploadedImages.forEach(image => URL.revokeObjectURL(image.preview))
        }
    }, [uploadedImages])

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'black',
            border: `${state.isFocused ? '3px' : '1px'} solid var(--primary)`,
            borderRadius: '1rem',
            minHeight: '42px',
            boxShadow: 'none',
            transition: 'border-width 0.2s ease-in-out',
            '&:hover': {
                borderColor: 'var(--primary)',
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px',
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
            margin: '0',
            padding: '0',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--primary)',
            fontSize: '12px',
            margin: '0',
            textTransform: 'lowercase',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'var(--primary)',
            borderRadius: '6px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',
            padding: '2px 6px',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white',
            ':hover': {
                backgroundColor: 'rgba(0,0,0,0.2)',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'black',
            border: `3px solid var(--primary)`,
            borderRadius: '1rem',
            marginTop: '4px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'var(--primary)'
                : state.isFocused
                    ? 'rgba(255, 107, 139, 0.2)'
                    : 'transparent',
            color: 'white',
            ':active': {
                backgroundColor: 'var(--primary)',
            },
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '6px',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--primary)',
            ':hover': {
                color: 'var(--primary)',
            },
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: 'var(--primary)',
            ':hover': {
                color: 'white',
            },
        }),
    };

    const inputStyles = `bg-black border border-primary focus:border-[3px] focus:p-[6px] w-full p-2 rounded-2xl text-white placeholder-primary focus:outline-none focus:ring-0 transition-all duration-200 placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-[400ms] placeholder:ease-in-out focus:placeholder:opacity-0 placeholder:text-xs placeholder:lowercase`;
    const textareaStyles = `${inputStyles} min-h-[100px] resize-y`;

    return (
        <CreateModalPresentional
            inputStyles={inputStyles}
            textareaStyles={textareaStyles}
            customStyles={customStyles}
            circleType={circleType}
            setCircleType={setCircleType}
            fileInputRef={fileInputRef}
            memberOptions={memberOptions}
            interestOptions={interestOptions}
            circleTypeOptions={circleTypeOptions}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            t={t}
            uploadedImages={uploadedImages} />
    )
}

export default CreateCircleModal