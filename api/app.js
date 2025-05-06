const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static('public/uploads'));
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-pagination'],
    exposedHeaders: ['x-pagination'], 
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/post', postRoutes);
app.use('/api/postcategory', postcategoryRoutes);
app.use('/api/likepost', likepostRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/comment', commentRoutes);
app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
});