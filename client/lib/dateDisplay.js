/**
 * This returns a string representing the elapsed time since an event, in an easy to read format.
 * @param date the date from which the interval is to be calculated
 * @returns {String} a human-readable string specifying how much time has passed since the given date
 */
export default function intervalFromNow(date) {
  const interval = Date.now() - date;

  const min = 60 * 1000;
  const hr = min * 60;
  const day = hr * 24;
  const week = day * 7;
  const month = week * 4;

  if (interval < min) {
    return 'less than a minute ago';
  } else if (interval < hr) {
    const minutes = Math.floor(interval / min);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (interval < day) {
    const hours = Math.floor(interval / hr);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (interval < week) {
    const days = Math.floor(interval / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (interval < month) {
    const weeks = Math.floor(interval / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  const months = Math.floor(interval / month);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
}
