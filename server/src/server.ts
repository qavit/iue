import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 中介軟體
app.use(cors());
app.use(express.json());

// 測試路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IUE 後端服務運行中' });
});

// 連接 MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI 未設定');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 連接成功');
  } catch (error) {
    console.error('MongoDB 連接失敗:', error);
    process.exit(1);
  }
};

// 啟動伺服器
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`伺服器運行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('啟動伺服器時發生錯誤:', error);
    process.exit(1);
  }
};

startServer();