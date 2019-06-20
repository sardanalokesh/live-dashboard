function timeSeriesData() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const data = [];
  let date = startDate;
  while (date < endDate) {
    data.push({
      date: date.setHours(0,0,0,0),
      views: Math.round(Math.random() * 10000)
    });
    date.setDate(date.getDate() + 1);
  }
  return data;
}

exports.timeSeriesData = timeSeriesData;
