import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/itdevices': 'http://localhost:3000' /*
      
     sử dụng proxy trong môi trường phát triển (development).
    Khi bạn đang phát triển một ứng dụng web sử dụng React (hoặc bất kỳ front-end framework nào) kết hợp với một API back-end, bạn thường sẽ chạy front-end và back-end trên các cổng khác nhau của localhost. Ví dụ:

    Front-end (React app): http://localhost:5173
    Back-end (Express server): http://localhost:3000

    Điều này có thể gây ra vấn đề CORS (Cross-Origin Resource Sharing) khi front-end cố gắng gửi yêu cầu đến back-end, vì trình duyệt coi đây là hai nguồn (origins) khác nhau.
    Để giải quyết vấn đề này trong quá trình phát triển, chúng ta có thể sử dụng một proxy. Proxy này sẽ chuyển tiếp các yêu cầu từ front-end đến back-end một cách "trong suốt", giúp tránh các vấn đề CORS.
          */
    }
  }
})
