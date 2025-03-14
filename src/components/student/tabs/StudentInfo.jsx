import React from 'react';

function StudentInfo({ data }) {
  const fields = [
    { label: 'Mã số sinh viên', value: data.studentId },
    { label: 'Họ và tên', value: data.fullName },
    { label: 'Email', value: data.email },
    { label: 'Ngày sinh', value: data.birthDate },
    { label: 'Địa chỉ', value: data.address },
    { label: 'Số điện thoại', value: data.phone },
    { label: 'Ngày nhập học', value: data.admissionDate },
    { label: 'Trạng thái', value: data.status }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.label} className="form-control">
          <label className="label">
            <span className="label-text font-medium">{field.label}</span>
          </label>
          <input
            type="text"
            value={field.value}
            readOnly
            className="input input-bordered bg-gray-50"
          />
        </div>
      ))}
    </div>
  );
}

export default StudentInfo; 