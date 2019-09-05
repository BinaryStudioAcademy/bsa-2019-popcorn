import io from 'socket.io-client';

class SocketService {

	static on(name: string, callback: (data: any) => any) {
		SocketService._socket.on(name, callback);
	}

	static emit(name: string, data: any) {
		SocketService._socket.emit(name, data);
	}

	static join(room: string) {
		SocketService._socket.emit('createRoom', room);
	}

	static leave(room: string) {
		SocketService._socket.emit('leaveRoom', room);
	}

	private static _socket;

	constructor(userId: string) {
		this._initSocket(userId);
	}

	private _initSocket(userId: string) {
		if (!SocketService._socket) {
			const currentLocation = new URL(window.location.href);
			SocketService._socket =
				process.env.NODE_ENV === 'production'
					? io({ withCredentials: false })
					: io(
						`${currentLocation.protocol}//${currentLocation.hostname}:3000`,
						{ withCredentials: false }
					);
			if (SocketService._socket) {
				SocketService._socket.on('connect', () => {
					SocketService._socket.emit('joinRoom', userId);
				});
			}
		}
	}

}

export default SocketService;
