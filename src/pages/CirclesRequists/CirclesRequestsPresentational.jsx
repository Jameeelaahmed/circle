import { Link } from "react-router-dom";
import { Check, X } from "lucide-react"; // Lucide icons for accept/cancel

function CirclesRequistsPresentational({ requests, loading, onAccept, onCancel }) {
    if (loading) return <div>Loading...</div>;
    if (!requests.length) return <div>No join requests.</div>;

    return (
        <div className="pt-paddingTop">
            <h2 className="text-lg font-bold mb-4 text-white">Circle Join Requests</h2>
            <ul className="divide-y divide-gray-800 rounded-lg overflow-hidden bg-[#161b22] shadow">
                {requests.map(req => (
                    <li
                        key={req.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[#21262d] transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                            <Link
                                to={`/profile/${req.userId}`}
                                className="font-semibold text-blue-400 hover:underline"
                            >
                                {console.log(req.userId)}
                                {console.log(req.adminId)}

                                {req.username} {/* You may want to fetch/display the actual name */}
                            </Link>
                            <span className="text-gray-400 mx-2 hidden sm:inline">requested to join</span>
                            <Link
                                to={`/circles/${req.circleId}`}
                                className="font-semibold text-purple-400 hover:underline"
                            >
                                {req.circleName} {/* You may want to fetch/display the actual name */}
                            </Link>
                            <span className="text-gray-300 ml-2">{req.message}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <button
                                className="p-2 rounded hover:bg-green-600 text-green-400"
                                title="Accept"
                                onClick={() => onAccept(req.id)}
                            >
                                <Check size={18} />
                            </button>
                            <button
                                className="p-2 rounded hover:bg-red-600 text-red-400"
                                title="Cancel"
                                onClick={() => onCancel(req.id)}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CirclesRequistsPresentational;
