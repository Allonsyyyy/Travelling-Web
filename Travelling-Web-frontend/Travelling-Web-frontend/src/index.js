import express from 'express';
import connect from './Config/index.js';
import cors from 'cors';
connect();

import destinations from './Routes/destinations.js';
import clients from './Routes/clients.js';
import admins from './Routes/admins.js';
import blogs from './Routes/blogs.js';
import comments from './Routes/comments.js';
import hotels from './Routes/hotels.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/destinations", destinations);
app.use("/clients", clients);
app.use("/admins", admins);
app.use("/blogs", blogs);
app.use("/comments", comments);
app.use("/hotels", hotels)

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});