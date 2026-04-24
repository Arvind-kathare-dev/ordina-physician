import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
}