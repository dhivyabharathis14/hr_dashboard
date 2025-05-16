import { useState, useEffect } from "react";
import { Bell, ChevronDown, ChevronUp, Calendar, User } from "lucide-react";
import { RootState } from "~/store";
import { useSelector } from "react-redux";

interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  companyId: string;
  important: boolean;
}

interface AnnouncementsFeedProps {
  isAdmin?: boolean;
}

const fetchAnnouncements = async (
  companyId: string
): Promise<Announcement[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "1",
      title: "Office Closure Notice",
      content:
        "The office will be closed on May 25th for maintenance. All employees are requested to work from home.",
      timestamp: "2025-05-14T09:30:00Z",
      author: {
        id: "101",
        name: "Jennifer Maxwell",
        role: "HR Director",
        avatar: undefined,
      },
      companyId: "companyA",
      important: true,
    },
    {
      id: "2",
      title: "New Health Benefits",
      content:
        "We are excited to announce our new health benefits package starting next month. Please check your email for details.",
      timestamp: "2025-05-12T14:15:00Z",
      author: {
        id: "102",
        name: "Robert Chen",
        role: "Benefits Manager",
        avatar: undefined,
      },
      companyId: "companyA",
      important: false,
    },
    {
      id: "3",
      title: "Quarterly Review Schedule",
      content:
        "The Q2 performance reviews will begin on June 1st. Please prepare your self-assessment by May 28th.",
      timestamp: "2025-05-10T11:45:00Z",
      author: {
        id: "103",
        name: "Sarah Johnson",
        role: "Team Lead",
        avatar: undefined,
      },
      companyId: "companyA",
      important: false,
    },
    {
      id: "4",
      title: "Office Expansion",
      content:
        "We are pleased to announce that we will be expanding our workspace to the 4th floor starting July 1st.",
      timestamp: "2025-05-08T16:20:00Z",
      author: {
        id: "104",
        name: "Michael Tran",
        role: "Facilities Manager",
        avatar: undefined,
      },
      companyId: "companyA",
      important: false,
    },
  ].filter((announcement) => announcement.companyId === companyId);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const AnnouncementCard = ({
  announcement,
  expanded,
  onToggle,
}: {
  announcement: Announcement;
  expanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm mb-4 overflow-hidden border-l-4 ${
        announcement.important ? "border-red-500" : "border-blue-500"
      }`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-gray-800">
            {announcement.important && (
              <span className="inline-block mr-2 text-red-500">•</span>
            )}
            {announcement.title}
          </h3>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(announcement.timestamp)}</span>
          <span className="mx-2">•</span>
          <User size={14} className="mr-1" />
          <span>{announcement.author.name}</span>
          <span className="ml-1 text-gray-400">
            ({announcement.author.role})
          </span>
        </div>

        {expanded && (
          <div className="mt-3 text-gray-700">
            <p>{announcement.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Renders the announcements feed based on user role.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isAdmin - Whether the user is an admin.
 * @returns {JSX.Element} The announcement feed component.
 */
const AnnouncementsFeed = ({ isAdmin = false }: AnnouncementsFeedProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const { selectedCompany } = useSelector((state: RootState) => state.company);
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await fetchAnnouncements(selectedCompany);
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        setError("Failed to load announcements. Please try again later.");
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, [selectedCompany]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          <p>{error}</p>
          <button
            className="mt-2 text-sm font-medium underline"
            onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Bell size={20} className="mr-2 text-blue-500" />
          Company Announcements
        </h2>
        {isAdmin && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            + New Announcement
          </button>
        )}
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No announcements to display.</p>
        </div>
      ) : (
        <div>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              expanded={expandedIds.has(announcement.id)}
              onToggle={() => toggleExpanded(announcement.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsFeed;
