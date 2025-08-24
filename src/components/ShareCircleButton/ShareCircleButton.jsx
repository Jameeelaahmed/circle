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
            className="px-4 py-3 hover:bg-primary/30 text-left transition-colors border-b border-text/10 flex items-center gap-2"
            onClick={handleShare}
            title="Share Circle"
        >
            <Share2 size={18} />
            {copied ? "Link Copied!" : "Share"}
        </button>
    );
}