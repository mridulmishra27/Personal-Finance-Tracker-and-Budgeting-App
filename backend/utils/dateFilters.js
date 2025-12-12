// Shared utility function for date filtering
export const parseDateFilters = (query) => {
  const { frequency = '7', startDate, endDate } = query;
  const now = new Date();
  let fromDate = null;
  let toDate = null;
  
  if (frequency === 'custom' && startDate && endDate) {
    fromDate = new Date(startDate);
    toDate = new Date(endDate);
  } else {
    const days = parseInt(frequency, 10); // 7, 30, 365
    fromDate = new Date();
    fromDate.setDate(now.getDate() - days);
    toDate = now;
  }
  
  return { fromDate, toDate };
};

