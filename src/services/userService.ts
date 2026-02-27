import { requestOrchestrator } from '../core/api/requestOrchestrator';

export const fetchUsers = async (signal?: AbortSignal) => {
  const response = await requestOrchestrator(
    {
      method: 'GET',
      url: '/users',
    },
    signal
  );

  return response.data;
};