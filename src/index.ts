import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

// app.use(helmet());
app.use(cors({
  credentials: true,
  origin: 'ngrok-free.app',
}));

// cookie
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // check cookies
  console.log('Cookies: ', req.cookies);
  const cookies: null | string = req.cookies;
  res.json({ message: 'Hello World', cookies });
});

app.get('/cookies', (req, res) => {
  res.cookie('name', 'express', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }).json({
    message: 'Cookie set',
  });
});

app.get('/clear-cookies', (req, res) => {
  res.clearCookie('name').json({
    message: 'Cookie cleared',
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});