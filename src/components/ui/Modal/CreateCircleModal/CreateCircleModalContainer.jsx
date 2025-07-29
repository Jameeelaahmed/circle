// libs
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCircles } from '../../../../features/circles/circlesSlice';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

// functions
import customSelectStyles from "./customSelectStyles";
import { toastStyles } from "../../../../utils/toastStyles";
import { addMembersToCircle } from "../../../../utils/addMembersToCircle";

// hooks
import { validateForm } from "../../../../utils/FormValidator";
import { useCircleForm } from "../../../../hooks/useCircleForm";
import { useAuth } from "../../../../hooks/useAuth";
import { useImageUpload } from "../../../../hooks/useImageUpload";
// components
import CreateCircleModalPresentational from "./CreateCircleModalPresentional";

import interests from '../../../../constants/interests';

export default function CreateCircleModalContainer({ closeModal }) {
  const dispatch = useDispatch();
  const { uploadedImage, setUploadedImage, handleImageUpload, removeImage } = useImageUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [circleType, setCircleType] = useState("");
  const [circlePrivacy, setCirclePrivacy] = useState("");
  const { user } = useAuth();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersKey, setMembersKey] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsKey, setInterestsKey] = useState(0);
  const {
    register,
    handleSubmit,
    errors,
    setErrors,
    resetAllFields,
  } = useCircleForm();
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const [memberOptions, setMemberOptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const db = getFirestore();
        const usersCol = collection(db, "users");
        const snapshot = await import("firebase/firestore").then(({ getDocs }) => getDocs(usersCol));
        const options = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          const uid = docSnap.id;
          // Exclude current user from options
          if (uid !== (user.userId || user.uid)) {
            options.push({ value: uid, label: data.username });
          }
        });
        setMemberOptions(options);
        // Only set current user as selected if not already set
        setSelectedMembers(prev => {
          // If already set, don't duplicate
          if (prev.length && prev[0]?.value === (user.userId || user.uid)) return prev;
          return [{
            value: user.userId || user.uid || "current-user",
            label: user.username,
            isFixed: true,
          }];
        });
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    if (user?.username && (user.userId || user.uid)) fetchUsers();
  }, [user]);

  const interestOptions = interests;

  const circleTypeOptions = [
    { value: t("Permenent"), label: "Permenent" },
    { value: t("Flash"), label: "Flash" },
  ];

  const circlePrivacyOptions = [
    { value: t("Public"), label: "Public" },
    { value: t("Private"), label: "Private" },
  ];

  const inputStyles = `w-full rounded-md bg-inputsBg px-4 py-2 text-sm text-gray-100
    shadow-inner focus:outline-none focus:ring-3 focus:ring-[var(--color-secondary)]
    placeholder-gray-500 transition`;
  const textareaStyles = `${inputStyles} min-h-[100px] resize-y`;

  const resetAllFieldsContainer = () => {
    resetAllFields(
      () => setUploadedImage(undefined),
      () => setSelectedMembers([{
        value: user.userId || user.uid || "current-user",
        label: user.username,
        isFixed: true,
      }]),
      () => setInterestsKey(prev => prev + 1),
      () => setMembersKey(prev => prev + 1),
      () => setSelectedInterests([]),
      () => setCircleType(""),
      () => setCirclePrivacy("")
    );
  };

  const handleCloseModal = () => {
    resetAllFieldsContainer();
    closeModal();
  };

  const onFormSubmit = async (data) => {
    let imageUrl = "";

    const formFields = {
      ...data,
      createdAt: Timestamp.now(),
      createdBy: { userEmail: user.email, userName: user.username, uid: user.uid },
      circlePrivacy,
      interests: selectedInterests, // now array of strings
      imageUrl: "",
      circleType,
    };

    const validationErrors = validateForm(formFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    if (uploadedImage?.file) {
      try {
        const formData = new FormData();
        formData.append("file", uploadedImage.file);
        formData.append("upload_preset", "Circle");
        const response = await fetch("https://api.cloudinary.com/v1_1/dqvp8eb1d/upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        imageUrl = result.secure_url;
        formFields.imageUrl = imageUrl;
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }

    try {
      const db = getFirestore();
      const circlesColRef = collection(db, "circles");

      const docRef = await addDoc(circlesColRef, formFields);
      const circleId = docRef.id;

      // Add members using the utility function
      await addMembersToCircle(circleId, user.uid || user.username, user, selectedMembers, user);

      toast.success("Circle created successfully!", toastStyles);
      dispatch(fetchCircles());
      resetAllFieldsContainer();
      closeModal();
    } catch (error) {
      console.error("Error adding circle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInterests = interestOptions.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CreateCircleModalPresentational
      t={t}
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      circlePrivacyOptions={circlePrivacyOptions}
      setCirclePrivacy={setCirclePrivacy}
      circleType={circleType}
      setCircleType={setCircleType}
      selectedMembers={selectedMembers}
      setSelectedMembers={setSelectedMembers}
      selectedInterests={selectedInterests}
      setSelectedInterests={setSelectedInterests}
      fileInputRef={fileInputRef}
      filteredInterests={filteredInterests}
      search={search}
      setSearch={setSearch}
      uploadedImage={uploadedImage}
      handleImageUpload={handleImageUpload}
      removeImage={removeImage}
      memberOptions={memberOptions}
      interestOptions={interestOptions}
      circleTypeOptions={circleTypeOptions}
      inputStyles={inputStyles}
      textareaStyles={textareaStyles}
      customStyles={customSelectStyles}
      errors={errors}
      isLoading={isLoading}
      onClose={handleCloseModal}
      membersKey={membersKey}
      interestsKey={interestsKey}
    />
  );
}
