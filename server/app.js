const app = require('.');
require('../database/pg/connect');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Products listening at ${process.env.SERVER_PORT}`);
});
