import Input from "../../Components/Input";
import React from "react";

export default function ProfileForm({ profile, onChange }) {
  return (
    <form className="space-y-4">
      <Input label="Fornavn" name="firstname" value={profile.firstname} onChange={onChange} />
      <Input label="Efternavn" name="lastname" value={profile.lastname} onChange={onChange} />
      <Input label="Brugernavn" name="username" value={profile.username} onChange={onChange} />
      <Input label="Email" name="email" value={profile.email} onChange={onChange} />
      <Input label="Fødselsdag" name="birthday" type="date" value={profile.birthday?.substring(0, 10)} onChange={onChange} />
      <Input label="Land" name="country" value={profile.country} onChange={onChange} />
      <Input label="Vejnavn" name="street" value={profile.street} onChange={onChange} />
      <Input label="Husnummer" name="houseNumber" value={profile.houseNumber} onChange={onChange} />
      <Input label="By" name="city" value={profile.city} onChange={onChange} />
    </form>
  );
}
