import React from 'react';
import io from 'socket.io-client';
import config from '../../config';

class Notifications {
	private static _socket;

	constructor(userId: string) {
		this._initSocket(userId);
	}

	private _initSocket(userId: string) {
		if (!Notifications._socket) {
			Notifications._socket = io(config.API_URL, { withCredentials: false });
			if (Notifications._socket) {
				Notifications._socket.on('connect', () => {
					Notifications._socket.emit('joinRoom', userId);
				});
			}
		}
	}

	static on(name: string, callback: (data: any) => any) {
		Notifications._socket.on(name, callback);
	}

	static emit(name: string, data: any) {
		Notifications._socket.emit(name, data);
	}
}

export default Notifications;
