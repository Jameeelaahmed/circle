import AuthProvider from "./providers/AuthProvider";
import RoutesPages from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCircles } from "./features/circles/circlesSlice";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.circles.status);
  console.log(status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCircles());
    }
  }, [dispatch, status]);
  return (
    <>

      <AuthProvider />
      <RoutesPages></RoutesPages>
    </>
  );
}

export default App;
