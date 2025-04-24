const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRouter');
const categoryRoutes = require('./routes/categoryRouter');
const postRoutes = require('./routes/postRouter');
const postcategoryRoutes = require('./routes/postcategoryRouter');
const likepostRoutes = require('./routes/likeRouter');
const bookmarkRoutes = require('./routes/bookmarkRouter');
const commentRoutes = require('./routes/commentRouter');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/category',categoryRoutes);
app.use('/post', postRoutes);
app.use('/postcategory', postcategoryRoutes);
app.use('/likepost', likepostRoutes);
app.use('/bookmark', bookmarkRoutes);
app.use('/comment', commentRoutes);
app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
});