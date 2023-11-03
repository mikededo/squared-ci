export const addEnvVariable = (variable: string) => {
  // Parse the variabl
  const [name, value] = variable.split('=');

  // Name parsing
  const parsedName = name.replaceAll(' ', '_').toUpperCase().trim();
  // Value parsing
  const hasSpaces = value.includes(' ');
  const parsedValue = (hasSpaces ? `"${value}"` : value).trim();
  return `${parsedName}=${parsedValue}`;
};
