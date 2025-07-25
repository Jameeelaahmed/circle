// libs
import { useState, useRef, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import CreateCircleModalPresentional from "./CreateCircleModalPresentional";
import customSelectStyles from "./customSelectStyles";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from "firebase/firestore";
// helpers
import { validateForm } from "../../../../utils/FormValidator";

export default function CreateCircleModalContainer({ closeModal }) {
  // states
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [circleType, setCircleType] = useState("");
  const [circlePrivacy, setCirclePrivacy] = useState("");
  const { user } = useAuth();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersKey, setMembersKey] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsKey, setInterestsKey] = useState(0);
  const [errors, setErrors] = useState({});
  const { register, handleSubmit, reset } = useForm();
  // refs
  const fileInputRef = useRef(null);

  const { t } = useTranslation();
  const [memberOptions, setMemberOptions] = useState([]);

  // Fetch users from Firestore, exclude current user
  useEffect(() => {
    async function fetchUsers() {
      try {
        const db = getFirestore();
        const usersCol = collection(db, "users");
        const snapshot = await import("firebase/firestore").then(({ getDocs }) => getDocs(usersCol));

        const options = [];
        snapshot.forEach(doc => {
          const data = doc.data();

          if (data.email !== user.email) {
            options.push({ value: data.email, label: data.email });
          }
        });
        setMemberOptions(options);

      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    if (user?.email) fetchUsers();
  }, [user]);

  const interestOptions = [
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art" },
    { value: "travel", label: "Travel" },
    { value: "cooking", label: "Cooking" },
    { value: "reading", label: "Reading" },
    { value: "gaming", label: "Gaming" },
    { value: "fitness", label: "Fitness" },
    { value: "photography", label: "Photography" },
  ];

  const circleTypeOptions = [
    { value: t("Permenent Circle"), label: "Permenent Circle" },
    { value: t("Flash Circle"), label: "Flash Circle" },
  ];
  const circlePrivacyOptions = [
    { value: t("Public Circle"), label: "Public Circle" },
    { value: t("Private Circle"), label: "Private Circle" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous preview if exists
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage[0].preview);
      }
      setUploadedImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImage];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setUploadedImage(newImages);
  };


  // errors are now set only on submit

  // useEffect(() => {
  //   return () => {
  //     uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
  //   };
  // }, [uploadedImages]);

  const inputStyles = `w-full rounded-md bg-inputsBg px-4 py-2 text-sm text-gray-100
  shadow-inner focus:outline-none focus:ring-3 focus:ring-[var(--color-secondary)]
  placeholder-gray-500 transition`;
  const textareaStyles = `${inputStyles} min-h-[100px] resize-y`;


  // Helper to reset all fields
  const resetAllFields = () => {
    reset();
    setUploadedImage(undefined);
    setSelectedMembers([]);
    setInterestsKey(prev => prev + 1);
    setMembersKey(prev => prev + 1);
    setSelectedInterests([]);
    setCircleType("");
    setCirclePrivacy("");
    setErrors({});
  };

  const handleCloseModal = () => {
    resetAllFields();
    closeModal();
  };

  const onFormSubmit = async (data) => {
    let imageUrl = "";
    // Always include current user in members
    const membersWithCurrent = [
      { value: user.email, label: user.email },
      ...selectedMembers.filter(m => m.value !== user.email)
    ];
    const formFields = {
      ...data,
      circleId: uuidv4(),
      createdAt: Timestamp.now(),
      admins: [{ userEmail: user.email, userName: user.displayName }],
      createdBy: { userEmail: user.email, userName: user.displayName },
      circlePrivacy: circlePrivacy,
      members: membersWithCurrent,
      interests: selectedInterests,
      imageUrl: "",
      circleType: circleType,
    };
    const validationErrors = validateForm(formFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    if (uploadedImage && uploadedImage.file) {
      const cloudName = "dqvp8eb1d";
      const unsignedPreset = "Circle";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const formData = new FormData();
      formData.append("file", uploadedImage.file);
      formData.append("upload_preset", unsignedPreset);
      try {
        const response = await fetch(url, {
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
      await addDoc(collection(db, "circles"), formFields);
      toast.success("Board created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "var(--color-main)",
          color: "var(--color-primary)",
          fontWeight: "bold"
        },
        icon: false,
      });
      reset();
      setUploadedImage(undefined);
      setSelectedMembers([]);
      setInterestsKey(prev => prev + 1);
      setMembersKey(prev => prev + 1);
      setSelectedInterests([]);
      setCircleType("");
      closeModal();
    } catch (error) {
      console.error("Error adding circle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CreateCircleModalPresentional
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
    </>
  );
}