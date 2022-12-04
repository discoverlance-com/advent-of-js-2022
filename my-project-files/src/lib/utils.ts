export function padString(n: number) {
  return n < 10 ? "0" + n : String(n);
}

export function getMinutes(time: number) {
  return Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
}

export function getSeconds(time: number) {
  return Math.floor((time % (1000 * 60)) / 1000);
}

export function addMinutes(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);
  return date.getMinutes();
}

export function addSeconds(date: Date, seconds: number) {
  date.setSeconds(date.getSeconds() + seconds);
  return date.getSeconds();
}
