import express from 'express';
import UserController from './controllers/user.controller';

const app = express();
const PORT = process.env.PORT ?? 3000;

const userController = new UserController();
app.use('/user', userController.router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
