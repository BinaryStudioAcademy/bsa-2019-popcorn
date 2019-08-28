import * as admin from "firebase-admin";

// import serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "popcorn-64a9a",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1+hTDKfMW5HcW\nL90h0543tkWgPuDMqAKyg24Pkt0RTLlvH8NNoYowj4YPY7FSkiaOAdCXCFZWI93g\nTgULMxYqNrZRkdBUisobtbG/ZtRa/5d4gfGRi0427WhCbhMiuyeN20aQq43uST4Q\nQx5PfJuH82NKB6FhfHz80K/J7ne52qM1i0qIQpkWNJxnWplS/vWuW/VJ/lT9LQjD\nBxRi9RE3SmyfKEj8qj7/Ccoeb6Coj21djkGtoLsYnfg3SRx1lQuLwKYSGlO5k/+m\ngy0j/yE5Pi53tAAoKr75oXWUU2Qat+OajorQ02ngnD3DSz9cSKroGBS79FtyqoSH\nsofainuDAgMBAAECggEAEYF3utiPvn2G6Tb8hlMFruVVaFd0J6vn6oVTMqNVqeLg\nGc0L7C1kjkxYQKW9+qv9kn6hMs5GA+5aW0gWGyA0eyYdPtaQnHlnfOfrK/b36bMZ\nvql9dBtbEFShSXauV5J6eR6FeMhQFIKuOkFCqrHZgmgK/qWiRC8GFQn8RyguE05H\nuK6pSevw/0rOmOsVGUY3VotxcLSQy6mhBY9EIXhQnj+p7XdSgR5WBR6YSATl01To\nci4KqTVNymD/RXaPEVNHx+Rkdj+2f/CzQOXd3eELfEIUgE/A7rzfSaRmjmkG+pIO\nTwPvXlsJWqStYhdLuwBxrz0GJwXAOmjqfRpd8bhCRQKBgQD0dQ16obQxVgYIr2em\njUQ0SSmUzDridQntcCduNk4D/fWAzb4vsUhIZmJ3+CvUWQGMm6msiNrVxbbTIA1C\n1INn2wyjY0vJSj8NPYsLFAxQXSvsIq8cBmgQtCfLQ7/TPTLYAh2XcSQG1gwC+1dj\nzsyV1NSbwlGVhXJ7+F1QCD7JvwKBgQC+kcdzvftLGAAMELn/cn6x2lqOnRIFEbu8\npLQCpRJUM1S2AomXA0XmIeWdST1T56eMx+H9gtFYwlBZRV53JOwn5WcRdSjbyFoo\nKxS6q26g+RTjUZPayvknDZgHzBiizyTQbgS4ZvUZRff005QyhLoe38l/L5riq0oR\nC7b0XxvXPQKBgQDdtwxynRcBaDQwzGYF+TpS8ch03IbLvbszTvV0UGyR0lRIblKA\njxowECxfAwc9oTx2evh5M+bG3HvlILzmUDieiV39EqI5/s0RBTCG67f/a4Haudp4\nYJciD0PIZ7ojrO3gXIraQBOc36YlTjEEpRuJCW+LlcLJCi+7oJeBbvkDoQKBgFgh\nSr/4CBK+UqdBxQKhjH3roR16/i5h+RRQhv8CH+vYoUBbBA5WcSjwXCPVDwuSgiXU\n+mom6XHGyym9ruYiqSP6LyQfrnmVujwBUGDTjyHajxJhU6NHYtnwq3JPrMT+TuQl\nPQGae5boiLcscci7IOfOTn0HIvXYiTRA2qdApLtxAoGBAOOFX1vD8IVAWA/TDDDW\nKzE9/Im3ByEECFSo9hBgHCl1rPjxuJQRRK7KHNnhbkL7pw4/PQ5y/71iqAu21RBH\nOVVyGoaxAuh4B74XD1e/qUXBMe0R5i77MWP04Sg6AG2H4EWQKCBN/3lNI2KBaVVQ\nDT42FtLy6MHaBMbPLrdtKPMc\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-p476x@popcorn-64a9a.iam.gserviceaccount.com"
  }),
  databaseURL: "https://popcorn-64a9a.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken =
  "dCK32xvfJKM:APA91bFhaBqY_x7cbCiX3DGAkyxRBDisbiBGF_tpGFgca7WECMw_Zp34WtZlI6LazpLX8wRKzJwsMgQBYWSsVLTiTR9Kl_ZHUmU6zn7GIj244bX6FlbYQPXZzBQ1dzmaCfKdZnOYRgsV";

function buildCommonMessage(title, body) {
  return {
    notification: {
      title: title,
      body: body
    }
  };
}

/**
 * Builds message with platform specific options
 * Link: https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages
 */
function buildPlatformMessage(token = registrationToken, title, body): any {
  const fcmMessage = buildCommonMessage(title, body);

  const webpush = {
    headers: {
      TTL: "0"
    },
    notification: {
      icon: "https://img.icons8.com/color/96/e74c3c/ireland.png"
    },
    fcm_options: {
      link: "https://gnib-visa-app.rharshad.com"
    }
  };

  fcmMessage["token"] = token;
  fcmMessage["webpush"] = webpush;
  return fcmMessage;
}

// Send a message to the device corresponding to the provided
// registration token.
export function sendMessage() {
  const message = buildPlatformMessage(registrationToken, "title", "body");
  admin
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch(error => {
      console.log("Error sending message:", error);
    });
}
