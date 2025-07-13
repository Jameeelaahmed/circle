import { COLORS } from "../../../../constants"
function CreateCircleModal() {
    console.log(COLORS.primary);

    return (
        <form>
            <p className="text-center mb-5">Create Circle</p>
            <div className="flex justify-around">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Circle Name</label>
                    <input className={`bg-black border border-[${COLORS.primary}] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-primary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} type="text" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Members</label>
                    <input type="text" />
                </div>
            </div>
            <div className="flex justify-around">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Circle Type</label>
                    <input type="text" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Description</label>
                    <input type="text" />
                </div>
            </div>
            <div className="flex justify-around">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Pictures</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">Intersts</label>
                    <input type="text" />
                </div>
            </div>
        </form>
    )
}

export default CreateCircleModal
