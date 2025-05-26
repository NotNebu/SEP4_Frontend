import { RegisterViewModel } from "@/Presentation/Hooks/useRegisterViewModel";
import Modal from "@Presentation/Components/Shared/Modal/Modal";
import ModalHeader from "@Presentation/Components/Shared/Modal/ModalHeader";
import Form from "@Presentation/Components/Shared/UI/Form";
import PasswordStrengthMeter from "@/Presentation/Components/Shared/Validation/PasswordStrengthMeter";

// Modalvindue til oprettelse af ny bruger
const RegisterModal = ({ onClose }) => {
  const { form, handleChange, onRegister } = RegisterViewModel(onClose);

  // Felter til registreringsformularen
  const fields = [
    { name: "username", label: "Brugernavn" },
    { name: "email", label: "Email" },
    { name: "password", label: "Adgangskode", type: "password" },
    { name: "confirmPassword", label: "Bekræft adgangskode", type: "password" },
  ];

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalHeader title="Opret Konto" />

      <Form
        fields={fields}
        values={form}
        onChangeValue={handleChange}
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
        showButtons
        submitLabel="Registrer"
        submitVariant="primary"
        resetLabel="Nulstil"
        resetVariant="secondary"
        onReset={() => onClose()}
        childrenAfter={<PasswordStrengthMeter password={form.password} />}
      />
    </Modal>
  );
};

export default RegisterModal;
