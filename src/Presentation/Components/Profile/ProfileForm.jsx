import Form from "@/Presentation/Components/Shared/UI/Form";

// Formular til redigering af brugerprofiloplysninger
export default function ProfileForm({ profile, onChange }) {
  // Felter med danske labels
  const fields = [
    { name: "firstname", label: "Fornavn" },
    { name: "lastname", label: "Efternavn" },
    { name: "username", label: "Brugernavn" },
    { name: "email", label: "Email" },
    { name: "birthday", label: "Fødselsdag", type: "date" },
    { name: "country", label: "Land" },
    { name: "street", label: "Vejnavn" },
    { name: "houseNumber", label: "Husnummer" },
    { name: "city", label: "By" },
  ];

  // Sikrer at fødselsdato er i korrekt format (YYYY-MM-DD)
  const safeProfile = {
    ...profile,
    birthday: profile.birthday?.substring(0, 10),
  };

  return <Form fields={fields} values={safeProfile} onChange={onChange} />;
}
