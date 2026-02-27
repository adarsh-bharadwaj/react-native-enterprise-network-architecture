import NetInfo from '@react-native-community/netinfo';
import { dequeueAll } from './mutationQueue';
import { logger } from '../monitoring/logger';

// Call this function once in your app's entry point
export function setupMutationQueueSync(replayMutation: (mutation: any) => Promise<void>) {
  let syncing = false;

  NetInfo.addEventListener(async state => {
    if (state.isConnected && !syncing) {
      syncing = true;
      try {
        const mutations = dequeueAll();
        for (const mutation of mutations) {
          try {
            await replayMutation(mutation);
          } catch (err) {
            logger.error('MUTATION_REPLAY_FAILED', { mutation, error: err });
          }
        }
        logger.info('OFFLINE_MUTATIONS_REPLAYED', { count: mutations.length });
      } finally {
        syncing = false;
      }
    }
  });
}
