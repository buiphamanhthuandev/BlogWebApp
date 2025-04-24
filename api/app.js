const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRouter');
const categoryRoutes = require('./routes/categoryRouter');
const postRoutes = require('./routes/postRouter');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/category',categoryRoutes);
app.use('/post', postRoutes);
app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
});