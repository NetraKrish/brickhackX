// postRecord.js - Passes the POST API request from React to Express server

// Connect with the Express server
const addRecordEndpoint = 'http://localhost:5001/deleteData';

export default async function deleteRecord(id) {

  
var ids = new Array();
ids.push(parseInt(id));

  const recordBodyParameters = {
    'app':1,
'ids':[parseInt(id)]
// ES6 syntax that functions the same as above
  }

  const options = {
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(recordBodyParameters)
  }
console.log(options);
  const response = await fetch(addRecordEndpoint, options);
  const jsonResponse = await response.json();

  console.log(JSON.stringify(jsonResponse));

  return jsonResponse;

  // - - - - - - - END - - - - - - - - -
};