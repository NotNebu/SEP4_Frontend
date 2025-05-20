// --- REGISTRERING ---
// Sender brugerens oplysninger til API'et for at oprette en ny konto
export const registerUser = async ({ email, password, username }) => {
  const response = await fetch("https://localhost:5107/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

   if (!response.ok) {
    const data = await response.json();

    if (data.errors) {
      // Hvis der er valideringsfejl, samler vi dem i en liste
      const messages = Object.values(data.errors).flat();
      throw new Error(messages.join("\n"));
    }

  return await response.text();
   }
};

// --- LOGIN ---
// Logger brugeren ind og modtager JWT via cookie
export const loginUser = async ({ email, password }) => {
  const response = await fetch("https://localhost:5107/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  
  if (!response.ok) {
    let errorMessage = "Login fejlede.";

    try {
      const clone = response.clone(); 
      const data = await clone.json();
      if (data?.message) errorMessage = data.message;
    } catch {
      try {
        const text = await response.text(); 
        if (text) errorMessage = text;
      } catch {
        errorMessage = "Uventet fejl under login.";
      }
    }

    throw new Error(errorMessage);
  }
  return true;
};
