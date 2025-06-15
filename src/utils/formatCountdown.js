import { differenceInDays, differenceInHours, differenceInMinutes, isPast } from 'date-fns';

export const formatCountdown = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);

  if (isPast(target)) {
    return { expired: true, text: 'Date has passed' };
  }

  const days = differenceInDays(target, now);
  const hours = differenceInHours(target, now) % 24;
  const minutes = differenceInMinutes(target, now) % 60;

  if (days > 0) {
    return { 
      expired: false, 
      text: `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''} left`,
      days,
      hours,
      minutes
    };
  } else if (hours > 0) {
    return { 
      expired: false, 
      text: `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''} left`,
      days: 0,
      hours,
      minutes
    };
  } else {
    return { 
      expired: false, 
      text: `${minutes} minute${minutes !== 1 ? 's' : ''} left`,
      days: 0,
      hours: 0,
      minutes
    };
  }
};

// Generate Google Meet link with proper format
export const generateMeetingLink = () => {
  // Generate a random meeting ID in the format xxx-xxxx-xxx
  const generateSegment = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const segment1 = generateSegment(3);
  const segment2 = generateSegment(4);
  const segment3 = generateSegment(3);
  
  return `https://meet.google.com/${segment1}-${segment2}-${segment3}`;
};

// Alternative: Generate Whereby link (also no login required)
export const generateWherebyLink = () => {
  const roomName = `bookmyheart-${Date.now()}`;
  return `https://whereby.com/${roomName}`;
};

// Generate Jitsi link with guest access enabled
export const generateJitsiLink = () => {
  const roomName = `BookMyHeart_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return `https://meet.jit.si/${roomName}#config.requireDisplayName=false&config.prejoinPageEnabled=false`;
};