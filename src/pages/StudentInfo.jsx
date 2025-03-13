import React, { useState } from 'react';

function StudentInfo() {
  const [tab, setTab] = useState('personal');

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold">Nguyễn Văn A - MSSV: 123456</h1>
      </header>
      <div className="flex justify-start space-x-4 p-4 bg-white shadow-md">
        <button
          onClick={() => setTab('personal')}
          className={`px-4 py-2 ${tab === 'personal' ? 'bg-primary text-white' : 'bg-gray-200 text-text'} rounded-lg`}
        >
          Thông tin cá nhân
        </button>
        <button
          onClick={() => setTab('scholarship')}
          className={`px-4 py-2 ${tab === 'scholarship' ? 'bg-primary text-white' : 'bg-gray-200 text-text'} rounded-lg`}
        >
          Học bổng
        </button>
      </div>
      <div className="p-4 bg-white shadow-md mt-4">
        {tab === 'personal' && (
          <div>
            <p className="text-lg">Họ tên: Nguyễn Văn A</p>
            <p className="text-lg">Ngày sinh: 01/01/2000</p>
          </div>
        )}
        {tab === 'scholarship' && <p className="text-lg">Học bổng: Chưa có</p>}
      </div>
    </div>
  );
}

export default StudentInfo;