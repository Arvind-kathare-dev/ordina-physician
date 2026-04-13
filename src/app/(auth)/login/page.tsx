import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthForm from "@/features/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
}