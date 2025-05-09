const API_URL = process.env.REACT_APP_API_URL;

// Get list of clients
export const getClients = async (token) => {
  try {
    const response = await fetch(`${API_URL}/list_clients`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

// Create new client
export const createClient = async (token, clientData) => {
  try {
    const response = await fetch(`${API_URL}/create_client`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    });

    if (!response.ok) {
      throw new Error('Failed to create client');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

// Get client by ID
export const getClient = async (token, clientId) => {
  try {
    const response = await fetch(`${API_URL}/get_client?id=${clientId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch client');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

// Update client
export const updateClient = async (token, clientId, clientData) => {
  try {
    const response = await fetch(`${API_URL}/update_client`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: clientId,
        ...clientData
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update client');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};