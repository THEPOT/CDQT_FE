import { useState, useEffect } from "react";
import {
  getSemestersAPI,
  getRegistrationPeriodsAPI,
  createRegistrationPeriodAPI,
} from "../../../apis/termAPI";
import RegistrationPeriodStatus from "./RegistrationPeriodStatus";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoSchoolOutline,
  IoBookOutline,
} from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import ReactPaginate from "react-paginate";

function RegistrationPeriodManagement() {
  const [semesters, setSemesters] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [registrationPeriods, setRegistrationPeriods] = useState([]);
  const [formData, setFormData] = useState({
    semesterId: "",
    maxCredits: 25,
    startDate: "",
    endDate: "",
  });
  const [formError, setFormError] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await getRegistrationPeriodsAPI();
        setRegistrationPeriods(response.data);
      } catch (error) {
        console.error("Error fetching registration periods:", error);
      }
    };

    fetchPeriods();
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      setIsLoading(true);
      try {
        const response = await getSemestersAPI(page, size);
        setSemesters(response.data.items);
        setTotalItems(response.data.totalItems || 0);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSemesters();
  }, [page, size]);

  const handlePageChange = (selectedItem) => {
    // React Paginate trả về index bắt đầu từ 0
    setPage(selectedItem.selected + 1);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.semesterId) {
      errors.semesterId = "Vui lòng chọn kỳ học";
    }

    if (!formData.maxCredits || formData.maxCredits < 1) {
      errors.maxCredits = "Số tín chỉ tối đa phải lớn hơn 0";
    }

    if (!formData.startDate) {
      errors.startDate = "Vui lòng chọn ngày bắt đầu";
    }

    if (!formData.endDate) {
      errors.endDate = "Vui lòng chọn ngày kết thúc";
    } else if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      errors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await createRegistrationPeriodAPI(formData);
      const updatedPeriods = await getRegistrationPeriodsAPI();
      setRegistrationPeriods(updatedPeriods.data);
      setFormData({
        semesterId: "",
        maxCredits: 25,
        startDate: "",
        endDate: "",
      });
      // Hiển thị thông báo thành công
      alert("Tạo đợt đăng ký thành công!");
    } catch (error) {
      console.error("Error creating registration period:", error);
      alert("Đã xảy ra lỗi khi tạo đợt đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) =>
    date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  const formatTime = (date) =>
    date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const getStatusText = (status) => {
    switch (status) {
      case "OPEN":
        return "Mở cổng đăng ký";
      case "CLOSED":
        return "Đóng cổng đăng ký";
      case "MAINTENANCE":
        return "Bảo trì hệ thống";
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-red-100 text-red-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'text-success';
      case 'CLOSED': return 'text-error';
      case 'UPCOMING': return 'text-warning';
      case 'MAINTENANCE': return 'text-info';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Phần chọn đợt đăng ký */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <BsClockHistory className="mr-2" size={20} />
            Quản lý đợt đăng ký học phần
          </h2>
          <p className="mt-1 text-indigo-100 text-sm">
            Chọn đợt đăng ký để xem chi tiết hoặc tạo đợt đăng ký mới
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <IoCalendarOutline className="mr-1" size={16} />
              Chọn đợt đăng ký
            </label>

            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
              </div>
            ) : registrationPeriods.length === 0 ? (
              <div className="text-gray-500 p-4 bg-gray-50 rounded-md">
                Chưa có đợt đăng ký nào được tạo
              </div>
            ) : (
              <div className="relative">
                <select
                  className="block w-full px-4 py-3 pr-8 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={selectedPeriod || ""}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="">-- Chọn đợt đăng ký --</option>
                  {registrationPeriods.map((period) => {
                    const startDate = new Date(period.startDate);
                    const endDate = new Date(period.endDate);
                    return (
                      <option key={period.id} value={period.id}>
                        {period.semesterName} ({formatDate(startDate)}{" "}
                        {formatTime(startDate)} - {formatDate(endDate)}{" "}
                        {formatTime(endDate)}) - Tối đa {period.maxCredits} tín
                        chỉ
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Hiển thị danh sách đợt đăng ký dưới dạng card */}
          {registrationPeriods.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Tất cả đợt đăng ký
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registrationPeriods.map((period) => {
                  const startDate = new Date(period.startDate);
                  const endDate = new Date(period.endDate);
                  return (
                    <div
                      key={period.id}
                      className={`p-4 border rounded-lg cursor-pointer transition duration-150 ${
                        selectedPeriod === period.id
                          ? "border-indigo-500 bg-indigo-50 shadow"
                          : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedPeriod(period.id)}
                    >
                      <div className="font-medium text-gray-800 mb-2">
                        {period.semesterName}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mb-1">
                        <IoCalendarOutline className="mr-1" size={14} />
                        {formatDate(startDate)} - {formatDate(endDate)}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mb-2">
                        <IoTimeOutline className="mr-1" size={14} />
                        {formatTime(startDate)} - {formatTime(endDate)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center text-gray-600">
                          <IoBookOutline className="mr-1" size={14} />
                          Tối đa {period.maxCredits} tín chỉ
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                            period.status
                          )}`}
                        >
                          {getStatusText(period.status)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPeriod && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Chi tiết đợt đăng ký
              </h3>
              <RegistrationPeriodStatus periodId={selectedPeriod} />
            </div>
          )}
        </div>

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
              activeClassName={"bg-blue-50 border-blue-500 text-blue-600 z-10"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
              forcePage={page - 1} // ReactPaginate sử dụng index bắt đầu từ 0
            />
          </div>
        </div>
      </div>

      {/* Phần tạo đợt đăng ký mới */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-green-600 p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <IoCalendarOutline className="mr-2" size={20} />
            Tạo đợt đăng ký môn học mới
          </h2>
          <p className="mt-1 text-green-100 text-sm">
            Điền đầy đủ thông tin để tạo đợt đăng ký môn học mới
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kỳ học */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoSchoolOutline className="mr-1" size={16} />
                Kỳ học <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                    formError.semesterId ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                  value={formData.semesterId}
                  onChange={(e) =>
                    setFormData({ ...formData, semesterId: e.target.value })
                  }
                >
                  <option value="">-- Chọn kỳ học --</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.semesterName}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {formError.semesterId && (
                <p className="mt-1 text-sm text-red-500">
                  {formError.semesterId}
                </p>
              )}
            </div>

            {/* Số tín chỉ tối đa */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <IoBookOutline className="mr-1" size={16} />
                Số tín chỉ tối đa <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                  formError.maxCredits ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                value={formData.maxCredits}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxCredits: parseInt(e.target.value) || "",
                  })
                }
                min="1"
                placeholder="Nhập số tín chỉ tối đa"
              />
              {formError.maxCredits && (
                <p className="mt-1 text-sm text-red-500">
                  {formError.maxCredits}
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
                type="datetime-local"
                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                  formError.startDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
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
                type="datetime-local"
                className={`block w-full px-4 py-2 text-gray-700 bg-white border ${
                  formError.endDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              {formError.endDate && (
                <p className="mt-1 text-sm text-red-500">{formError.endDate}</p>
              )}
            </div>
          </div>

          {/* Nút tạo đợt đăng ký */}
          <div className="mt-6 flex items-center justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-3 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={() => {
                setFormData({
                  semesterId: "",
                  maxCredits: 25,
                  startDate: "",
                  endDate: "",
                });
                setFormError({});
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                <>
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
                  Tạo đợt đăng ký
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPeriodManagement;
