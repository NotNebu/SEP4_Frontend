import { useState } from "react";
import { changePassword } from "@/Application/Services/AccountService";

// Hook til håndtering af logik for ændring af kodeord
// Indeholder formularstate, fejl/succesbeskeder og loading-status
export const useChangePasswordViewModel = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Håndterer ændringer i inputfelterne
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Håndterer gem/submit af kodeordsændring
  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Kodeordene matcher ikke!");
      return;
    }

    setLoading(true);

    try {
      const message = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setSuccess(message);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Uventet fejl");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSave,
    error,
    success,
    loading,
  };
};

export default useChangePasswordViewModel;
