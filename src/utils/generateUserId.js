export const generateUserId = () => {
  let userId = localStorage.getItem('bookmyheart_userId');
  
  if (!userId) {
    userId = 'u_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('bookmyheart_userId', userId);
  }
  
  return userId;
};

export const getUserId = () => {
  return localStorage.getItem('bookmyheart_userId') || generateUserId();
};

// Generate a short ID compatible with PocketBase (15 characters max)
export const generateShortId = () => {
  return Math.random().toString(36).substr(2, 15);
};