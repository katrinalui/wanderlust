import {RECEIVE_ALL_MESSAGES,
        RECEIVE_SINGLE_MESSAGE} from '../actions/message_actions';

const MessagesReducer = (state = {}, action) => {
  Object.freeze(state);
  const receivedMessage = action.message;
  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages;
    case RECEIVE_SINGLE_MESSAGE:
      return Object.assign({}, state, { [receivedMessage.id]:receivedMessage});
    default:
      return state;
  }
};

export default MessagesReducer;
