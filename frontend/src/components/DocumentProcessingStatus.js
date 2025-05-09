// frontend/src/components/DocumentProcessingStatus.js

import React, { useState, useEffect } from 'react';
import { getDocumentStatus } from '../api/documents';

const DocumentProcessingStatus = ({ documentId }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        const response = await getDocumentStatus(documentId);
        setStatus(response.status);

        // Keep polling if document is still processing
        if (response.status.processing_status === 'processing' ||
            response.status.processing_status === 'pending') {
          setTimeout(checkStatus, 5000); // Check again in 5 seconds
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [documentId]);

  if (loading && !status) {
    return <div className="processing-status loading">Loading status...</div>;
  }

  if (error) {
    return <div className="processing-status error">Error: {error}</div>;
  }

  return (
    <div className="processing-status">
      <h3>Document Processing Status</h3>

      <div className="status-details">
        <div className="status-item">
          <span className="label">Status:</span>
          <span className={`value ${status.processing_status}`}>
            {status.processing_status}
          </span>
        </div>

        {status.processed && (
          <>
            <div className="status-item">
              <span className="label">Document Type:</span>
              <span className="value">{status.document_type}</span>
            </div>

            <div className="status-item">
              <span className="label">Period/Year:</span>
              <span className="value">{status.period_year}</span>
            </div>

            <div className="status-item">
              <span className="label">Institution:</span>
              <span className="value">{status.institution}</span>
            </div>
          </>
        )}

        {status.error && (
          <div className="status-item error">
            <span className="label">Error:</span>
            <span className="value">{status.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentProcessingStatus;