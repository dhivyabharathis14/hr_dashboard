type Announcement = {
  id: number;
  author: string;
  message: string;
  timestamp: string;
};

const AnnouncementsFeed = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full md:w-1/2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Announcements
      </h2>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {announcements.map((item) => (
          <div key={item.id} className="border rounded p-3 bg-gray-50">
            <div className="text-gray-800 text-sm">{item.message}</div>
            <div className="text-xs text-gray-500 mt-1">
              By {item.author} • {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsFeed;
