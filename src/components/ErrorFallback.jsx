import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Nimadir noto'g'ri ketdi:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Qayta urinib ko'ring</button>
  </div>
);

const MyErrorBoundary = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ErrorBoundary>
);

export default MyErrorBoundary;
