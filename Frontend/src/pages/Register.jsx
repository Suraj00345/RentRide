import UserRegister from "../components/Auth/UserRegister.jsx";
import AuthContent from "../components/Auth/AuthContent.jsx";

const Register = () => {
  return (
    <div className="flex flex-1 min-h-screen font-sans">
      <AuthContent />
      <UserRegister />
    </div>
  );
};

export default Register;
