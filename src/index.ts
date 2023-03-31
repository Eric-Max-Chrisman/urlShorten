import './config';
import 'express-async-errors';
import express, { Express } from 'express';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import {
  registerUser,
  logIn,
  // getUserProfileData,
  getAllUserProfiles,
  // resetProfileViews,
  updateUserUsername,
  getUserByUsername,
} from './controllers/UserController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.post('/api/users', registerUser); // Create an account
app.post('/api/login', logIn); // Log in to an account
// app.post('/api/users/profileViews/reset', resetProfileViews); // Log in to an account

app.get('/api/allusers', getAllUserProfiles);
app.post('/api/:username/user', getUserByUsername);
// app.get('/api/users/:targetUserId', getUserProfileData);
app.post('/api/users/:targetUserId/username', updateUserUsername);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
