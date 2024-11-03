export type MaybePromiseFn<T = unknown> = (() => T) | (() => Promise<T>);

export function makeLoadingState<T = unknown>() {
  let loading = $state(false);
  let isError = $state(false);
  let isSuccess = $state(false);
  let data: T | null = $state(null);
  let error: Error | null = $state(null);

  return {
    get loading() {
      return loading;
    },
    get isError() {
      return isError;
    },
    get isSucces() {
      return isSuccess;
    },
    get data() {
      return data;
    },
    get error() {
      return error;
    },
    async load(fn: MaybePromiseFn<T>) {
      // Set the loading state to true since we are loading items
      loading = true;
      try {
        // Call the function passed to us
        const called = fn();

        if (called instanceof Promise) {
          data = await called;
        } else {
          data = called;
        }
        isSuccess = true;
      } catch (e) {
        // set the isError flag to true,
        isError = true;
        if (e instanceof Error) error = e;
        else console.error(e);
      } finally {
        // Finally set the loading state to false
        loading = false;
      }
    },
  };
}
