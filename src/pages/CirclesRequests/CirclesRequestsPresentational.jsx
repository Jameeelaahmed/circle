import { Link } from "react-router-dom";
import { Check, X, Loader2 } from "lucide-react";

function CirclesRequestsPresentational({
    requests,
    loading,
    onAccept,
    onCancel,
    requestType,
    setRequestType
}) {
    return (
        <div className="pt-paddingTop w-full max-w-full mx-auto pr-2 pl-2 pb-2">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3 px-2">
                <h2 className="text-xl md:text-2xl font-bold text-primary">
                    Circle Requests
                </h2>
                <div className="flex gap-2 bg--main rounded-full p-1 shadow">
                    {["join-request", "invitation"].map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-1 rounded-full font-semibold transition-all border
                                ${requestType === type
                                    ? "bg-primary text-text shadow"
                                    : "bg-main text-primary border-primary hover:bg-primary/10"}
                            `}
                            onClick={() => setRequestType(type)}
                        >
                            {type === "join-request" ? "Join Requests" : "Invitations"}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
            ) : (
                <div className="bg-main/60 backdrop-blur-sm rounded-xl border border-primary overflow-x-auto w-full">
                    {requests.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div className="bg-main/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow">
                                <span className="text-2xl">📭</span>
                            </div>
                            <h3 className="text-lg font-medium text-primary">
                                {requestType === "join-request"
                                    ? "No join requests yet"
                                    : "No pending invitations"}
                            </h3>
                            <p className="mt-1 text-text max-w-md mx-auto">
                                {requestType === "join-request"
                                    ? "Users will appear here when they request to join your circles"
                                    : "You'll see invitations here when you're invited to circles"}
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-primary/30 w-full">
                            {requests.map((req) => (
                                <li
                                    key={req.id}
                                    className="hover:bg-primary/10 transition-colors duration-200"
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center p-4 w-full">
                                        <div className="flex-1 min-w-0 mr-4">
                                            <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
                                                <Link
                                                    to={`/profile/${requestType === "invitation"
                                                            ? req.inviterId
                                                            : req.requesterId
                                                        }`}
                                                    className="font-semibold text-primary hover:text-text hover:underline truncate max-w-[120px] sm:max-w-none"
                                                >
                                                    {requestType === "join-request"
                                                        ? req.requesterUsername
                                                        : req.inviterUsername}
                                                </Link>
                                                <span className="text-text text-sm hidden sm:inline">
                                                    {requestType === "join-request"
                                                        ? "requested to join"
                                                        : `${req.inviterUsername} invited you to`}
                                                </span>
                                                <Link
                                                    to={`/circles/${req.circleId}`}
                                                    className="font-semibold text-primary hover:text-text hover:underline truncate max-w-[120px] sm:max-w-none"
                                                >
                                                    {req.circleName}
                                                </Link>
                                            </div>
                                            {req.message && (
                                                <div className="mt-2 flex">
                                                    <div className="border-l-2 border-primary pl-2 text-text text-sm italic">
                                                        "{req.message}"
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 mt-2 md:mt-0">
                                            <button
                                                className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                                                onClick={() => onAccept(req.id)}
                                                aria-label="Accept request"
                                            >
                                                <Check size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                                onClick={() => onCancel(req.id)}
                                                aria-label="Decline request"
                                            >
                                                <X size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default CirclesRequestsPresentational;