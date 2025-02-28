const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { CuentaDetalle } = require('./models')();
const auth = require('./middlewares/auth');
const router = require('./routes');

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 443;

app.use(auth);
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  return res.send({
    app: 'ContabilidadAPI',
    version: '1.0.0',
  });
});

app.use('/', router);

app.get('/cuentas-detalle', async (req, res) => {
  const include = [];
  const { cliente = 0 } = req.query;

  if (cliente) {
    include.push('cliente');
  }

  const detalles = await CuentaDetalle.findAll({
    include,
  });

  return res.send(detalles);
});

app.use((req, res) => {
  return res.status(404).send({
    msg: 'Ruta no encontrada.',
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).send({
    msg: 'Error interno del servidor.',
  });
});

server.listen(port, () => {
  console.log(`Servidor inicializado en el puerto: ${port}`);
});
