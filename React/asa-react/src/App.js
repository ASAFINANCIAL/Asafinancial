import logo from './logo.svg';
import './App.css';
import AsaConnector from './components/asaconnector'; 
import { AsaStateProvider } from './components/asaStateProvider';
import { DataLoaderProvider } from './components/dataloader';
import ErrorBoundary from './components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App asa-container">
      <ErrorBoundary>
        <AsaStateProvider>
          <DataLoaderProvider>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <AsaConnector/>
              
            </QueryClientProvider>
          </DataLoaderProvider>
        </AsaStateProvider>
        </ErrorBoundary>
    </div>
  );
}

export default App;
