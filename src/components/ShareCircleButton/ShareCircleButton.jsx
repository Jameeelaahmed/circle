import { getCircleShareLink } from "../../utils/getCircleShareLink";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareCircleButton({ circleId }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const link = getCircleShareLink(circleId);
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.prompt("Copy this link:", link);
        }
    };

    return (
        <button
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary transition"
            onClick={handleShare}
            title="Share Circle"
        >
            <Share2 size={18} />
            {copied ? "Link Copied!" : "Share"}
        </button>
    );
}