const _ = require('lodash');
const dateRegexp = /\d{2}.\d{2}(.\d{4})?/;

function getFlyPointByEndQuery(query, date, indexFlyPoint) {
  return _.isNull(date) ? 
      query.substring(indexFlyPoint)
      : query.substring(indexFlyPoint, query.search(dateRegexp));
}

module.exports = function(query) {
  let origin = null;
  let destination = null;
  
  const OFFSET_ORIGIN_FLY_POINT = 3;
  const dateMatches = query.match(dateRegexp);
  const date = _.isNull(dateMatches) ? dateMatches : dateMatches[0];
  const indexOrigin = query.indexOf('из ');
  const indexDestination = query.indexOf('в ');

  const isFullFlyExist = indexOrigin >= 0 && indexDestination >= 0;
  const isDirectFlyOrder = isFullFlyExist && (indexOrigin < indexDestination);   
  const isRevertFlyOrder = isFullFlyExist && (indexOrigin > indexDestination);   

  if (isDirectFlyOrder) {
    origin = query.substring(indexOrigin + OFFSET_ORIGIN_FLY_POINT, indexDestination).trim();
    destination = getFlyPointByEndQuery(query, date, indexDestination).trim();
  } else if (isRevertFlyOrder) {
    origin = getFlyPointByEndQuery(query, date, indexOrigin + OFFSET_ORIGIN_FLY_POINT).trim();
    destination = query.substring(indexDestination, indexOrigin).trim();
  } else if (indexOrigin < 0) {
    destination = getFlyPointByEndQuery(query, date, indexDestination).trim();
  } else if (indexDestination < 0) {
    origin = getFlyPointByEndQuery(query, date, indexOrigin + OFFSET_ORIGIN_FLY_POINT).trim();
  }


  return {
    origin,
    destination,
    date,
  };
};