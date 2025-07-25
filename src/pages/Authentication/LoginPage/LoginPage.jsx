import LoginFormContainer from '../../../components/AuthForms/Login/LoginFormContainer'
import FloatingAvatarContainer from "../../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import IrregularCirclePaths from "../../../components/ui/IrregularCirclePathes/IrregularCirclePaths";

function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-black">
      <div className="relative w-1/2 overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatarContainer />
      </div>
      <div className="flex lg:w-1/2 items-center justify-center bg-black">
        <LoginFormContainer />
      </div>

    </div>
  );
}
export default LoginPage;
