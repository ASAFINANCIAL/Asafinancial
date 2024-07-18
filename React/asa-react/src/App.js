import logo from './logo.svg';
import './App.css';
import AsaConnector from './components/asaconnector'; 
import { AsaStateProvider } from './components/asaStateProvider';
import { DataLoaderProvider } from './components/dataloader';
import ErrorBoundary from './components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AsaStateProvider>
          <DataLoaderProvider>
          <QueryClientProvider client={queryClient}>
            <AsaConnector/>
              
            </QueryClientProvider>
          </DataLoaderProvider>
        </AsaStateProvider>
        </ErrorBoundary>
    </div>
  );
}

export default App;
