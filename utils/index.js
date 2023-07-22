const generateValidationErrorMessage = ({ validationErrorArr }) => {
  const errorMessagesArr = validationErrorArr.map((data) => {
    return data?.msg;
  });
  const errorMessage = errorMessagesArr.join(" and ");
  return errorMessage;
};

module.exports = {
  generateValidationErrorMessage,
};
