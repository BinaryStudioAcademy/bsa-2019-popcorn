import React from 'react';
import io from 'socket.io-client';
import config from '../config';

class SocketService {
	private static _socket;

	constructor(userId: string) {
		this._initSocket(userId);
	}

	private _initSocket(userId: string) {
		if (!SocketService._socket) {
			SocketService._socket = io(config.API_URL, { withCredentials: false });
			if (SocketService._socket) {
				SocketService._socket.on('connect', () => {
					SocketService._socket.emit('joinRoom', userId);
				});
			}
		}
	}

	static on(name: string, callback: (data: any) => any) {
		SocketService._socket.on(name, callback);
	}

	static emit(name: string, data: any) {
		SocketService._socket.emit(name, data);
	}
}

export default SocketService;
