import React, { useEffect, useRef } from "react";
import AuthProvider from "../AuthProvider";
import RoutesPages from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchCircles } from "./features/circles/circlesSlice";
import { fetchUserProfile } from "./features/userProfile/profileSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, checkIfBlocked } from "./firebase-config";
import BlockedModal from "./components/ui/Modal/BlockModal/BlockedModal";
import { OnlinePresenceProvider } from "./contexts/OnlinePresenceContext";
import { useAuth } from "./hooks/useAuth";
import { PendingRequestsProvider } from "./contexts/PendingRequests";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.circles.status);
  const blockedModalRef = useRef();
  const [isUserBlocked, setIsUserBlocked] = React.useState(false);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchUserProfile(user?.uid));
  }, [dispatch, user?.uid]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCircles());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const blocked = await checkIfBlocked(user);
        if (blocked) {
          setIsUserBlocked(true);
          blockedModalRef.current?.open();
        } else {
          setIsUserBlocked(false);
        }
      } else {
        setIsUserBlocked(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleBlockedConfirm = async () => {
    await auth.signOut();
  };

  return (
    <>

      <AuthProvider />
      <PendingRequestsProvider>
        <OnlinePresenceProvider>
          {!isUserBlocked && <RoutesPages />}
          <BlockedModal
            ref={blockedModalRef}
            onConfirm={handleBlockedConfirm}
          />
        </OnlinePresenceProvider>
      </PendingRequestsProvider>

    </>
  );
}

export default App;
