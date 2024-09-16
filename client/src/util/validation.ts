export const validateEmail = (data: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  };
  export const validatePassword = (data: string) => {
    return data.length >= 8;
  };
  export const validateField = (data: string) => {
    return data.trim() !== "";
  };
  export const validateAddress = (data: string) => {
    return data.trim() !== "";
  };
  export const validatePhone = (data: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(data);
  };
    export const validateName = (data: string) => {
        const nameRegex = /^[A-Za-z\s.]+$/;
        const trimmedData = data.trim();
        return nameRegex.test(trimmedData) && trimmedData.length > 0;
    };
  
  export const validateYear = (data: string): boolean => {
    const currentYear = new Date().getFullYear();
    const trimmedData = data.trim();
  
    // Check if the data is a 4-character string and a number
    if (trimmedData.length !== 4 || isNaN(Number(trimmedData))) {
      return false;
    }
  
    const year = Number(trimmedData);
    
    // Check if the year is greater than the current year
    return year <= currentYear;
  };
  