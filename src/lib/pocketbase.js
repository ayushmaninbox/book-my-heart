import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Disable auto cancellation
pb.autoCancellation(false);

export default pb;

// Helper functions for date operations
export const createDate = async (dateData) => {
  try {
    // Store the custom ID in the customId field
    const recordData = {
      ...dateData,
      customId: dateData.id, // Store our custom ID
    };
    
    const record = await pb.collection('dates').create(recordData);
    return { ...record, id: record.customId }; // Return with our custom ID as the main ID
  } catch (error) {
    console.error('Error creating date:', error);
    throw error;
  }
};

export const getDateById = async (id) => {
  try {
    // First try to find by customId
    const records = await pb.collection('dates').getFullList({
      filter: `customId = "${id}"`,
    });
    
    if (records.length > 0) {
      const record = records[0];
      return { ...record, id: record.customId }; // Use customId as the main ID
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching date:', error);
    return null;
  }
};

export const getUserDates = async (userId) => {
  try {
    const records = await pb.collection('dates').getFullList({
      filter: `userId = "${userId}"`,
      sort: '-created',
    });
    
    // Map records to use customId as the main ID
    return records.map(record => ({
      ...record,
      id: record.customId || record.id
    }));
  } catch (error) {
    console.error('Error fetching user dates:', error);
    return [];
  }
};

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

    // Create invite record
    const record = await pb.collection('invites').create(inviteData);
    
    // Send email notification through PocketBase function
    try {
      const emailResponse = await pb.send('/api/send-invite-email', {
        method: 'POST',
        body: JSON.stringify(inviteData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Update invite record to mark email as sent if successful
      if (emailResponse && emailResponse.success) {
        await pb.collection('invites').update(record.id, { emailSent: true });
      }
    } catch (emailError) {
      console.warn('Email sending failed, but invite was created:', emailError);
    }

    return record;
  } catch (error) {
    console.error('Error sending invite:', error);
    throw error;
  }
};

// Function to get partner's dates (for email recipients)
export const getPartnerDates = async (email) => {
  try {
    const records = await pb.collection('invites').getFullList({
      filter: `partnerEmail = "${email}"`,
      sort: '-created',
    });
    return records;
  } catch (error) {
    console.error('Error fetching partner dates:', error);
    return [];
  }
};