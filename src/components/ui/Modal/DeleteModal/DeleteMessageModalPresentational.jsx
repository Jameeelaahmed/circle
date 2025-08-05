import ModalHeading from "../ModalHeading/ModalHeading"

function DeleteMessageModalPresentational({
    close,
    deleteOption,
    setDeleteOption,
    handleDelete,
    showRadioOptions
}) {
    return (
        <>
            <ModalHeading title="Delete Message?" onClose={close} />

            <div className="p-4">
                {showRadioOptions ? (
                    <>
                        <p className="text-white mb-6">
                            You can delete messages for everyone or just for yourself.
                        </p>

                        {/* Delete for me option */}
                        <div className="mb-4">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        value="forMe"
                                        checked={deleteOption === 'forMe'}
                                        onChange={(e) => setDeleteOption(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 transition-all
                                        ${deleteOption === 'forMe'
                                            ? 'border-primary bg-primary'
                                            : 'border-gray-400 group-hover:border-primary'
                                        }`}>
                                        {deleteOption === 'forMe' && (
                                            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-white ml-3">Delete for me</p>
                            </label>
                        </div>

                        {/* Delete for everyone option */}
                        <div className="mb-6">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        value="forEveryone"
                                        checked={deleteOption === 'forEveryone'}
                                        onChange={(e) => setDeleteOption(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 transition-all
                                        ${deleteOption === 'forEveryone'
                                            ? 'border-primary bg-primary'
                                            : 'border-gray-400 group-hover:border-primary'
                                        }`}>
                                        {deleteOption === 'forEveryone' && (
                                            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-white ml-3">Delete for everyone</p>
                            </label>
                        </div>
                    </>
                ) : (
                    <p className="text-white mb-6">
                        Are you sure you want to delete this message? This action cannot be undone.
                    </p>
                )}

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteMessageModalPresentational
