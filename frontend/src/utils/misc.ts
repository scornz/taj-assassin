/* Allows for asynchronous functions to run in sync one after another. Functions
must take no arguments and return nothing. */
export const syncFunction = (fn: () => void) => {
  // Resolve promise such that upon being called for the first time
  let promise = Promise.resolve();
  return async () => {
    // Await on the previous promise
    await promise;
    // Essentially "queue" .then() calls onto an original promise to create
    // a queue of await functions
    // This is no longer resolved until it is called again
    promise = promise.then(() => fn());
    return promise;
  };
};

/* Returns true iff date is a date from some time today. */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/* Converts number of seconds into format of a stopwatch */
export const toStopwatchString = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  const minOutput = min < 10 ? `0${min}` : `${min}`;
  const secOutput = sec < 10 ? `0${sec}` : `${sec}`;

  return `${minOutput}:${secOutput}`;
};
