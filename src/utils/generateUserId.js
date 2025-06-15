export const generateUserId = () => {
  let userId = localStorage.getItem('bookmyheart_userId');
  
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem('bookmyheart_userId', userId);
  }
  
  return userId;
};

export const getUserId = () => {
  return localStorage.getItem('bookmyheart_userId') || generateUserId();
};