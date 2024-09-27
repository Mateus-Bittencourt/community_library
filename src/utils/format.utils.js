export const toCamelCase = (obj) => {
  const newObject = {};
  for (let key in obj) {
    const camelKey = key.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
    newObject[camelKey] = obj[key];
  }
  return newObject;
};
