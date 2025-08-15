import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { fetchCircles } from "../../../../features/circles/circlesSlice";
import interests from "../../../../constants/interests";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cloudinaryService from "../../../../services/cloudinaryService";

const CircleDetailsPresentational = lazy(() => import("./CircleDetailsPresentational"));
import { useCircleForm } from "../../../../hooks/useCircleForm";

export default function CircleDetailsContainer({ onClose }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const selectedCircle = useSelector((state) => state.circles.selectedCircle);

    // Refs for editable fields
    const nameRef = useRef();
    const descRef = useRef();
    const fileInputRef = useRef();

    const [circleType, setCircleType] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [circlePrivacy, setCirclePrivacy] = useState("");

    const { register } = useCircleForm();

    // For interests UI
    const [search, setSearch] = useState("");
    const [selectedInterests, setSelectedInterests] = useState(selectedCircle?.interests || []);
    const filteredInterests = interests.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const circleTypeOptions = [
        { value: "Permenent", label: t("Permenent") },
        { value: "Flash", label: t("Flash") },
    ];

    const circlePrivacyOptions = [
        { value: "Public", label: t("Public") },
        { value: "Private", label: t("Private") },
    ];

    // Image upload state
    const [uploadedImage, setUploadedImage] = useState(null);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }
        const preview = URL.createObjectURL(file);
        setUploadedImage({ file, preview });
    };

    // Remove image
    const removeImage = () => setUploadedImage(null);

    // Save handler
    const handleSave = async () => {
        setIsLoading(true);
        try {
            let imageUrl = selectedCircle.photoUrl || ""; // fallback to current image

            // Upload new image if present
            if (uploadedImage?.file) {
                const uploadResult = await cloudinaryService.uploadImage(
                    uploadedImage.file,
                    (progress) => {
                        // Optional: show progress
                        console.log("Circle cover upload progress:", progress + "%");
                    },
                    {
                        folder: "circles/covers",
                        tags: ["circle", "cover", "circle-edit"],
                    }
                );
                imageUrl = uploadResult.secure_url;
            }

            const db = getFirestore();
            const circleDoc = doc(db, "circles", selectedCircle.id);

            await updateDoc(circleDoc, {
                circleName: nameRef.current.value,
                description: descRef.current.value,
                circleType,
                circlePrivacy,
                interests: selectedInterests,
                imageUrl: imageUrl, // <-- Save the Cloudinary URL
                ...(circleType === "Flash" && expireDate ? { expireDate } : {}),
            });

            toast.success(t("Circle updated successfully!"));
            dispatch(fetchCircles());
            if (onClose) onClose();
        } catch (err) {
            toast.error(t("Failed to update circle."));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditing && selectedCircle) {
            setCircleType(selectedCircle.circleType || "");
            setCirclePrivacy(selectedCircle.circlePrivacy || "");
            setExpireDate(selectedCircle.expireDate || "");
            setSelectedInterests(selectedCircle.interests || []);
        }
    }, [isEditing, selectedCircle]);

    if (!selectedCircle) return null;

    return (
        <Suspense fallback={<div />}>
            <CircleDetailsPresentational
                t={t}
                selectedCircle={selectedCircle}
                onClose={onClose}
                nameRef={nameRef}
                descRef={descRef}
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                filteredInterests={filteredInterests}
                search={search}
                setSearch={setSearch}
                handleSave={handleSave}
                isLoading={isLoading}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                circleType={circleType}
                setCircleType={setCircleType}
                circleTypeOptions={circleTypeOptions}
                expireDate={expireDate}
                setExpireDate={setExpireDate}
                circlePrivacy={circlePrivacy}
                setCirclePrivacy={setCirclePrivacy}
                circlePrivacyOptions={circlePrivacyOptions}
                register={register}
                fileInputRef={fileInputRef}
                uploadedImage={uploadedImage}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
            />
        </Suspense>
    );
}
