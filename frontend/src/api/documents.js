const API_URL = process.env.REACT_APP_API_URL;

// Upload document
export const uploadDocument = async (token, file, clientId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('client_id', clientId);

    const response = await fetch(`${API_URL}/upload_document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// Get list of documents
export const getDocuments = async (token, clientId = null) => {
  try {
    let url = `${API_URL}/list_documents`;
    if (clientId) {
      url += `?client_id=${clientId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Get document by ID
export const getDocument = async (token, documentId) => {
  try {
    const response = await fetch(`${API_URL}/get_document?id=${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

// Get document status
export const getDocumentStatus = async (token, documentId) => {
  try {
    const response = await fetch(`${API_URL}/document_status?id=${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching document status:', error);
    throw error;
  }
};