let lastPrediction = {
  temperatur: 24,
  luftfugtighed: 60,
  jordfugtighed: 32,
  lys: 480,
  afstand: 15,
};

export const generatePredictedData = () => {
  const vary = (v, d, min, max) =>
    Math.min(max, Math.max(min, +(v + (Math.random() * d * 2 - d)).toFixed(1)));

  lastPrediction = {
    temperatur: vary(lastPrediction.temperatur, 0.2, 22, 27),
    luftfugtighed: vary(lastPrediction.luftfugtighed, 0.8, 50, 70),
    jordfugtighed: vary(lastPrediction.jordfugtighed, 1.0, 25, 55),
    lys: Math.round(vary(lastPrediction.lys, 60, 100, 1000)),
    afstand: vary(lastPrediction.afstand, 0.15, 10, 20),
  };

  return {
    timestamp: new Date().toISOString(),
    predictedTemperatur: lastPrediction.temperatur,
    predictedLuftfugtighed: lastPrediction.luftfugtighed,
    predictedJordfugtighed: lastPrediction.jordfugtighed,
    predictedLys: lastPrediction.lys,
    predictedAfstand: lastPrediction.afstand,
  };
};
