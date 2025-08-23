import { Globe2, Lock, ListFilter } from 'lucide-react';
function CirclesPrivacyFilter({ circlePrivacy, setCirclePrivacy }) {
    return (
        <div className="flex gap-2 mb-4 justify-center">
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'all' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('all')}
            >
                <ListFilter size={18} />
                All
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'public' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('public')}
            >
                <Globe2 size={18} />
                Public
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'private' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('private')}
            >
                <Lock size={18} />
                Private
            </button>
        </div>
    );
}
export default CirclesPrivacyFilter;
