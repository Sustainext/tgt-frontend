import React, { useState, useEffect, useRef } from 'react';
import {
  IoClose,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoDocument,
  IoPerson,
  IoTime,
  IoNotifications,
} from 'react-icons/io5';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const NotificationsModal = ({ isOpen, onClose, triggerRef }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [position, setPosition] = useState({ top: 60, right: 40 });
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const [showViewAll, setShowViewAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [markingAsRead, setMarkingAsRead] = useState(new Set());
  const [actionLoading, setActionLoading] = useState(new Set());
  const modalRef = useRef(null);
  const scrollRef = useRef(null);

  // Mock notification data with different states
  const [allNotifications, setAllNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'ESG Report Review Required',
      description:
        'Q4 2024 sustainability report needs your approval before submission to GRI standards',
      timestamp: '3 hours ago',
      isUnread: true,
      avatar: '/api/placeholder/32/32',
      actionLink: 'Review Report',
      priority: 'high',
      isNew: false,
    },
    {
      id: 2,
      type: 'general',
      title: 'Carbon emissions data updated',
      description:
        'New Scope 2 emissions data from renewable energy sources has been processed',
      timestamp: '5 hours ago',
      isUnread: true,
      avatar: '/api/placeholder/32/32',
      actionLink: 'View Dashboard',
      priority: 'normal',
    },
    {
      id: 3,
      type: 'alert',
      title: 'CSRD compliance deadline approaching',
      description:
        'EU Corporate Sustainability Reporting Directive submission due in 15 days',
      timestamp: '6 hours ago',
      isUnread: false,
      avatar: null,
      priority: 'medium',
      actionLink: 'View Requirements',
    },
    {
      id: 4,
      type: 'task',
      title: 'Supplier ESG assessment overdue',
      description:
        'Complete ESG risk assessment for 3 tier-1 suppliers by end of week',
      timestamp: '1 day ago',
      isUnread: true,
      avatar: null,
      actionLink: 'Start Assessment',
      priority: 'high',
    },
    {
      id: 5,
      type: 'general',
      title: 'Sustainability target achieved',
      description:
        'Congratulations! 25% waste reduction goal has been reached ahead of schedule',
      timestamp: '2 days ago',
      isUnread: false,
      avatar: null,
      actionLink: 'View Progress',
      priority: 'normal',
    },
    {
      id: 6,
      type: 'alert',
      title: 'Data quality issue detected',
      description:
        'Inconsistencies found in water consumption data for manufacturing site B',
      timestamp: '3 days ago',
      isUnread: false,
      avatar: null,
      actionLink: 'Review Data',
      priority: 'medium',
    },
    {
      id: 7,
      type: 'task',
      title: 'Stakeholder engagement survey ready',
      description:
        'Annual stakeholder materiality assessment survey is ready for distribution',
      timestamp: '4 days ago',
      isUnread: false,
      avatar: '/api/placeholder/32/32',
      actionLink: 'Launch Survey',
      priority: 'normal',
    },
    {
      id: 8,
      type: 'general',
      title: 'New ESG framework update',
      description:
        'TCFD recommendations have been updated - review impact on current reporting',
      timestamp: '5 days ago',
      isUnread: true,
      avatar: null,
      priority: 'medium',
      actionLink: 'View Changes',
    },
  ]);

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'Unread':
        return allNotifications.filter((n) => n.isUnread);
      case 'Alerts':
        return allNotifications.filter((n) => n.type === 'alert');
      case 'Tasks':
        return allNotifications.filter((n) => n.type === 'task');
      default:
        return allNotifications;
    }
  };

  const notifications = getFilteredNotifications();
  const unreadCount = allNotifications.filter((n) => n.isUnread).length;

  // Inject custom scrollbar styles
  useEffect(() => {
    if (isOpen) {
      const styleElement = document.createElement('style');
      styleElement.textContent = scrollbarStyles;
      document.head.appendChild(styleElement);
      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, [isOpen]);

  const tabs = [
    { name: 'All', count: null },
    { name: 'Unread', count: unreadCount },
    { name: 'Alerts', count: null },
    { name: 'Tasks', count: null },
  ];

  // Calculate position based on trigger element
  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen, triggerRef]);

  // Handle clicks outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, triggerRef]);

  // Handle scroll detection for "view all" button
  useEffect(() => {
    const handleScroll = (e) => {
      e.stopPropagation();
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;
        setShowViewAll(isNearBottom && notifications.length > 5);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll({ stopPropagation: () => {} });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [notifications.length]);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setShowViewAll(false);
    }
  }, [activeTab]);

  const markAllAsRead = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAllNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isUnread: false }))
      );
      console.log('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark notifications as read');
    } finally {
      setIsLoading(false);
    }
  };

  const markSingleAsRead = async (notificationId) => {
    setMarkingAsRead((prev) => new Set([...prev, notificationId]));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAllNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isUnread: false }
            : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read');
    } finally {
      setMarkingAsRead((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const markSingleAsUnread = async (notificationId) => {
    setMarkingAsRead((prev) => new Set([...prev, notificationId]));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAllNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isUnread: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as unread');
    } finally {
      setMarkingAsRead((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification.id);
    if (notification.isUnread) {
      markSingleAsRead(notification.id);
    }
  };

  const handleActionClick = async (notification, e) => {
    e.stopPropagation();
    setActionLoading((prev) => new Set([...prev, notification.id]));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        `Action: ${notification.actionLink} for notification ${notification.id}`
      );
    } catch (error) {
      console.error('Action failed');
    } finally {
      setActionLoading((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notification.id);
        return newSet;
      });
    }
  };

  const getNotificationIcon = (type, avatar) => {
    if (avatar) {
      return (
        <img
          src={avatar}
          alt='User avatar'
          className='w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm'
        />
      );
    }

    const iconProps = { size: 16, className: 'text-white' };

    switch (type) {
      case 'task':
        return (
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm'>
            <IoCheckmarkCircle {...iconProps} />
          </div>
        );
      case 'alert':
        return (
          <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-sm'>
            <IoAlertCircle {...iconProps} />
          </div>
        );
      default:
        return (
          <div className='w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center shadow-sm'>
            <IoDocument {...iconProps} />
          </div>
        );
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-12 px-6 text-center'>
      <div className='w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4'>
        <IoCheckmarkCircle className='w-10 h-10 text-blue-500' />
      </div>
      <h3 className='text-lg font-semibold text-gray-900 mb-2'>
        You're all caught up!
      </h3>
      <p className='text-sm text-gray-500 max-w-sm'>
        No new notifications to show. We'll let you know when something needs
        your attention.
      </p>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className='flex items-center justify-center py-8'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-40 bg-black bg-opacity-10'
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className='fixed z-50 bg-white shadow-xl border border-gray-200 flex flex-col animate-in fade-in zoom-in-95 duration-200 rounded-lg'
        style={{
          top: position.top,
          right: position.right,
          width: '350px',
          height: 'auto',
          maxHeight: '415px',
          transformOrigin: 'top right',
        }}
      >
        {/* Arrow pointing up */}
        <div className='absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45' />

        <div className='flex flex-col h-full min-h-0 rounded-lg'>
          {/* Header */}
          <div className='flex justify-between items-center p-4 border-b border-gray-200'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Notifications
              </h2>
              {/* {unreadCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {unreadCount}
                </span>
              )} */}
            </div>
            <div className='flex items-center gap-3'>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={isLoading}
                  className='text-blue-600 text-sm hover:text-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1'
                >
                  {isLoading ? (
                    <>
                      <div className='w-3 h-3 animate-spin rounded-full border border-blue-600 border-t-transparent'></div>
                      Marking...
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircle size={14} />
                      Mark all as read
                    </>
                  )}
                </button>
              )}
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded'
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex border-b border-gray-200'>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-1 px-3 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.name
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.name}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      activeTab === tab.name
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    ({tab.count})
                  </span>
                )}

                {/* Active tab indicator */}
                {activeTab === tab.name && (
                  <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-200' />
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className='flex-1 overflow-hidden'>
            {isLoading ? (
              <LoadingState />
            ) : notifications.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                ref={scrollRef}
                className='h-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar rounded-lg'
                style={{
                  maxHeight: '384px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 #F1F5F9',
                }}
              >
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`relative border-b border-gray-100 cursor-pointer transition-all duration-200 group ${
                        selectedNotification === notification.id
                          ? 'bg-blue-50 border-blue-200'
                          : hoveredNotification === notification.id
                          ? 'bg-gray-50'
                          : 'bg-white hover:bg-gray-50'
                      } ${notification.isNew ? 'animate-pulse' : ''}`}
                      onMouseEnter={() =>
                        setHoveredNotification(notification.id)
                      }
                      onMouseLeave={() => setHoveredNotification(null)}
                      onClick={() => handleNotificationClick(notification)}
                      style={{ minHeight: 80 }} // space for buttons
                    >
                      {/* Dismiss icon ABSOLUTE TOP RIGHT, only if selected */}
                      {selectedNotification === notification.id && (
                        <button
                          title='Dismiss notification'
                          className='absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors'
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                        >
                          <IoClose size={18} />
                        </button>
                      )}

                      {/* Mark as unread ABSOLUTE BOTTOM RIGHT, only if selected & notification is READ */}
                      {selectedNotification === notification.id &&
                        !notification.isUnread && (
                          <button
                            title='Mark as unread'
                            className='absolute bottom-3 right-3 z-10 p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors'
                            onClick={(e) => {
                              e.stopPropagation();
                              markSingleAsUnread(notification.id);
                            }}
                            disabled={markingAsRead.has(notification.id)}
                          >
                            {markingAsRead.has(notification.id) ? (
                              <span className='w-4 h-4 block animate-spin rounded-full border border-blue-400 border-t-transparent'></span>
                            ) : (
                              <IoNotifications size={18} />
                            )}
                          </button>
                        )}

                      <div className='p-4'>
                        <div className='flex items-start gap-3'>
                          {/* Avatar or Icon */}
                          <div className='flex-shrink-0 relative'>
                            {getNotificationIcon(
                              notification.type,
                              notification.avatar
                            )}
                            {markingAsRead.has(notification.id) && (
                              <div className='absolute inset-0 bg-white bg-opacity-75 rounded-full flex items-center justify-center'>
                                <div className='w-4 h-4 animate-spin rounded-full border border-blue-500 border-t-transparent'></div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between'>
                              <div className='flex-1'>
                                <p
                                  className={`text-sm mb-1 transition-all ${
                                    notification.isUnread
                                      ? 'font-semibold text-gray-900'
                                      : 'font-medium text-gray-700'
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                                  {notification.description}
                                </p>

                                {/* Action button */}
                                {notification.actionLink && (
                                  <button
                                    className={`inline-flex items-center gap-1 text-xs font-medium rounded-md transition-all ${
                                      actionLoading.has(notification.id)
                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                        : 'text-blue-600'
                                    }`}
                                    onClick={(e) =>
                                      handleActionClick(notification, e)
                                    }
                                    disabled={actionLoading.has(
                                      notification.id
                                    )}
                                  >
                                    {actionLoading.has(notification.id) ? (
                                      <>
                                        <div className='w-3 h-3 animate-spin rounded-full border border-gray-500 border-t-transparent'></div>
                                        Loading...
                                      </>
                                    ) : (
                                      notification.actionLink
                                    )}
                                  </button>
                                )}

                                <div className='flex items-center gap-1 mt-2'>
                                  <IoTime size={10} className='text-gray-400' />
                                  <p className='text-xs text-gray-500'>
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                              {/* Unread indicator if not selected */}
                              {selectedNotification !== notification.id &&
                                notification.isUnread && (
                                  <div className='w-2 h-2 bg-blue-500 rounded-full ml-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform' />
                                )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* New notification indicator */}
                      {notification.isNew && (
                        <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse' />
                      )}
                    </div>
                  ))}

                  {/* Spacer for better scrolling */}
                  <div className='h-4' />
                </div>
              </div>
            )}

            {/* View All Button - appears when scrolled to bottom */}
            {showViewAll && (
              <div className='bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-lg'>
                <div className='px-4'>
                  <button
                    className='w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-md transition-all hover:scale-105'
                    onClick={() => console.log('View more')}
                  >
                    View more
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;
