import { Link, useLocation } from "wouter";
import { AuthForm } from "@/components/auth/AuthForm";

const Signup = () => {
  const [, setLocation] = useLocation();

  const onSuccess = () => {
    setLocation('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthForm 
          mode="signup" 
          title="Create your account"
          onSuccess={onSuccess}
          footer={
            <div className="text-sm text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login">
                  <a className="font-medium text-primary hover:text-blue-700">
                    Sign in
                  </a>
                </Link>
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Signup;
