const navigate = useNavigate();

try {
  const res = await fetch("...");

  // Hvis svaret ikke er OK (fx 404, 500 osv.)
  if (!res.ok) {
    navigate("/error", {
      state: {
        code: res.status,
        message:
          res.status === 404
            ? "Vi kunne ikke finde den ønskede anmodning."
            : "En teknisk fejl opstod.",
      },
    });
  }
} catch (err) {
  // Netværksfejl, timeouts eller ukendte serverfejl
  navigate("/error", {
    state: {
      code: 500,
      message: "Uventet netværksfejl eller serverfejl.",
    },
  });
}
