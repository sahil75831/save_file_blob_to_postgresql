const express = require('express');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const cors = require('cors')
app.use(cors())

app.use(express.json());

app.post('/upload', async (req, res) => {
  try {
 
    if (!req.body || !req.body.fileData) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    const base64Data = req.body.fileData.replace(/^data:image\/png;base64,/, '');


    const fileName = `file_${Date.now()}.png`;


    const savedFile = await prisma.fileBlob.create({
        data: {
          name: fileName,
          blobData: Buffer.from(base64Data, 'base64'), // Convert base64 data to buffer
        }
      });

    res.status(201).json(savedFile);
  } catch (error) {
    console.error('Error uploading file: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-image/:id', async (req, res) => {
    try {
      const fileId = parseInt(req.params.id);
      const file = await prisma.fileBlob.findUnique({
        where: { id: fileId },
      });
  
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      res.set('Content-Type', 'image/png');
      res.send(file.blobData);
    } catch (error) {
      console.error('Error fetching image: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
