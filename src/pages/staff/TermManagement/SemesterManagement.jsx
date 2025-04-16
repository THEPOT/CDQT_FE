// src/components/TermManagement/SemesterManagement.jsx
import { useState, useEffect } from "react";
import { getSemestersAPI, createSemesterAPI } from "../../../apis/termAPI";
import { IoCalendarOutline, IoSchoolOutline } from "react-icons/io5";
import { BsBookmarkCheck } from "react-icons/bs";
import ReactPaginate from "react-paginate";

function SemesterManagement() {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    academicYear: "",
    status: "Planning",
  });
  const [semesters, setSemesters] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    fetchSemesters();
  }, [page, size]);

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await getSemestersAPI(page, size);

      // Assuming the API returns data in this structure: { items: [...], totalItems: 100, totalPages: 10 }
      // Adjust according to your actual API response structure
      if (response.data) {
        if (Array.isArray(response.data.items)) {
          setSemesters(response.data.items);
          setTotalItems(response.data.totalItems || 0);
          setTotalPages(response.data.totalPages || 1);
        } else if (Array.isArray(response.data)) {
          // Fallback if API returns just an array
          setSemesters(response.data);
          // Estimate total pages based on the size of the returned array
          setTotalPages(Math.ceil(response.data.length / size));
        }
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedItem) => {
    // React Paginate trả về index bắt đầu từ 0
    setPage(selectedItem.selected + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSemesterAPI(formData);
      fetchSemesters();
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        academicYear: "",
        status: "Planning",
      });
    } catch (error) {
      console.error("Error creating semester:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-blue-100 text-green-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Danh sách kỳ học</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên kỳ học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Năm học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : semesters.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Chưa có kỳ học nào được tạo
                  </td>
                </tr>
              ) : (
                semesters.map((semester) => (
                  <tr key={semester.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {semester.semesterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {semester.academicYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(semester.startDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(semester.endDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          semester.status
                        )}`}
                      >
                        {semester.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        {/* React Paginate - Phân trang ngắn gọn hơn */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị{" "}
                <span className="font-medium">
                  {semesters.length > 0 ? (page - 1) * size + 1 : 0}
                </span>{" "}
                đến{" "}
                <span className="font-medium">
                  {Math.min(page * size, totalItems)}
                </span>{" "}
                trong số <span className="font-medium">{totalItems}</span> kỳ
                học
              </p>
            </div>

            <ReactPaginate
              previousLabel={<span className="w-full text-center">←</span>}
              nextLabel={<span className="w-full text-center">→</span>}
              breakLabel={<span className="w-full text-center">...</span>}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"flex items-center justify-center gap-1"}
              pageClassName={
                "w-10 h-10 flex items-center justify-center border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
              }
              previousClassName={
                "w-10 h-10 flex items-center justify-center border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md"
              }
              nextClassName={
                "w-10 h-10 flex items-center justify-center border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md"
              }
              breakClassName={
                "w-10 h-10 flex items-center justify-center border border-gray-300 text-sm font-medium text-gray-700"
              }
              activeClassName={
                "bg-blue-50 border-blue-500 text-blue-600 z-10"
              }
              disabledClassName={
                "opacity-50 cursor-not-allowed"
              }
              forcePage={page - 1} // ReactPaginate sử dụng index bắt đầu từ 0
            />
          </div>
        </div>
      </div>

      {/* Phần tạo kỳ học mới */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <BsBookmarkCheck className="mr-2" size={20} />
            Tạo kỳ học mới
          </h2>
          <p className="mt-1 text-blue-100 text-sm">
            Điền đầy đủ thông tin để tạo kỳ học mới
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên kỳ học */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoSchoolOutline className="mr-1" size={16} />
                Tên kỳ học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-white border ${
                  formError.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                placeholder="Ví dụ: Học kỳ 1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {formError.name && (
                <p className="mt-1 text-sm text-red-500">{formError.name}</p>
              )}
            </div>

            {/* Năm học */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoCalendarOutline className="mr-1" size={16} />
                Năm học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-white border ${
                  formError.academicYear ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                placeholder="Ví dụ: 2024-2025"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
              />
              {formError.academicYear && (
                <p className="mt-1 text-sm text-red-500">
                  {formError.academicYear}
                </p>
              )}
            </div>

            {/* Ngày bắt đầu */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoCalendarOutline className="mr-1" size={16} />
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-white border ${
                  formError.startDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
              {formError.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {formError.startDate}
                </p>
              )}
            </div>

            {/* Ngày kết thúc */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoCalendarOutline className="mr-1" size={16} />
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-white border ${
                  formError.endDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              {formError.endDate && (
                <p className="mt-1 text-sm text-red-500">{formError.endDate}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <BsBookmarkCheck className="mr-1" size={16} />
                Trạng thái
              </label>
              <div className="flex flex-wrap gap-4">
                {["Planning", "Active", "Completed"].map((status) => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={() => setFormData({ ...formData, status })}
                    />
                    <span className="ml-2 text-gray-700">
                      {status === "Planning" && "Đang lên kế hoạch"}
                      {status === "Active" && "Đang hoạt động"}
                      {status === "Completed" && "Đã hoàn thành"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Nút tạo kỳ học */}
          <div className="mt-6 flex items-center justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-3 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                setFormData({
                  name: "",
                  startDate: "",
                  endDate: "",
                  academicYear: "",
                  status: "Planning",
                });
                setFormError({});
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Tạo kỳ học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SemesterManagement;
