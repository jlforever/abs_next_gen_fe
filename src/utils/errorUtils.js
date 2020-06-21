export const formatErrors = errors => {
  const errArr = Object.values(errors);

  return errArr.join(", ");
};
