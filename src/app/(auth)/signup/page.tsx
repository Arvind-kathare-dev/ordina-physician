import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Ordina Physician",
  description: "Signup | Ordina Physician",
};


export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthForm type="signup" />
    </AuthLayout>
  );
}