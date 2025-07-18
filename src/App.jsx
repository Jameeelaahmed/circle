import "./App.css";
import AuthProvider from "./providers/AuthProvider";
import RoutesPages from "./routes/routes";

function App() {
  return (
    <>
      <AuthProvider />
      <RoutesPages></RoutesPages>
    </>
  );
}

export default App;
