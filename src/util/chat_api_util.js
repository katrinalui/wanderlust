import * as firebase from 'firebase';

export const postMessage = (message, user, tripID) => {
  const messageRef = firebase.database().ref(`/messages/${tripID}`).push();
  const key = messageRef.key;
  const newMessage = {
    id: key,
    body: message.body,
    author: user.name,
    image: user.profilePic
  };

  return messageRef.set(newMessage)
    .then(() => messageRef.once('value', snap => { return snap; }));
};
