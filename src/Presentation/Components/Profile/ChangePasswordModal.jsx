import Modal from "@Presentation/Components/Shared/Modal/Modal";
import ModalHeader from "@Presentation/Components/Shared/Modal/ModalHeader";
import Form from "@Presentation/Components/Shared/UI/Form";
import ErrorMessage from "@Presentation/Components/Shared/UI/ErrorMessage";
import PasswordRequirements from "@/Presentation/Components/Shared/Validation/PasswordStrengthMeter";
import useChangePasswordViewModel from "@Presentation/Hooks/useChangePasswordViewModel";

// Modal til ændring af brugerens adgangskode
export default function ChangePasswordModal({ isOpen, onClose }) {
  const { form, handleChange, handleSave, error, success, loading } =
    useChangePasswordViewModel();

  // Felter til formularen
  const fields = [
    { name: "oldPassword", label: "Gammelt kodeord", type: "password" },
    { name: "newPassword", label: "Nyt kodeord", type: "password" },
    { name: "confirmPassword", label: "Bekræft nyt kodeord", type: "password" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modalens overskrift */}
      <ModalHeader title="Skift kodeord" />

      <div className="space-y-4">
        {/* Vis fejl eller succesbesked */}
        {error && <ErrorMessage message={error} />}
        {success && <ErrorMessage message={success} variant="success" />}

        {/* Formular til at skifte kodeord */}
        <Form
          fields={fields}
          values={form}
          onChangeValue={handleChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          showButtons
          submitLabel={loading ? "Gemmer..." : "Gem"}
          submitVariant="primary"
          resetLabel="Annullér"
          resetVariant="secondary"
          onReset={onClose}
          childrenAfter={<PasswordRequirements password={form.newPassword} />}
        />
      </div>
    </Modal>
  );
}
