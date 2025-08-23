import { getFirestore, collection, doc, query, where, getDocs, writeBatch } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export function useDeleteCircle({ t, dispatch, fetchCircles }) {
    const navigate = useNavigate();
    const deleteCircle = async ({ selectedCircleToDelete, isOwner, closeCircleDeleteModal, setIsDeleting }) => {
        if (!isOwner || !selectedCircleToDelete) return;
        setIsDeleting(true);

        try {
            const db = getFirestore();
            const batch = writeBatch(db);

            // Remove the circle from all users' joinedCircles
            const usersSnapshot = await getDocs(collection(db, "users"));
            usersSnapshot.forEach(userDoc => {
                const userData = userDoc.data();
                if (
                    Array.isArray(userData.joinedCircles) &&
                    userData.joinedCircles.includes(selectedCircleToDelete.id)
                ) {
                    const updatedCircles = userData.joinedCircles.filter(
                        id => id !== selectedCircleToDelete.id
                    );
                    batch.update(userDoc.ref, { joinedCircles: updatedCircles });
                }
            });

            // Delete related join requests and invitations
            const requestsQuery = query(
                collection(db, "circleRequests"),
                where("circleId", "==", selectedCircleToDelete.id)
            );
            const requestsSnapshot = await getDocs(requestsQuery);
            requestsSnapshot.forEach(requestDoc => {
                batch.delete(requestDoc.ref);
            });

            // Delete the circle document itself
            batch.delete(doc(db, "circles", selectedCircleToDelete.id));

            await batch.commit();

            toast.success(t("Circle deleted successfully!"));
            dispatch(fetchCircles());
            navigate('/circles')
            closeCircleDeleteModal();
        } catch (error) {
            toast.error("Failed to delete circle.");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteCircle };
}