// @Shared/Utils/normalizeData.js

export const normalizeDataJson = (dataJson) => {
  if (Array.isArray(dataJson)) return dataJson;
  if (typeof dataJson === "object" && dataJson !== null) {
    const keys = Object.keys(dataJson);
    if (keys.every((key) => !isNaN(key))) {
      return keys.map((k) => dataJson[k]);
    }
  }
  return [dataJson];
};
