import { useState } from "react";
import { changePassword } from "@/Application/Services/AccountService";

/**
 * useChangePasswordViewModel – Håndterer formularstate og validering for skift af kodeord.
 */
export const useChangePasswordViewModel = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");     // Fejlbesked (vises i UI)
  const [success, setSuccess] = useState(""); // Succesbesked
  const [loading, setLoading] = useState(false); // Loader-state

  // Opdaterer feltværdier i formularen
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Validerer og forsøger at gemme nyt kodeord
  const handleSave = async () => {
    setError("");
    setSuccess("");

    // Tjek om nye kodeord matcher
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
