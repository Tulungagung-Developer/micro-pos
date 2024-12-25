export const Str = (str: string) => {
  return {
    toPascalCase: () => {
      return str.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
      });
    },
  };
};
