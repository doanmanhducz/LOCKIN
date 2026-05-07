# LOCKIN     

LOCKIN là một personal productivity dashboard được xây để gom tất cả thứ quan trọng trong một workspace duy nhất: portfolio, blog, todo, meal tracking, gym log và Pomodoro. Mục tiêu của project là giúp bạn theo dõi công việc, giữ nhịp tập trung và lưu lại tiến trình phát triển mỗi ngày.

## Tổng Quan

Ứng dụng gồm 2 phần chính:

- Frontend React/Vite để hiển thị dashboard và các module quản lý.
- Backend Express + SQLite để cung cấp API, lưu dữ liệu cục bộ và seed dữ liệu mẫu.

Màn hình chính là một dashboard tối màu, có các khối riêng cho portfolio, blog, todo, meal, gym và Pomodoro. Backend có sẵn dữ liệu demo để bạn mở app lên là dùng được ngay.

## Tính Năng Chính

- Portfolio profile với thông tin cá nhân, kinh nghiệm, kỹ năng, dự án và liên kết mạng xã hội.
- Blog section để ghi chú, phản tư, viết bài ngắn hoặc nhật ký tiến độ.
- Todo management có trạng thái, độ ưu tiên và ngày đến hạn.
- Meal tracking để theo dõi món ăn, calories và ghi chú.
- Gym session tracking để lưu bài tập, số set, số rep và lượng calories đốt.
- Pomodoro tracking để ghi lại các phiên tập trung và thời gian nghỉ.
- REST API tách biệt rõ ràng giữa frontend và backend.
- Docker setup cho môi trường dev nếu không muốn cài Node trực tiếp trên máy.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Recharts.
- Backend: Node.js, Express, better-sqlite3.
- Tooling: npm workspaces, concurrently, Docker Compose.

## Cấu Trúc Thư Mục

```text
LOCKIN/
	frontend/            # React app chạy ở port 3000
		src/
		Dockerfile
		vite.config.js
	backend/             # Express API chạy ở port 5000
		config/
		controllers/
		routes/
		models/
		seed/
		Dockerfile
	docker-compose.yml   # Chạy frontend + backend bằng Docker
	package.json         # Workspace root scripts
	.gitignore
	README.md
```

## Yêu Cầu Cần Có

- Node.js 18+ hoặc 20+.
- npm đi kèm Node.
- Docker Desktop nếu muốn chạy bằng Docker.

## Chạy Dự Án Bằng npm

### 1. Cài dependencies

Tại thư mục gốc của repo:

```bash
npm install
```

Lệnh này sẽ cài dependencies cho root workspace và các package con `frontend`, `backend`.

### 2. Chạy dev mode

```bash
npm run dev
```

Lệnh này chạy đồng thời:

- Frontend tại `http://localhost:3000`
- Backend tại `http://localhost:5000`

### 3. Chạy riêng từng phần

```bash
npm run dev:frontend
npm run dev:backend
```

### 4. Seed dữ liệu mẫu

```bash
npm run seed
```

Backend cũng sẽ tự khởi tạo database và seed dữ liệu cơ bản khi cần, nên bước này là tùy chọn.

## Chạy Bằng Docker

LOCKIN có sẵn cấu hình Docker cho môi trường phát triển. Cách này phù hợp khi bạn muốn chạy toàn bộ app mà không cài Node trực tiếp trên máy.

### Build và chạy

```bash
docker compose build
docker compose up
```

### Dừng container

```bash
docker compose down
```

### Ghi chú Docker

- Backend expose ở `http://localhost:5000`.
- Frontend expose ở `http://localhost:3000`.
- Compose đang mount source code local để hỗ trợ hot reload.
- Frontend có thể nhận backend URL qua biến `VITE_BACKEND_URL`.

## Scripts Chính

Ở root project:

- `npm run dev`: chạy frontend và backend cùng lúc.
- `npm run dev:frontend`: chạy riêng frontend.
- `npm run dev:backend`: chạy riêng backend.
- `npm run seed`: seed dữ liệu mẫu cho backend.

Ở frontend:

- `npm run dev`: chạy Vite dev server.
- `npm run build`: build production.
- `npm run preview`: preview bản build.

Ở backend:

- `npm run dev`: chạy server với `node --watch`.
- `npm run start`: chạy server production mode.
- `npm run seed`: seed database.

## API Chính

### Health check

```bash
GET /api/health
```

Response mẫu:

```json
{
	"success": true,
	"message": "LOCKIN backend is running"
}
```

### Nhóm endpoint hiện có

- `/api/portfolio`
- `/api/blogs`
- `/api/todos`
- `/api/meals`
- `/api/gym`
- `/api/pomodoro`

## Luồng Hoạt Động

1. Frontend gọi API qua đường dẫn `/api`.
2. Vite proxy chuyển request sang backend chạy ở port 5000.
3. Backend đọc/ghi dữ liệu qua SQLite.
4. Dữ liệu demo được seed để dashboard có nội dung ngay từ lần chạy đầu tiên.

## Phát Triển Tiếp

Một số hướng mở rộng hợp lý cho LOCKIN:

- Thêm auth và user riêng biệt.
- Lưu nhiều profile / nhiều workspace cá nhân.
- Dashboard statistics sâu hơn cho todo, meal và gym.
- Export dữ liệu ra JSON/CSV.
- Đồng bộ dữ liệu lên cloud hoặc database server.

## Trạng Thái Dự Án

Project hiện đang ở giai đoạn MVP nhưng đã đủ để chạy local, seed dữ liệu và thao tác trên các module chính.

