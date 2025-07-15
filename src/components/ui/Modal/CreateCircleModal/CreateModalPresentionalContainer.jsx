//libs
import Select from 'react-select'

function CreateModalPresentional({ t, uploadedImages, inputStyles, textareaStyles, customStyles, circleType, setCircleType, fileInputRef, memberOptions, interestOptions, circleTypeOptions, handleImageUpload, removeImage }) {
    return (
        <form className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-white font-secondary">{t("Create Circle")}</h2>

            {/* Basic Information */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-light">
                            {t("Circle Name")} *
                        </label>
                        <input
                            type="text"
                            placeholder="enter circle name"
                            className={inputStyles}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-light">
                            {t("Circle Type")} *
                        </label>
                        <Select
                            options={circleTypeOptions}
                            styles={customStyles}
                            placeholder="select type..."
                            className="react-select-container"
                            classNamePrefix="react-select"
                            value={circleTypeOptions.find(option => option.value === circleType) || null}
                            onChange={(selectedOption) => setCircleType(selectedOption ? selectedOption.value : '')}
                            isClearable
                        />
                    </div>
                </div>

                {/* Due Date - Only show for private circles */}
                {circleType === 'private' && (
                    <div>
                        <label className="block mb-1 text-sm font-medium text-light">
                            {t("Due Date")} *
                        </label>
                        <input
                            type="date"
                            className={inputStyles}
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-1 text-sm font-medium text-light">
                        {t("Description")}
                    </label>
                    <textarea
                        placeholder="what's this circle about?"
                        className={textareaStyles}
                        rows={3}
                    />
                </div>
            </div>

            {/* Members */}
            <div>
                <label className="block mb-1 text-sm font-medium text-light">
                    {t("Members")}
                </label>
                <Select
                    isMulti
                    options={memberOptions}
                    styles={customStyles}
                    placeholder="select members..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
            </div>

            {/* Interests */}
            <div>
                <label className="block mb-1 text-sm font-medium text-light">
                    {t("Interests")}
                </label>
                <Select
                    isMulti
                    options={interestOptions}
                    styles={customStyles}
                    placeholder="select interests..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block mb-1 text-sm font-medium text-light">
                    {t("Circle Images")}
                </label>

                {/* Image Previews */}
                {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.preview}
                                    alt={`Preview ${index}`}
                                    className="w-full h-24 object-cover rounded-lg border-2 border-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Area */}
                <div
                    className={`${inputStyles} flex flex-col items-center justify-center cursor-pointer min-h-[100px] hover:bg-main-700 transition-colors`}
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        id="circle-images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                    <svg className="w-8 h-8 mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-primary text-center">
                        {uploadedImages.length > 0
                            ? 'Add more images'
                            : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG (Max 5MB each)</p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:bg-opacity-90 transition-colors"
                >
                    {t("Create Circle")}
                </button>
            </div>
        </form>
    )
}

export default CreateModalPresentional
