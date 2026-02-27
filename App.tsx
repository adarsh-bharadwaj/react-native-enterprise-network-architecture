import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { setupMutationQueueSync } from './src/core/offline/mutationQueueSync';
// Example replayMutation handler. Replace with your actual mutation replay logic.
const replayMutation = async (mutation: any) => {
  // TODO: Implement actual mutation replay logic, e.g., send to API
  // Example: await axiosClient(mutation.requestConfig);
};
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/app/store';
import { queryClient } from './src/app/queryClient';
import { HomeScreen } from './src/screens/HomeScreen';


const App = () => {
  useEffect(() => {
    setupMutationQueueSync(replayMutation);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;