import express from 'express';

const app = express();
const tweets = [];

// MongoDB

app.get('/api/users', (req, res) => {
  res.send([
    {
      name: 'admin',
      email: 'admin@example.com',
      password: '123',
      isAdmin: true,
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: '123',
      isAdmin: false,
    },
  ]);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('server is ready at http://localhost:5000');
});
