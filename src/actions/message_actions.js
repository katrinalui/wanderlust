export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_SINGLE_MESSAGE = "RECEIVE_SINGLE_MESSAGE";

export const receiveAllMessages = (messages) => ({
  type: RECEIVE_ALL_MESSAGES,
  messages
});

export const receiveSingleMessage = (message) => ({
  type: RECEIVE_SINGLE_MESSAGE,
  message
});
