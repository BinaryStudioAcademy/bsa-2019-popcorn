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
let tokensStorage = {};

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
  if (!userTokens) {
    return;
  }

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
  if (tokensStorage[userId] && tokensStorage[userId][type].includes(token))
    return true;
  try {
    const result = await db
      .collection(notificationTokenPath)
      .doc(userId)
      .set(
        {
          [type]: admin.firestore.FieldValue.arrayUnion(token)
        },
        { merge: true }
      );
    if (result) {
      const tokens =
        (tokensStorage[userId] && tokensStorage[userId][type]) || [];
      tokensStorage[userId] = {
        ...tokensStorage[userId],
        [type]: [...tokens, token]
      };
    }
    return true;
  } catch (err) {
    console.log(`Error storing token [${token}] in firestore`, err);
    return null;
  }
}

export async function deleteAppInstanceToken(token: string, userId: string) {
  try {
    const result = await db
      .collection(notificationTokenPath)
      .doc(userId)
      .update({
        web: admin.firestore.FieldValue.arrayRemove(token),
        mobile: admin.firestore.FieldValue.arrayRemove(token)
      });
    if (tokensStorage[userId]) {
      if (tokensStorage[userId]["web"]) {
        const webTokens = tokensStorage[userId]["web"].filter(
          webToken => webToken !== token
        );
        tokensStorage[userId]["web"] = webTokens;
      }
      if (tokensStorage[userId]["mobile"]) {
        const mobileTokens = tokensStorage[userId]["web"].filter(
          mobileToken => mobileToken !== token
        );
        tokensStorage[userId]["mobile"] = mobileTokens;
      }
    }
    return true;
  } catch (err) {
    console.log(`Error deleting token [${token}] in firestore`, err);
    return null;
  }
}

export async function getAppInstanceTokens(userId: string) {
  try {
    if (tokensStorage[userId]) return tokensStorage[userId];
    else {
      const tokensFromFirebase = await db
        .collection(notificationTokenPath)
        .doc(userId)
        .get();
      tokensStorage[userId] = tokensFromFirebase.data();
      return tokensStorage[userId];
    }
  } catch (err) {
    console.log(`Error getting token [${userId}] in firestore`, err);
    tokensStorage[userId] = [];
    return null;
  }
}
