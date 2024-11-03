export function loading<T, E extends Error = Error>(promise: Promise<T>) {
  let loading = $state(true);
  let data: T | null = $state(null);
  let error: E | null = $state(null);

  promise
    .then((r) => (data = r))
    .catch((e) => (error = e))
    .finally(() => (loading = false));

  return {
    get loading() {
      return loading;
    },
    get data() {
      return data;
    },
    get error() {
      return error;
    },
  };
}
