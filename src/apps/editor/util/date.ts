const ONE_DAY_MS = 86400000;
const ONE_WEEK_MS = ONE_DAY_MS * 7;
const ONE_MONTH_MS = ONE_DAY_MS * 30;

export const formatDateToRelative = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  if (diffInMs < ONE_DAY_MS) {
    return 'Today';
  } else if (diffInMs < ONE_DAY_MS * 2) {
    return 'Yesterday';
  } else if (diffInMs < ONE_WEEK_MS) {
    const daysAgo = Math.floor(diffInMs / ONE_DAY_MS);
    return `${daysAgo} days ago`;
  } else if (diffInMs < ONE_MONTH_MS) {
    const weeksAgo = Math.floor(diffInMs / ONE_WEEK_MS);
    return `${weeksAgo} weeks ago`;
  } else if (diffInMs < ONE_MONTH_MS * 2) {
    return '1 month ago';
  } else {
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  }
};

export const isDateLessThanOneWeekAgo = (date: Date): boolean =>
  new Date().getTime() - date.getTime() < ONE_WEEK_MS;
