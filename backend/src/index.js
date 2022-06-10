import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

import { PrismaClient } from '@prisma/client';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', async (req, res) => {
  const { page } = req.query;
  try {
    const skip = 10 * (page - 1);

    const data = await prisma.movies.findMany({
      take: 10,
      skip: skip,
      orderBy: {
        Title: 'asc'
      }
    });
    res.send({ success: true, data });
  } catch (e) {
    console.log(e);
    res.send({
      success: false,
      message: 'Error al obtener listado. Intente nuevamente'
    });
  }
});

const main = async () => {
  console.log('Loading Database');
  try {
    const url = `https://www.omdbapi.com/?apikey=5eec5adc&s=love&type=movie&y=2020`;
    let response = await axios.get(url);
    const totpages = Math.round(response.data.totalResults / 10);
    await prisma.$queryRaw`TRUNCATE TABLE Movies;`;
    for (let index = 1; index <= totpages; index++) {
      let response = await axios.get(url + `&page=${index}`);
      const data = await prisma.movies.createMany({
        data: response.data.Search,
        skipDuplicates: true
      });
    }
    console.log('Database Updated');
  } catch (error) {
    console.log(`Sorry!! someting was wrong \nDetails: ${error}`);
  }
};

app.listen(PORT, async () => {
  await main();
  console.log(`Server started on port: ${PORT}`);
});
