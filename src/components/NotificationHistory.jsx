import React, { useState, useEffect } from "react";

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return isMobile;
};

// ✅ Notification Component (show 1 on desktop, 3 on mobile)
const NotificationHistory = ({ history }) => {
  const isMobile = useScreenSize();
  const displayed = history?.slice(0, isMobile ? 4 : 3);

  return (
    <div className="space-y-4 mt-4">
      {displayed.length > 0 ? (
        displayed.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {notification.methodType?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-sm capitalize">
                  {notification.narration}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No recent notifications</div>
      )}
    </div>
  );
};

export default NotificationHistory;