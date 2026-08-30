# AGENTS.md

## Workflow rules (bắt buộc)

- Sau khi hoàn thành bất kỳ thay đổi/ chỉnh sửa code hoặc nội dung nào, **bắt buộc** chạy `npm run check` (nếu có) và `npm test -- --run`, đảm bảo không lỗi.
- Sau khi kiểm tra xong, **tự động commit** với message mô tả rõ thay đổi và **push** lên `main` ngay, để chủ repo review được.
- Không chờ xác nhận trước khi commit/push trừ khi người dùng yêu cầu khác.
- Không commit các file tạm, file lớn không liên quan (ví dụ `CV_*.pdf`, `kdj-*.png` không có trong yêu cầu) trừ khi được yêu cầu rõ ràng.

## Project

- Astro static site, GitHub Pages deploy qua GitHub Actions.
- Base path: `/LOCKIN` (dùng `sitePath()` cho mọi route nội bộ).
- Nội dung bài viết: Markdown trong `src/content/posts/` và `src/content/research/`.
- CVE tracking: `src/data/cves.ts`.
- Config cá nhân: `src/config/site.ts`.