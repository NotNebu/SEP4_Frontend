let lastSensorData = {
  temperatur: 25,
  luftfugtighed: 60,
  jordfugtighed: 30,
  lys: 500,
  afstand: 15,
};

export const generateMockSensorData = () => {
  const vary = (value, delta, min, max) =>
    Math.min(max, Math.max(min, +(value + (Math.random() * delta * 2 - delta)).toFixed(1)));

  lastSensorData = {
    temperatur: vary(lastSensorData.temperatur, 0.3, 20, 30),
    luftfugtighed: vary(lastSensorData.luftfugtighed, 1.0, 45, 75),
    jordfugtighed: vary(lastSensorData.jordfugtighed, 1.5, 20, 60),
    lys: Math.round(vary(lastSensorData.lys, 80, 100, 1000)),
    afstand: vary(lastSensorData.afstand, 0.2, 10, 20),
  };

  return {
    timestamp: new Date().toISOString(),
    ...lastSensorData,
  };
};
