import app from 'firebase/app';
import '@firebase/messaging';
import { firebaseConfig } from '../../config';
import FirebaseContext from './context';

class Firebase {
	messaging: app.messaging.Messaging;

	constructor() {
		app.initializeApp(firebaseConfig);
		this.messaging = app.messaging();
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
				this.messaging.useServiceWorker(registration);
				process.nextTick(() => this.initializeMessaging());
			});
		}
	}

	initializeMessaging = () => {
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				console.log('Notification permission granted.');
				this.messaging
					.getToken()
					.then(currentToken => {
						if (currentToken) {
							console.log('here', currentToken);
							// sendTokenToServer(currentToken);
							// updateUIForPushEnabled(currentToken);
						} else {
							// Show permission request.
							console.log(
								currentToken,
								'No Instance ID token available. Request permission to generate one.'
							);
							// Show permission UI.
							// updateUIForPushPermissionRequired();
							// setTokenSentToServer(false);
						}
					})
					.catch(err => {
						console.log('An error occurred while retrieving token. ', err);
						// showToken('Error retrieving Instance ID token. ', err);
						// setTokenSentToServer(false);
					});
			} else {
				console.log('Unable to get permission to notify.');
			}
		});

		// Callback fired if Instance ID token is updated.
		this.messaging.onTokenRefresh(() => {
			this.messaging
				.getToken()
				.then(refreshedToken => {
					console.log('Token refreshed.');
					// Indicate that the new Instance ID token has not yet been sent to the
					// app server.
					// setTokenSentToServer(false);
					// Send Instance ID token to app server.
					// sendTokenToServer(refreshedToken);
					// ...
				})
				.catch(err => {
					console.log('Unable to retrieve refreshed token ', err);
					// showToken('Unable to retrieve refreshed token ', err);
				});
		});
	};
}
export default Firebase;
export { FirebaseContext };
