import * as admin from "firebase-admin";
import * as path from "path";
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

function buildCommonMessage(title, body) {
  return {
    notification: {
      title: title,
      body: body
    }
  };
}

function buildPlatformMessage({
  link,
  title,
  body,
  icon,
  token,
  pushType,
  entityType,
  entityId
}): any {
  const fcmMessage = buildCommonMessage(title, body);

  const push = {
    notification: {
      icon
    }
  };

  if (pushType === "webpush") {
    push["headers"] = {
      TTL: "0"
    };
    push["fcm_options"] = {
      link
    };
  } else {
    push["data"] = {
      type: entityType,
      id: entityId
    };
  }
  fcmMessage["token"] = token;
  fcmMessage[pushType] = push;

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
  const tokens = await getAppInstanceToken(userId);
  Object.keys(tokens).forEach(tokenType => {
    const pushType = tokenType === "web" ? "webpush" : "android";
    const message = buildPlatformMessage({
      link,
      title,
      body,
      icon,
      token: tokens[tokenType],
      pushType,
      entityType,
      entityId
    });
    admin
      .messaging()
      .send(message)
      .then(response => {
        console.log("Successfully sent message:", response);
      })
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
          [type]: token
        },
        { merge: true }
      );
  } catch (err) {
    console.log(`Error storing token [${token}] in firestore`, err);
    return null;
  }
}

//not working now
export async function deleteAppInstanceToken(token) {
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

export async function getAppInstanceToken(userId) {
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
