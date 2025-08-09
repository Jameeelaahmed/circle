import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../features/user/userSlice";

export default function VoteComponent({ circleId, pollId }) {
  const userInfo = useSelector(getUserInfo);
  const userId = userInfo?.uid;
  const userAvatar = userInfo?.photoURL || "/default-avatar.png";

  const [poll, setPoll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPoll = async () => {
    try {
      if (!circleId || !pollId || !userId) return;

      const pollRef = doc(db, "circles", circleId, "polls", pollId);
      const pSnap = await getDoc(pollRef);
      if (!pSnap.exists()) return setPoll(null);

      const data = pSnap.data();
      setPoll({ id: pSnap.id, ...data });

      const voteRef = doc(db, "circles", circleId, "polls", pollId, "votes", userId);
      const vSnap = await getDoc(voteRef);
      if (vSnap.exists()) {
        const saved = vSnap.data().selectedOptions || [];
        setSelectedOptions(saved);
      }
    } catch (err) {
      console.error("Error fetching poll:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPoll();
  }, [circleId, pollId, userId]);

  const handleChange = async (index) => {
    if (!poll || userId === undefined) return;

    let newSelection;
    if (poll.allowMultiple) {
      newSelection = selectedOptions.includes(index)
        ? selectedOptions.filter((i) => i !== index)
        : [...selectedOptions, index];
    } else {
      newSelection = [index];
    }

    setSelectedOptions(newSelection);

    try {
      const pollRef = doc(db, "circles", circleId, "polls", pollId);
      const voteRef = doc(db, "circles", circleId, "polls", pollId, "votes", userId);

      const pSnap = await getDoc(pollRef);
      const prevVoteSnap = await getDoc(voteRef);
      const prevSelection = prevVoteSnap.exists() ? prevVoteSnap.data().selectedOptions : [];

      const updatedOptions = [...(pSnap.data().options || [])];

      prevSelection.forEach((i) => {
        if (updatedOptions[i]) {
          updatedOptions[i].votes = Math.max((updatedOptions[i].votes || 1) - 1, 0);
          updatedOptions[i].votedUserAvatars =
            (updatedOptions[i].votedUserAvatars || []).filter((a) => a !== userAvatar);
        }
      });

      newSelection.forEach((i) => {
        if (updatedOptions[i]) {
          updatedOptions[i].votes = (updatedOptions[i].votes || 0) + 1;
          const currentAvatars = updatedOptions[i].votedUserAvatars || [];
          if (userAvatar && !currentAvatars.includes(userAvatar)) {
            updatedOptions[i].votedUserAvatars = [...currentAvatars, userAvatar];
          }
        }
      });

      const batch = writeBatch(db);
      batch.update(pollRef, { options: updatedOptions });
      batch.set(
        voteRef,
        {
          userId,
          selectedOptions: newSelection,
          userAvatar,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await batch.commit();
      setPoll((prev) => ({ ...prev, options: updatedOptions }));
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading poll…</p>;
  if (!poll) return <p className="text-white text-center mt-10">Poll not found.</p>;

  const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);

  return (
  <div
  className="w-full  mx-auto backdrop-blur-md text-white rounded-[var(--rounded-largeRounded)] p-6 shadow-[var(--shadow-glassCard)] animate-fade-slide-in  border border-white/10"
>
  <h2 className="text-2xl font-bold mb-8 tracking-tight text-white/90">{poll.question}</h2>

  <div className="space-y-5">
    {poll.options.map((o, idx) => {
      const isSelected = selectedOptions.includes(idx);
      const pct = totalVotes ? ((o.votes || 0) / totalVotes) * 100 : 0;

      return (
        <div
          key={idx}
          onClick={() => handleChange(idx)}
          className={`transition-all duration-300 p-4 rounded-xl border cursor-pointer group ${
            isSelected
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[var(--shadow-btnPrimary)]"
              : "border-white/10 hover:border-[var(--color-secondary)] hover:bg-white/5"
          }`}
        >
          {/* Avatars and vote count */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex -space-x-2">
              {(o.votedUserAvatars || [])
                .filter(Boolean)
                .slice(0, 5)
                .map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt="voter"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                ))}
            </div>
            <span className="text-xs text-white/60">{o.votes || 0} votes</span>
          </div>

          {/* Option + circle + percent */}
          <div className="flex items-center">
            <div
              className={`h-6 w-6 mr-4 rounded-full border-2 flex items-center justify-center ${
                isSelected
                  ? "border-[var(--color-accent)]"
                  : "border-white/30 group-hover:border-white/60"
              }`}
            >
              {isSelected && (
                <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full" />
              )}
            </div>
            <span className="text-base flex-1 text-white/90">{o.text}</span>
            <span className="text-sm font-medium ml-2 text-[var(--color-secondary)]">
              {Math.round(pct)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full mt-2 h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-[var(--color-secondary)] transition-all duration-500 ease-in-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    })}
  </div>

  {/* Footer: time + view votes */}
  <div className="flex justify-between text-xs text-white/50 mt-6 px-1">
    <span>
      {poll.createdAt?.toDate
        ? new Date(poll.createdAt.toDate()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Time unknown"}
    </span>
    <button className="text-[var(--color-accent)] font-semibold hover:underline transition-all">
      View votes
    </button>
  </div>
</div>

  );
}
