import { getDeviationColor } from "@/Presentation/Utils/getDeviationColor";

/**
 * DeviationText – Viser en farvekodet procentvis afvigelse.
 * Bruger `getDeviationColor` til at farve teksten.
 *
 * @param {number} deviation - Afvigelsen i procent
 */
export default function DeviationText({ deviation }) {
  const deviationColor = getDeviationColor(deviation);

  return (
    <p className={`${deviationColor} font-medium`}>
      Afvigelse: {deviation}%
    </p>
  );
}
