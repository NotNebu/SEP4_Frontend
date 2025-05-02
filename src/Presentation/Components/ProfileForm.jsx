export default function ProfileForm() {
    return (
      <form className="space-y-4">
        <Input label="Fornavn" />
        <Input label="Efternavn" />
        <Input label="Brugernavn" />
        <Input label="Email" />
        <Input label="Fødselsdag" type="date" />
        <Input label="Land" />
        <Input label="Vejnavn" />
        <Input label="Husnummer" />
        <Input label="By" />
      </form>
    );
  }
  
  function Input({ label, type = "text" }) {
    return (
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <input
          type={type}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
  