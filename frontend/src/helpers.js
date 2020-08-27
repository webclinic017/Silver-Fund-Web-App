import moment from "moment";

/* 
Input: An integer (positive or negative) that represents how many days away a specific day is from today (ex: yesterday = -1)
Output: A "YYYY-MM-DD" date string (ex: "2020-01-01")
*/
export function getDateStr(daysAway) {
  const newDate = new Date();

  newDate.setDate(newDate.getDate() + daysAway);

  const newDateStr =
    newDate.getFullYear() +
    "-" +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + newDate.getDate()).slice(-2);
  return newDateStr;
}
/*
Return back a "YYYY-MM-DD" string (ex: "2020-01-01:") that is 3 months since yesterday.
*/
export function getDateStr3MonthsBack() {
  const newDate = new Date();
  newDate.setMonth(newDate.getMonth() - 3);
  newDate.setDate(newDate.getDate() - 1);

  const newDateStr =
    newDate.getFullYear() +
    "-" +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + newDate.getDate()).slice(-2);
  return newDateStr;
}

export function addThousandsComma(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function makeMoneyFormat(value) {
  return "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getDates(startDate, endDate) {
  let dateArray = [];
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

function getColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
  // const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function convertToPercentage(values) {
  const add_abs = (a, b) => Math.abs(a) + Math.abs(b);

  if (values.length === 0) {
    return values;
  } else {
    const sum = values.reduce(add_abs);

    return values.map(function (x) {
      return (100 * (x / sum)).toFixed(2);
    });
  }
}

export function formatTimeSeries(apiData, startDate, stopDate, weight) {
  const add_abs = (a, b) => Math.abs(a) + Math.abs(b);
  let tickers = [];
  let labels = [];
  let datasets = [];
  let timeSeriesData = [];

  tickers = apiData.map(({ ticker }) => ticker);
  tickers = [...new Set(tickers)];
  labels = getDates(startDate, stopDate);

  // We fill our weights with one in case we want the $ value of each position
  let weights = [];
  let curr;

  // If we want portfolio weights
  if (weight === true) {
    for (let k = 0; k < labels.length; ++k) {
      curr = apiData.filter(function (item) {
        return item.date === labels[k];
      });
      curr = curr.map(({ position_value }) => position_value);
      if (curr.length === 0) {
        weights.push(1);
      } else {
        weights.push(curr.reduce(add_abs));
      }
    }
  } else {
    weights = Array(labels.length).fill(1);
  }

  for (let i = 0; i < tickers.length; i++) {
    let color = getColor(tickers[i]);
    let asset = {};
    asset.label = tickers[i];
    asset.backgroundColor = color;
    asset.borderColor = color;
    asset.data = [];
    for (let j = 0; j < labels.length; j++) {
      let value = apiData.filter(function (item) {
        return item.ticker === tickers[i] && item.date === labels[j];
      });
      if (value.length === 0) {
        asset.data.push(0);
      } else {
        asset.data.push(
          ((100 * value[0].position_value) / weights[j]).toFixed(2)
        );
      }
    }
    asset.fill = false;
    datasets.push(asset);
  }
  timeSeriesData.push(labels);
  timeSeriesData.push(datasets);
  return timeSeriesData;
}