import moment from 'moment';


export const getEventStatus = (event) => {
  // If event is manually cancelled, return cancelled
  if (event.status === 'cancelled') {
    return 'cancelled';
  }

  const now = moment();
  const eventDate = moment(event.date);
  const eventStartTime = moment(`${event.date} ${event.startTime}`, 'YYYY-MM-DD HH:mm');
  const eventEndTime = moment(`${event.date} ${event.endTime}`, 'YYYY-MM-DD HH:mm');

  // If event date is in the future
  if (eventDate.isAfter(now, 'day')) {
    return 'upcoming';
  }

  // If event date is today, check if it's ongoing
  if (eventDate.isSame(now, 'day')) {
    if (now.isBetween(eventStartTime, eventEndTime, null, '[]')) {
      return 'ongoing';
    } else if (now.isBefore(eventStartTime)) {
      return 'upcoming';
    } else {
      return 'completed';
    }
  }

  // If event date is in the past
  if (eventDate.isBefore(now, 'day')) {
    return 'completed';
  }

  // Default fallback
  return 'upcoming';
};


export const filterEventsByStatus = (events, statusFilter) => {
  if (statusFilter === 'all') {
    return events;
  }

  return events.filter(event => {
    const autoStatus = getEventStatus(event);
    return autoStatus === statusFilter;
  });
};


export const getStatusBadgeConfig = (status) => {
  const configs = {
    upcoming: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: 'Clock',
      label: 'Upcoming'
    },
    ongoing: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      icon: 'TrendingUp',
      label: 'Ongoing'
    },
    completed: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      icon: 'CheckCircle',
      label: 'Completed'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: 'XCircle',
      label: 'Cancelled'
    }
  };

  return configs[status] || configs.upcoming;
};
