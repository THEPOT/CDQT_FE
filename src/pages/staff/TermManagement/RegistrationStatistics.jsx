// src/components/TermManagement/RegistrationStatistics.jsx
import { useState, useEffect } from 'react';
import { getSemestersAPI } from '../../../apis/termAPI';
import { getTermAnalyticsSummaryAPI, getTermSummariesAPI, getCourseRegistrationStatsAPI, getProgramRegistrationStatsAPI } from '../../../apis/analyticsAPI';
import OverviewCards from './RegistrationStatistics/OverviewCards';
import ProgramStatistics from './RegistrationStatistics/ProgramStatistics';
import CourseStatistics from './RegistrationStatistics/CourseStatistics';

function RegistrationStatistics() {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [statistics, setStatistics] = useState({ analytics: null, termSummary: null, courseStats: null, programStats: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await getSemestersAPI();
        setSemesters(response.data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (selectedTerm) fetchStatistics();
  }, [selectedTerm]);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const [analytics, termSummary, courseStats, programStats] = await Promise.all([
        getTermAnalyticsSummaryAPI(selectedTerm),
        getTermSummariesAPI(),
        getCourseRegistrationStatsAPI(selectedTerm),
        getProgramRegistrationStatsAPI(selectedTerm),
      ]);
      setStatistics({
        analytics: analytics.data,
        termSummary: termSummary.data,
        courseStats: courseStats.data,
        programStats: programStats.data,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn kỳ học</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Chọn kỳ học</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : selectedTerm && statistics.analytics ? (
        <>
          <OverviewCards analytics={statistics.analytics} />
          <ProgramStatistics programStats={statistics.programStats} />
          <CourseStatistics courseStats={statistics.courseStats} />
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có dữ liệu</h3>
          <p className="mt-1 text-sm text-gray-500">Vui lòng chọn kỳ học để xem thống kê</p>
        </div>
      )}
    </div>
  );
}

export default RegistrationStatistics;