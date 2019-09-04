import app from 'firebase/app';
import '@firebase/messaging';
import '@firebase/firestore';
import { firebaseConfig } from '../../config';
import FirebaseContext, { withFirebase } from './context';

class Firebase {
	messaging: app.messaging.Messaging;
	firestore: app.firestore.Firestore;

	constructor() {
		app.initializeApp(firebaseConfig);
		this.messaging = app.messaging();
		this.firestore = app.firestore();
		// Get Instance ID token. Initially this makes a network call, once retrieved
		// subsequent calls to getToken will return from cache.
		this.registerServiceWorker();
	}

	registerServiceWorker() {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', async () => {
				const registration = await navigator.serviceWorker.register(
					'/firebase-messaging-sw.js',
					{
						updateViaCache: 'none'
					}
				);
				this.initializeMessaging();
			});
		}
	}

	initializeMessaging = () => {
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				this.messaging
					.getToken()
					.then(currentToken => {
						if (currentToken) {
						} else {
							console.log(
								currentToken,
								'No Instance ID token available. Request permission to generate one.'
							);
						}
					})
					.catch(err => {
						console.log('An error occurred while retrieving token. ', err);
					});
			} else {
			}
		});

		this.messaging.onTokenRefresh(() => {
			this.messaging
				.getToken()
				.then(refreshedToken => {
					console.log('Token refreshed.');
				})
				.catch(err => {
					console.log('Unable to retrieve refreshed token ', err);
				});
		});
	};
}
export default Firebase;
export { FirebaseContext, withFirebase };
