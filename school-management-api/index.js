const express = require('express');
const app = express();
require('dotenv').config();

const schoolsRoute = require('./routes/schools');

app.use(express.json());
app.use('/', schoolsRoute);

app.listen(3000, () => console.log(`Server running on port 3000`));
