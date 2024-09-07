export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidName = (name) => {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(" ");
  return nameParts.length === 2 && trimmedName === name;
};

export const isValidPhoneNumber = (phone) => /^\d{11}$/.test(phone);

export const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
