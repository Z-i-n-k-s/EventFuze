import SummaryApi from '../common/index';

// Helper function to make API calls
const makeApiCall = async (apiConfig, data = null) => {
  try {
    const { url, method } = apiConfig;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    // Add body for POST/PUT requests
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API call failed');
    }

    return result;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Event service functions
export const eventService = {
  // Get all events
  getAllEvents: async () => {
    return await makeApiCall(SummaryApi.getAllEvents);
  },

  // Get events by club
  getEventsByClub: async (clubId) => {
    return await makeApiCall(SummaryApi.getEventsByClub, { clubId });
  },

  // Create new event
  createEvent: async (eventData) => {
    return await makeApiCall(SummaryApi.createEvent, eventData);
  },

  // Update event
  updateEvent: async (eventData) => {
    return await makeApiCall(SummaryApi.updateEvent, eventData);
  },

  // Delete event
  deleteEvent: async (eventId) => {
    return await makeApiCall(SummaryApi.deleteEvent, { eventId });
  },
};
