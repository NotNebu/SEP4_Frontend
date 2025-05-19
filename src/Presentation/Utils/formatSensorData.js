/**
 * formatSensorData – Formatterer tidsstempler i sensordata til læsbar dansk dato/tid.
 *
 * @param {Array} data - Liste af sensorobjekter med 'time'-felt
 * @returns {Array} - Samme data med formateret 'time'-felt
 */
export const formatSensorData = (data = []) =>
  data.map((entry) => {
    const time = new Date(entry.time);
    const formattedTime = isNaN(time.getTime())
      ? "Ugyldig dato"
      : time.toLocaleString("da-DK"); // Dansk dato/tid-format

    return { ...entry, time: formattedTime };
  });
