import logo from './logo.svg';
import './App.css';
import AsaConnector from './components/asaconnect'; 
import { AsaStateProvider } from './components/asaStateProvider';
import { DataLoaderProvider } from './components/dataloader';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
        <AsaStateProvider>
          <DataLoaderProvider>
          <QueryClientProvider client={queryClient}>
            <AsaConnector/>
              <img src={logo} className="App-logo" alt="logo" />
            </QueryClientProvider>
          </DataLoaderProvider>
        </AsaStateProvider>
    </div>
  );
}

export default App;
