import LoginFormContainer from "../../../components/AuthForms/Login/LoginFormContainer";
import FloatingAvatarContainer from "../../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import IrregularCirclePaths from "../../../components/ui/IrregularCirclePathes/IrregularCirclePaths";

function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden lg:flex-row">
      <div className="relative w-1/2 overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatarContainer />
      </div>
      <div className="flex items-center justify-center lg:w-1/2">
        <LoginFormContainer />
      </div>
    </div>
  );
}
export default LoginPage;
