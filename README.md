# expense-tracker 記帳 web app

使用 Node.js + Express + MySQL 完成，使用者可以註冊帳號、登入，並查看、新增、編輯或刪除專屬該用戶的收支清單

## 專案內主要使用的技術

- 將 routes 跟 controller 分離
- 使用 bcrypt 加鹽雜湊使用者密碼
- 種子假資料使用 faker 生成 name
- 使用 passport 進行登入者資料比對與登入後驗證
- 分類的圖示資料直接寫入在種子檔 category 中

## 主要功能 features

1. 註冊帳號：註冊之後，可以登入/登出
2. 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
3. 在首頁一次瀏覽所有支出的清單
4. 使用者只能看到自己建立的資料
5. 在首頁看到所有支出清單的總金額
6. 新增一筆支出 (資料屬性參見下方規格說明)
7. 編輯支出的屬性 (一次只能編輯一筆)
8. 刪除任何一筆支出 (一次只能刪除一筆)
9. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 截圖

![image](https://github.com/jiang-dengyu/expense-tracker/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-03-28%20140042.png)
![image](https://github.com/jiang-dengyu/expense-tracker/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-03-28%20140053.png)
![image](https://github.com/jiang-dengyu/expense-tracker/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-03-28%20140105.png)
![image](https://github.com/jiang-dengyu/expense-tracker/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-03-28%20140243.png)
![image](https://github.com/jiang-dengyu/expense-tracker/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-03-28%20140251.png)

## 環境設置

- Node.js
- nodemon
- Express @4.16.4
- Bootstrap @5.1.3
- mysql@3.2.0
- sequelize@6.30.0
- sequelize-cli@6.6.0

## Installation and execution - 安裝與執行步驟

1. 先將此專案 Clone 到本地電腦:

```
git clone https://github.com/jiang-dengyu/expense-tracker
```

2. 開啟終端機(Terminal)(windows 需用 cmd, shell 似乎不能)，進入此專案的資料夾

```
cd expense-tracker
```

3. 使用 npm install指令，安裝 package.json 當中顯示的套件

```
npm install
```

4. 設置.env 檔
   修改 `.env.example` 成 .env，並將內容改成您的資訊

5. 匯入種子檔案

```
npm run seed
```

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動

> Example app listening on port 3000!
