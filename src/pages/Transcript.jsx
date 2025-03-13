import React from 'react';

function Transcript() {
  const grades = [
    { semester: 'Kỳ 1', code: 'T01', name: 'Toán', score: 8.5 },
    { semester: 'Kỳ 1', code: 'L01', name: 'Lý', score: 7.0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold">Nguyễn Văn A - MSSV: 123456</h1>
      </header>
      <div className="p-4">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-text">
              <th className="p-2">Kỳ học</th>
              <th className="p-2">Mã môn</th>
              <th className="p-2">Tên môn</th>
              <th className="p-2">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{grade.semester}</td>
                <td className="p-2">{grade.code}</td>
                <td className="p-2">{grade.name}</td>
                <td className="p-2">{grade.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-700">
          Tải bảng điểm
        </button>
      </div>
    </div>
  );
}

export default Transcript;