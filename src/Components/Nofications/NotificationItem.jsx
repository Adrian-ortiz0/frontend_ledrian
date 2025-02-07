import { format } from 'date-fns';

const NotificationItem = ({ notification }) => {
  return (
    <div className={`p-4 border-b last:border-none ${notification.checked ? 'bg-gray-100' : 'bg-white'}`}>
      <p className="text-sm text-gray-500">{format(new Date(notification.date), 'PPpp')}</p>
      <p className="font-medium">{notification.content}</p>
    </div>
  );
};

export default NotificationItem;