import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthForm from "@/features/auth/components/AuthForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthForm type="signup" />
    </AuthLayout>
  );
}