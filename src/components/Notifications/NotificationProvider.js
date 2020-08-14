import React, { createContext, useState } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	return <NotificationContext.Provider value={{
		setNotification,
		notification,
	}}>
		{notification && <Notification {...notification} />}
		{children}
	</NotificationContext.Provider>;
};

export default NotificationProvider;