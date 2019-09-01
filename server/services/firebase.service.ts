import * as admin from "firebase-admin";
import { clientEmail, privateKey, projectId } from "../config/firebase.config";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
    projectId
  }),
  databaseURL: "https://popcorn-64a9a.firebaseio.com"
});

const db = admin.firestore();
const notificationTokenPath = "notification_token";

function buildMobileMessage({ title, body, icon, entityType, entityId }) {
  const fcmMessage = {
    notification: {
      title,
      body
    },
    android: {
      notification: {
        icon
      },
      data: {
        type: entityType,
        id: entityId
      }
    }
  };
  return fcmMessage;
}

function buildBrowserMessage({ title, body, icon, link }) {
  const fcmMessage = {
    notification: {
      title,
      body
    },
    webpush: {
      notification: {
        icon
      },
      headers: {
        TTL: "0"
      },
      fcm_options: {
        link
      }
    }
  };
  return fcmMessage;
}

export async function sendPushMessage({
  link,
  title,
  body,
  icon,
  userId,
  entityType,
  entityId
}) {
  const userTokens = await getAppInstanceTokens(userId);

  Object.keys(userTokens).forEach(tokenType => {
    let message = null;
    if (tokenType === "web")
      message = buildBrowserMessage({ title, body, icon, link });
    if (tokenType === "mobile")
      message = buildMobileMessage({ title, body, icon, entityId, entityType });
    admin
      .messaging()
      .sendMulticast({ ...message, tokens: userTokens[tokenType] })
      .then(response => {})
      .catch(error => {
        console.log("Error sending message:", error);
      });
  });
}

export async function storeAppInstanceToken({ token, userId, type }) {
  try {
    return await db
      .collection(notificationTokenPath)
      .doc(userId)
      .set(
        {
          [type]: admin.firestore.FieldValue.arrayUnion(token)
        },
        { merge: true }
      );
  } catch (err) {
    console.log(`Error storing token [${token}] in firestore`, err);
    return null;
  }
}

export async function deleteAppInstanceToken(token: string) {
  try {
    const deleteQuery = db
      .collection(notificationTokenPath)
      .where("token", "==", token);
    const querySnapshot = await deleteQuery.get();
    querySnapshot.docs.forEach(async doc => {
      await doc.ref.delete();
    });
    return true;
  } catch (err) {
    console.log(`Error deleting token [${token}] in firestore`, err);
    return null;
  }
}

export async function getAppInstanceTokens(userId: string) {
  try {
    let tokens = await db
      .collection(notificationTokenPath)
      .doc(userId)
      .get();
    return tokens.data();
  } catch (err) {
    console.log(`Error getting token [${userId}] in firestore`, err);
    return null;
  }
}
