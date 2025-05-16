# 📝 Blog App - MERN Stack Project

Một ứng dụng blog hiện đại được xây dựng bằng **ReactJS (frontend)** và **NodeJS (backend)**. Người dùng có thể đăng ký, đăng nhập, bình luận và xem bài viết.

## 🚀 Công nghệ sử dụng

### Frontend:

* [ReactJS](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/) (hoặc Bootstrap nếu dùng)
* [React Query](https://tanstack.com/query/latest) (quản lý state và caching API)
* [SweetAlert2](https://sweetalert2.github.io/) (popup thông báo)

### Backend:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/) + [MySQL](https://www.mysql.com/) (ORM và database)
* [JWT](https://jwt.io/) (Xác thực người dùng)
* [Redis](https://redis.io/) (tuỳ chọn, dùng cho rate limiting, caching hoặc lưu session)
* [Multer](https://github.com/expressjs/multer) (upload ảnh đại diện, ảnh bài viết)
* [dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Cấu trúc thư mục

```
/client               # ReactJS frontend
├── public
├── src
│   ├── components
│   ├── routes
│   ├── libs
│   ├── hooks
│   ├── pages
│   ├── services/api  # Gọi API
│   ├── context       # AuthContext, UserContext
│   └── App.jsx

/api                  # NodeJS backend
├── controllers
├── routes
├── models
├── middlewares
├── config
├── utils
└── app.js
```

## 🔐 Xác thực người dùng

* Đăng ký và đăng nhập bằng JWT.
* Token lưu trong `localStorage`, refresh token lưu ở `HttpOnly Cookie`.
* Middleware kiểm tra token khi truy cập API bảo vệ.

## 🧠 Các chức năng chính

* ✅ Đăng ký, đăng nhập, đăng xuất
* ✅ Đăng bài, chỉnh sửa bài, xoá bài
* ✅ Xem danh sách bài viết theo phân trang
* ✅ Xem chi tiết bài viết
* ✅ Tìm kiếm bài viết
* ✅ Upload ảnh bài viết
* ✅ Hệ thống xác thực bằng token (JWT + refresh token)
* 🔄 Làm mới token tự động nếu token hết hạn
* 📊 Redis dùng để:

  * Rate limiting (chống spam)
  * Cache danh sách bài viết (tăng hiệu năng)
  * Lưu session người dùng (tuỳ chọn)

## ⚙️ Cài đặt & chạy dự án

### Yêu cầu:

* Node.js >= 18
* MySQL
* Redis (tuỳ chọn: cài bằng Docker hoặc cài local)

### 1. Clone project

```bash
git clone https://github.com/buiphamanhthuandev/BlogWebApp.git
cd BlogWebApp
```

### 2. Cài backend

```bash
cd api
npm install
# Tạo file .env và cấu hình
npm run dev
```

### 3. Cài frontend

```bash
cd client
npm install
npm run start
```

### 4. Redis (tuỳ chọn)

```bash
docker run --name blog-redis -p 6379:6379 -d redis
```

## 🌐 API chính

| Method | Endpoint           | Mô tả                    |
| ------ | ------------------ | ------------------------ |
| POST   | /api/auth/register | Đăng ký người dùng       |
| POST   | /api/auth/login    | Đăng nhập                |
| POST   | /api/auth/logout   | Đăng xuất                |
| GET    | /api/user/by-email | Lấy thông tin người dùng |
| GET    | /api/posts         | Danh sách bài viết       |
| POST   | /api/posts         | Tạo bài viết mới         |
| PUT    | /api/posts/\:id    | Cập nhật bài viết        |
| DELETE | /api/posts/\:id    | Xoá bài viết             |

## 📷 Screenshot (tuỳ chọn)

> Thêm hình ảnh nếu muốn thể hiện UI

## ✅ Todo

* [x] Auth (JWT + Refresh token)
* [x] CRUD post
* [x] CRUD danh mục
* [x] CRUD user
* [x] CRUD comment
* [x] CRUD like
* [x] CRUD contact
* [x] CRUD subscribe
* [x] CRUD postlike

* [x] Phân trang post
* [x] Phân trang danh mục
* [x] Phân trang comment
* [x] Phân trang user
* [ ] Like / Bookmark
* [ ] Dashboard admin


## 📌 License

MIT
