const fullName = ({
  firstName,
  middleName,
  lastName,
}: {
  firstName: string;
  middleName?: string;
  lastName: string;
}) => {
  return `${firstName ? firstName : ""} ${middleName ? middleName : ""} ${
    lastName ? lastName : ""
  }`;
};

export default fullName;
