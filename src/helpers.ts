import {NOTIFICATION} from "./constants";

export const amountToCredits = (amount: number) => Math.ceil(amount * 50)

export const responsePredicate = (response: Response, data: any, pushNotification: any, ...cbs: Array<() => any>) => {
  if (response.status === 400 || response.status === 429) {
    pushNotification(NOTIFICATION.RESPONSE_INFO.name, {
      ...NOTIFICATION.RESPONSE_INFO,
      heading: data?.error,
    });
    cbs.forEach(cb => cb());

    return false;
  }

  if (response.status === 500) {
    pushNotification(
      NOTIFICATION.RESPONSE_CRITICAL.name,
      NOTIFICATION.RESPONSE_CRITICAL
    );
    cbs.forEach(cb => cb());

    return false;
  }

  return true
}

export function use(promise: any) {
  // throw promise;
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result: any) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason: any) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}

export const secondsToMinutes = (secondsWithMs: number) => {
  // we don't care about milliseconds
  const totalSeconds = Math.floor(secondsWithMs);

  const minutes = Math.floor(totalSeconds / 60);
  const secondsLeft = totalSeconds % 60;

  return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
}
