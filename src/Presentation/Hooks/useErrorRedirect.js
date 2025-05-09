const navigate = useNavigate();

try {
  const res = await fetch("...");
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
  navigate("/error", {
    state: {
      code: 500,
      message: "Uventet netværksfejl eller serverfejl.",
    },
  });
}