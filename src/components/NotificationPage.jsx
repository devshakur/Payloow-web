


import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import DashboardLayout from './Dashboard/DashboardLayout';
import useBills from '../hooks/useBills';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // ✅ This is the fix!


const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 size={20} className="text-green-500" />;
    case 'failed':
      return <XCircle size={20} className="text-red-500" />;
    case 'pending':
      return <Loader2 size={20} className="text-yellow-500 animate-spin" />;
    default:
      return <AlertCircle size={20} className="text-gray-400" />;
  }
};

const ITEMS_PER_PAGE = 5;

const NotificationPage = () => {
  const { UserTransactions } = useBills();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tooltipId, setTooltipId] = useState(null);

  const getUserTransaction = async () => {
    try {
      const resp = await UserTransactions();
      const data = resp.data?.data || [];
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to fetch user transactions');
    }
  };

  useEffect(() => {
    getUserTransaction();
  }, []);

  const paginatedData = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="flex items-center gap-3 mb-8">
          <Bell size={26} className="text-[#2E90FA] dark:text-blue-950" />
          <h2 className="text-2xl font-bold text-[#101828]">Notification</h2>
        </div>

        <div className="space-y-4">
          {paginatedData.map((note, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => setTooltipId(tooltipId === index ? null : index)}
            >
              <div className="p-3 bg-gray-100 dark:bg-slate-700 rounded-full">
                {getStatusIcon(note.status)}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 dark:text-white capitalize">
                  {note.narration || 'No Title'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  {note.merchant?.toUpperCase() || 'Unknown Merchant'} —{' '}
                  <span className="capitalize">{note.status}</span>
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400">
                {dayjs(note.createdAt).fromNow()}
              </span>

              {/* Tooltip for full details */}
              {tooltipId === index && (
                <div className="absolute z-10 top-full mt-2 right-0 bg-white dark:bg-slate-800 p-4 rounded-md shadow-md border text-sm w-[300px]">
                  <div><strong>Merchant:</strong> {note.merchant}</div>
                  <div><strong>Status:</strong> {note.status}</div>
                  <div><strong>Type:</strong> {note.type}</div>
                  <div><strong>Method:</strong> {note.methodType}</div>
                  <div><strong>Amount:</strong> ₦{note.amount}</div>
                  <div><strong>Narration:</strong> {note.narration}</div>
                  <div><strong>Ref:</strong> {note.reference}</div>
                  <div><strong>Date:</strong> {dayjs(note.createdAt).format('MMM D, YYYY h:mm A')}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 text-sm font-medium bg-white border rounded shadow hover:bg-gray-50 disabled:opacity-50"
            >
              Prev
            </button>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 text-sm font-medium bg-white border rounded shadow hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationPage;
