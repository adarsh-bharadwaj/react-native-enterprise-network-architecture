/**
 * PERSISTENT OFFLINE MUTATION QUEUE
 *
 * 🔹 Survives app crash
 * 🔹 Survives device restart
 * 🔹 Replays in order
 */

import { createMMKV } from 'react-native-mmkv';
import { logger } from '../monitoring/logger';

const storage = createMMKV();
const KEY = 'offline_queue';

type StoredMutation = {
  id: string;
  requestConfig: any;
};

const getQueue = (): StoredMutation[] => {
  const raw = storage.getString(KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveQueue = (queue: StoredMutation[]) => {
  storage.set(KEY, JSON.stringify(queue));
};

export const enqueueMutation = (mutation: StoredMutation) => {
  const queue = getQueue();
  queue.push(mutation);
  saveQueue(queue);
};

export const dequeueAll = () => {
  const queue = getQueue();
  saveQueue([]);
  return queue;
};