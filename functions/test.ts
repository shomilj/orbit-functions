const axios = require("axios");

// interface ResponseRow {
//   created_at: number;
//   updated_at: number;
//   title: string;
//   address: string;
//   neighborhood: string;
//   categories: string[];
//   severity: string;
//   _geoloc: number[];
//   updates: any;
// }

async function testRun() {
  const response = await axios.get(url);
  console.log(response.data);
  response.data.forEach((row) => {
      
  })
}

testRun();
