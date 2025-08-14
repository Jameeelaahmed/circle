import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalHeading from "../ui/Modal/ModalHeading/ModalHeading";
import Input from "../ui/Input/Input";
import SendBtn from "../ui/ReactBits/SendBtn/SendBtn";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useParams } from "react-router";

export default function EventForm({ event, onClose }) {
  const { t } = useTranslation();
  let { circleId } = useParams();
  // Local state for editable fields
  const [activity, setActivity] = useState(event.activity || "");
  const [place, setPlace] = useState(event.place || "");
  const [day, setDay] = useState(event.day || "");
  const [location, setLocation] = useState(event.Location || "");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!activity.trim() || !place.trim() || !day) {
      alert(t("Please fill all required fields."));
      return;
    }

    try {
      const eventRef = doc(db, "circles", circleId, "events", event.id);
      await updateDoc(eventRef, {
        activity: activity.trim(),
        place: place.trim(),
        day,
        Location: location.trim(),
        status: "confirmed",
        updatedAt: serverTimestamp(),
      });
      onClose();
    } catch (err) {
      console.error("Error updating event:", err);
      alert(t("Failed to update the event."));
    }
  };

  return (
    <div className="relative w-full rounded-4xl backdrop-blur-lg">
      {/* Header */}
      <ModalHeading onClose={onClose} title={t("Event Confirmation")} />

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Activity */}
        <div>
          <label className="text-light mb-2 block text-lg font-medium">
            {t("Activity *")}
          </label>
          <Input
            label={t("what we're gonna do?")}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </div>

        {/* Place */}
        <div>
          <label className="text-light mb-2 block text-lg font-medium">
            {t("Place *")}
          </label>
          <Input
            label={t("where we're gonna go?")}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-light mb-2 block text-lg font-medium">
            {t("Location")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t("Enter place or address")}
              value={location} // stores the Google Maps link
              onChange={(e) => setLocation(e.target.value)}
              className="bg-inputsBg focus:ring-primary w-full rounded-xl border border-white/20 px-4 py-2 text-white focus:ring-2 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!place.trim()) {
                  alert(t("Please enter a place first."));
                  return;
                }
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
                setLocation(mapsUrl); // Save link in state
                window.open(mapsUrl, "_blank"); // Open Google Maps to preview
              }}
              className="bg-primary hover:bg-primary/80 rounded-xl px-4 py-2 text-white"
            >
              {t("Open in Maps")}
            </button>
          </div>
        </div>

        {/* Event Day */}
        <div>
          <label className="text-light mb-2 block text-lg font-medium">
            {t("Event Day *")}
          </label>
          <input
            type="date"
            className="bg-inputsBg focus:ring-primary w-full rounded-xl border border-white/20 px-4 py-2 text-white focus:ring-2 focus:outline-none"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <SendBtn type="submit" />
        </div>
      </form>
    </div>
  );
}
