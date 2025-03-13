import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Ứng dụng Sinh viên</h1>
        <nav className="space-x-4">
          <Link to="/student-info" className="hover:underline">Thông tin SV</Link>
          <Link to="/course-registration" className="hover:underline">Đăng ký môn học</Link>
          <Link to="/transcript" className="hover:underline">Kết quả học tập</Link>
        </nav>
      </header>
      <section className="text-center py-20">
        <h2 className="text-3xl font-semibold text-text">Chào mừng đến với ứng dụng sinh viên!</h2>
      </section>
      <div className="flex justify-center space-x-4">
        <Link to="/student-info">
          <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-700">Xem thông tin</button>
        </Link>
        <Link to="/course-registration">
          <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-700">Đăng ký môn</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;