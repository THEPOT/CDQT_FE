import React from 'react';

function ScholarshipInfo({ data }) {
  return (
    <div className="space-y-4">
      {data.scholarships?.length > 0 ? (
        data.scholarships.map((scholarship, index) => (
          <div key={index} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-lg">{scholarship.name}</h3>
              <p className="text-gray-600">{scholarship.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium text-primary">
                  Số tiền: {scholarship.amount.toLocaleString('vi-VN')} VNĐ
                </span>
                <span className="text-sm text-gray-500">
                  Ngày cấp: {new Date(scholarship.dateAwarded).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          Không có thông tin học bổng
        </div>
      )}
    </div>
  );
}

export default ScholarshipInfo; 