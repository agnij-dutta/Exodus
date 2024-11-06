import { useState, useEffect } from 'react';

export const useTransferStatus = (transferId: string) => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/transfers/status/${transferId}`);
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(checkStatus, 5000);
    checkStatus();

    return () => clearInterval(interval);
  }, [transferId]);

  return { status, loading, error };
};