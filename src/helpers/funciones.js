exports.cleanObj = (obj) => {
  Object.keys(obj).forEach((k) => {
    obj[k] = obj[k] || undefined;
  });
  return obj;
};
