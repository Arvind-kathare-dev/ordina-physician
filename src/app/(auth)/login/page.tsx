import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Ordina Physician",
  description: "Login | Ordina Physician",
};


export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
}