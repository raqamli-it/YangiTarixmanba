import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback'; // To'g'ri yo'lni ko'rsating

const MyErrorBoundary = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default MyErrorBoundary;
