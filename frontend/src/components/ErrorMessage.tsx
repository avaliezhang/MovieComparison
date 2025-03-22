import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-2">
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
};

export default ErrorMessage;