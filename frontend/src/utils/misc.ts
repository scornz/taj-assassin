import { useEffect, useState } from "react";

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

const useCountdown = (targetDate: string | null) => {
  if (!targetDate) {
    targetDate = new Date().toISOString();
  }

  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
