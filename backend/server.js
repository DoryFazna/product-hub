import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import productRoutes from '../routes/product.route.js';
import path from 'path';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('frontend/vite-project/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'vite-project', 'dist', 'index.html'));
    });
}

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
})

