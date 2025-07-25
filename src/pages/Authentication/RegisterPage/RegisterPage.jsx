import IrregularCirclePaths from "../../../components/ui/IrregularCirclePathes/IrregularCirclePaths";
import FloatingAvatarContainer from "../../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import RegisterFormContainer from "../../../components/AuthForms/Register/RegisterFormContainer";

function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-x-hidden bg-black">
      {/* Left Half - Background Paths and Avatars */}
      <div className="relative w-1/2 overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatarContainer />
      </div>

      {/* Right Half - Clean Registration Form */}
      <div className="flex w-full lg:w-1/2  items-center justify-center bg-black">
        <RegisterFormContainer />
      </div>
    </div>
  );
}
export default RegisterPage;
