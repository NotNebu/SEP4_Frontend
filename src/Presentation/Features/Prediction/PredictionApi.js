export const submitPrediction = async (payload) => {
  const response = await fetch('https://localhost:5107/api/sensor/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // for JWT via cookie
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.text();
};
