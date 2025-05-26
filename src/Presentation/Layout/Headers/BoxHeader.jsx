import React from "react";
import FlexBetween from "@/Presentation/Components/Shared/UI/FlexBetween";

/**
 * BoxHeader – Viser en overskrift, undertitel og evt. tekst i højre side.
 * Designet til at blive brugt i bokse eller sektioner.
 * @param {string} title - Hovedtitel.
 * @param {string} subtitle - Undertitel.
 * @param {string} sideText - Tekst der vises i højre side.
 */
const BoxHeader = ({ title, subtitle, sideText }) => {
  return (
    <FlexBetween className="mb-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <p className="text-sm text-gray-400">{sideText}</p>
    </FlexBetween>
  );
};

export default BoxHeader;
