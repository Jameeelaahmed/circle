//libs
import Select from "react-select";

export default function CreateCircleModalPresentional({
  t,
  uploadedImages,
  inputStyles,
  textareaStyles,
  customStyles,
  circleType,
  setCircleType,
  fileInputRef,
  memberOptions,
  interestOptions,
  circleTypeOptions,
  handleImageUpload,
  removeImage,
}) {
  return (
    <form className="mx-auto max-w-3xl space-y-6">
      <h2 className="font-secondary text-center text-2xl font-bold text-primary">
        {t("Create Circle")}
      </h2>

      {/* Basic Information */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-light mb-1 block text-sm font-medium">
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
            <label className="text-light mb-1 block text-sm font-medium">
              {t("Circle Type")} *
            </label>
            <Select
              options={circleTypeOptions}
              styles={customStyles}
              placeholder="select type..."
              className="react-select-container"
              classNamePrefix="react-select"
              value={
                circleTypeOptions.find(
                  (option) => option.value === circleType,
                ) || null
              }
              onChange={(selectedOption) =>
                setCircleType(selectedOption ? selectedOption.value : "")
              }
              isClearable
            />
          </div>
        </div>

        {/* Due Date - Only show for private circles */}
        {circleType === "private" && (
          <div>
            <label className="text-light mb-1 block text-sm font-medium">
              {t("Due Date")} *
            </label>
            <input type="date" className={inputStyles} required />
          </div>
        )}

        <div>
          <label className="text-light mb-1 block text-sm font-medium">
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
        <label className="text-light mb-1 block text-sm font-medium">
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
        <label className="text-light mb-1 block text-sm font-medium">
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
        <label className="text-light mb-1 block text-sm font-medium">
          {t("Circle Images")}
        </label>

        {/* Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <div key={index} className="group relative">
                <img
                  src={image.preview}
                  alt={`Preview ${index}`}
                  className="border-primary h-24 w-full rounded-lg border-2 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`${inputStyles} hover:bg-main-700 flex min-h-[100px] cursor-pointer flex-col items-center justify-center transition-colors`}
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
          <svg
            className="text-primary mb-2 h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="text-primary text-center text-sm">
            {uploadedImages.length > 0
              ? "Add more images"
              : "Click to upload or drag and drop"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Supports JPG, PNG (Max 5MB each)
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="bg-primary hover:bg-opacity-90 w-full rounded-2xl py-3 font-bold text-white transition-colors"
        >
          {t("Create Circle")}
        </button>
      </div>
    </form>
  );
}
