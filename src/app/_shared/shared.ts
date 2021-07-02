export function getDate(startDate) {
  let sDate = new Date(startDate);
  return (
    sDate.getDate() + '/' + sDate.getUTCMonth() + '/' + sDate.getUTCFullYear()
  );
}

export function getStartTime(startDate) {
  let sDate = new Date(startDate);
  let hoursDiff = sDate.getHours() - Math.floor(sDate.getTimezoneOffset() / 60);
  let minutesDiff = (sDate.getUTCMinutes() - sDate.getTimezoneOffset()) % 60;
  sDate.setHours(hoursDiff);
  sDate.setMinutes(minutesDiff);

  return (
    sDate.getUTCHours() +
    ':' +
    (sDate.getUTCMinutes() < 10
      ? '0' + sDate.getUTCMinutes()
      : sDate.getUTCMinutes())
  );
}

export function getDuration(startDate, endDate) {
  return (
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / (60 * 1000)
  );
}
