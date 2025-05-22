// Baggrund til autentificeringssider med pulserende gradient og diskret mønster
export default function AuthBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/20 via-black to-blue-500/20 blur-sm animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px] opacity-10" />
    </div>
  );
}
