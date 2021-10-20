const calcDateDiffToString = createdAt => {
  const updatedDate = new Date(createdAt);
  const curDate = new Date();
  const diffInTime = curDate.getTime() - updatedDate.getTime();

  const min = 1000 * 60;
  const diffInMin = parseInt(diffInTime / min);
  if (diffInMin < 60) {
    return `${diffInMin} ${diffInMin <= 1 ? 'minute' : 'minutes'} ago`;
  }

  const hour = min * 60;
  const diffInHour = parseInt(diffInTime / hour);
  if (diffInHour < 24) {
    return `${diffInHour} ${diffInHour === 1 ? 'hour' : 'hours'}  ago`;
  }

  const day = hour * 24;
  const diffInDay = parseInt(diffInTime / day);
  if (diffInDay < 7) {
    return `${diffInDay} ${diffInDay === 1 ? 'day' : 'days'} ago`;
  }

  const week = day * 7;
  const diffInWeek = parseInt(diffInTime / week);
  if (diffInWeek < 4) {
    return `${diffInWeek} ${diffInWeek === 1 ? 'week' : 'weeks'} ago`;
  }

  const month = week * 4;
  const diffInMonth = parseInt(diffInTime / month);
  if (diffInMonth < 12) {
    return `${diffInMonth} ${diffInMonth === 1 ? 'month' : 'months'} ago`;
  }

  const year = month * 12;
  const diffInYear = parseInt(diffInTime / year);
  return `${diffInYear} ${diffInYear === 1 ? 'year' : 'years'} ago`;
};

export default calcDateDiffToString;
