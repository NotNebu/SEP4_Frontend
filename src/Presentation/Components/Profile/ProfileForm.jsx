import Form from "@/Presentation/Components/Shared/UI/Form";

export default function ProfileForm({ profile, onChange, error }) {
  const fields = [
    {
      name: "firstname",
      label: "Fornavn",
      validate: (val) =>
        !val || val.length < 2 ? "Fornavn skal være mindst 2 tegn." : null,
    },
    {
      name: "lastname",
      label: "Efternavn",
      validate: (val) =>
        !val || val.length < 2 ? "Efternavn skal være mindst 2 tegn." : null,
    },
    {
      name: "username",
      label: "Brugernavn",
      validate: (val) =>
        !val || val.length < 3 ? "Brugernavn skal være mindst 3 tegn." : null,
    },
    {
      name: "email",
      label: "Email",
      validate: (val) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? "Ugyldig emailadresse."
          : null,
    },
    {
      name: "birthday",
      label: "Fødselsdag",
      type: "date",
      validate: (val) =>
        !val || isNaN(new Date(val)) ? "Ugyldig fødselsdato." : null,
    },
    {
      name: "country",
      label: "Land",
      validate: (val) =>
        !val || val.length < 2 ? "Land skal være mindst 2 tegn." : null,
    },
    {
      name: "street",
      label: "Vejnavn",
      validate: (val) =>
        !val || val.length < 2 ? "Vejnavn skal være mindst 2 tegn." : null,
    },
    {
      name: "houseNumber",
      label: "Husnummer",
      validate: (val) =>
        !val || isNaN(val) ? "Husnummer skal være et tal." : null,
    },
    {
      name: "city",
      label: "By",
      validate: (val) =>
        !val || val.length < 2 ? "By skal være mindst 2 tegn." : null,
    },
  ];

  const safeProfile = {
    ...profile,
    birthday: profile.birthday?.substring(0, 10),
  };

  return (
    <>
      <Form fields={fields} values={safeProfile} onChange={onChange} />
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </>
  );
}
