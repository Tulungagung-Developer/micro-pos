export const stackToJSON = (errorStack: string) => {
  const [errorMessage, ...stackLines] = errorStack.split('\n');
  const [type, message] = errorMessage.split(': ');

  const stack = stackLines
    .filter((line) => line.includes('at '))
    .map((line) => {
      const [, location] = line.trim().split('at ');
      const [functionName, path] = location.split(' (').map((s) => s.replace(')', ''));

      return {
        function: functionName?.trim() || 'anonymous',
        location: path || functionName,
      };
    });

  return {
    type,
    message,
    stack,
  };
};
