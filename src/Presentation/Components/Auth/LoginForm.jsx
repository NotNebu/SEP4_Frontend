import { FaUser, FaLock } from "react-icons/fa";
import Input from "@/Presentation/Components/Shared/UI/Input";
import Button from "@/Presentation/Components/Shared/UI/Button";

// Formular til login med email og adgangskode
export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
      className="space-y-4"
    >
      {/* Email-felt */}
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm" />
        <Input
          name="email"
          type="text"
          value={email}
          onChangeValue={setEmail}
          placeholder="Email"
          variant="auth"
        />
      </div>

      {/* Adgangskode-felt */}
      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm" />
        <Input
          name="password"
          type="password"
          value={password}
          onChangeValue={setPassword}
          placeholder="Adgangskode"
          variant="auth"
        />
      </div>

      {/* Login-knap */}
      <Button type="submit" label="Log ind" fullWidth variant="primary" />
    </form>
  );
}
