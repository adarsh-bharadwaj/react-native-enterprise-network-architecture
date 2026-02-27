/**
 * TOKEN REFRESH LOCKING MECHANISM
 *
 * Prevents multiple simultaneous refresh calls.
 */

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

export const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

export const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
};

export const getRefreshingState = () => isRefreshing;

export const setRefreshingState = (value: boolean) => {
  isRefreshing = value;
};