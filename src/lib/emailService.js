import emailjs from 'emailjs-com';

// Initialize EmailJS
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

// Initialize on module load
initEmailJS();

// Send date invitation email
export const sendDateInviteEmail = async (inviteData) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      console.warn('EmailJS not configured - email sending disabled');
      return { success: false, error: 'Email service not configured' };
    }

    const templateParams = {
      to_email: inviteData.partnerEmail,
      to_name: inviteData.partnerName,
      from_name: inviteData.senderName || 'Someone Special',
      date_type: inviteData.dateType,
      date_time: new Date(inviteData.dateTime).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      message: inviteData.message,
      invite_url: inviteData.inviteUrl,
      meeting_link: inviteData.meetingLink,
      spotify_playlist: inviteData.spotifyPlaylist || '',
      app_name: 'BookMyHeart'
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    
    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send date invitation with Firestore integration
export const sendDateInvite = async (dateId, partnerEmail, partnerName, dateData) => {
  try {
    const inviteData = {
      dateId,
      partnerEmail,
      partnerName,
      dateType: dateData.dateType,
      dateTime: dateData.dateTime,
      message: dateData.message,
      meetingLink: dateData.meetingLink,
      spotifyPlaylist: dateData.spotifyPlaylist || '',
      inviteUrl: `${import.meta.env.VITE_APP_URL || window.location.origin}/invite/${dateId}`,
      senderName: dateData.senderName || 'Someone special',
      emailSent: false
    };

    // Create invite record in Firestore
    const { createInvite, updateInviteStatus } = await import('./firestore');
    const invite = await createInvite(inviteData);
    
    // Send email
    const emailResult = await sendDateInviteEmail(inviteData);
    
    // Update invite status based on email result
    if (emailResult.success) {
      await updateInviteStatus(invite.id, { emailSent: true });
    }

    return {
      ...invite,
      emailSent: emailResult.success,
      emailError: emailResult.success ? null : emailResult.error
    };
  } catch (error) {
    console.error('Error sending invite:', error);
    throw error;
  }
};