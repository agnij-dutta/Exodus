import React from 'react';
import { useTransferStatus } from '../hooks/useTransferStatus';

interface TransferProgressProps {
  transferId: string;
}

export const TransferProgress: React.FC<TransferProgressProps> = ({
  transferId
}) => {
  const { status, loading, error } = useTransferStatus(transferId);

  if (loading) return <div>Loading transfer status...</div>;
  if (error) return <div>Error: {error}</div>;

  const steps = ['Initiated', 'Locked', 'Bridge Confirmed', 'Completed'];
  const currentStep = steps.indexOf(status);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              index <= currentStep ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
              {index <= currentStep ? '✓' : index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};