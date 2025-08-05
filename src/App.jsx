import AuthProvider from "../AuthProvider";
import RoutesPages from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCircles } from "./features/circles/circlesSlice";
import { OnlinePresenceProvider } from "./contexts/OnlinePresenceContext";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.circles.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCircles());
    }
  }, [dispatch, status]);

  return (
    <>
      <AuthProvider />
      <OnlinePresenceProvider>
        <RoutesPages></RoutesPages>
      </OnlinePresenceProvider>
    </>
  );
}

export default App;
