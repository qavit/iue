// 初始化 MongoDB 資料庫
// 這個腳本會在 MongoDB 容器啟動時自動執行

// 建立管理員使用者
db = db.getSiblingDB('admin');
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

// 建立應用程式資料庫
const dbName = process.env.MONGO_INITDB_DATABASE || 'iue';
const username = process.env.MONGO_USERNAME || 'iue';
const password = process.env.MONGO_PASSWORD || 'iue123';

// 建立資料庫使用者
db = db.getSiblingDB(dbName);

db.createUser({
  user: username,
  pwd: password,
  roles: [
    { role: 'readWrite', db: dbName },
    { role: 'dbAdmin', db: dbName }
  ]
});

// 建立索引
db.entries.createIndex({ term: 'text', definitions: 'text' });
db.entries.createIndex({ lang: 1, dialect: 1 });

print('MongoDB 初始化完成');
