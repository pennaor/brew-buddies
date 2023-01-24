const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port);
console.log(`Api rodando na porta ${port}`);
