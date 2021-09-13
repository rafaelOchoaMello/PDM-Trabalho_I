import { NotificationManager } from "react-notifications";

const NotificationsAlert = (type, title, subtitle="") => {
  switch (type) {
    case "info":
      NotificationManager.info(subtitle, title);
      break;
    case "success":
      NotificationManager.success(subtitle, title);
      break;    
    case "warning":
      NotificationManager.warning(
        subtitle,
        title,
        3000
      );
      break;
    default:
      NotificationManager.error("Error message", "Click me!", 5000);
      break;
  }
};

export default NotificationsAlert;
