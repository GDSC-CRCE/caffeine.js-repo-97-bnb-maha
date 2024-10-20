import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn forceRedirectUrl="/home" />
    </div>
  );
};

export default SignInPage;
