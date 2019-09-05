export const hasUnreadMessages = chats => {
	for (const chatId in chats) {
		if (chats[chatId].unreadMessagesCount > 0) {
			return true;
		}
	}
	return false;
};
