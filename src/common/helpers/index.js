/**  
* givien an array of objects (arr) and a key (filter key) this function returns
* a set of the values on  that key [ {[fikterKey]: 1}, {[filterKey]: 2}, {[filterKey]: 2}]
* expected return is [1,2]
*/   
function extractFilterValue(arr, filterKey) {
    let filter = [];

    for (let item of arr) {
      if (!filter.includes(item[filterKey])) filter.push(item[filterKey])
    }

    return filter;
}

/** 
 * givien an object if any value in that object is empty ,null or undefined
 * this function will return true
*/

function includesUnvalidValue(obj) {
  let allValues = Object.values(obj);
  let state = false;

  for (let value of allValues)
    if (value === "" || value === null || value === undefined) state = true
  
  return state;
}

const helpers = {
  extractFilterValue,
  includesUnvalidValue
}

export default helpers;