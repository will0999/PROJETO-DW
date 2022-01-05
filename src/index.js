const express = require('express')
const si = require('systeminformation');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Auth = require('./middlewares/auth.js');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();




(async () => {

  //INFORMAÇÔES DA CPU
  const cpu = (await si.cpu()).manufacturer + (await si.cpu()).brand;

  //INFORMAÇÕES DA MEMÓRIA RAM
  const memories = []
  const memories_info = await si.memLayout()
  for  (const memory of memories_info) {
    const { manufacturer, type, size } = memory
    memories.push({ manufacturer, type, size })
  }

  //INFORMAÇÕES DO DISCO
  const disks = []
  const disks_info = await si.diskLayout()
  for  (const disco of disks_info) {
    const { type, name, size } = disco
    disks.push({ type, name, size })
  }

  //INFORMAÇÕES DA GPU
  const gpu_n = (await si.graphics()).controllers[0].model;
  const gpu_vram = (await si.graphics()).controllers[0].vram;
  const gpu = gpu_n + " | VRAM: " + gpu_vram + " MB"

  const hardware = [
      {
        cpu: cpu,
        ram: memories,
        disk: disks,
        gpu: gpu,
      }
  ];

  app.use(express.static('public'));
  app.use(express.json());
  

  app.get('/', (req, res) => res.redirect('/signin.html'));

  app.get('/hardware', Auth.isAuthenticated, (req, res) => {
    res.json(hardware);
  });

  app.get('/users', async (req, res) => {
    const users = await User.readAll();
  
    res.json(users);
  });

  app.post('/signup', async (req, res) => {
    const user = req.body;

    const newUser = await User.create(user);

    res.json(newUser);
  });

  app.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    console.log(email)
  
    const { id: userId, password: hash } = await User.readByEmail(email);
  
  
    const match = await bcrypt.compare(password, hash);
  
    if (match) {
      const token = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: 300 // 5min
    });
  
    res.json({ auth: true, token });
  
    };
  });

  app.listen(3000, () => console.log('Server is running'));

})();

