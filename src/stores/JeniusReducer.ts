import JENIUS_ACTION_TYPE from '../actions/JeniusActionType';

const INITIAL_STATE: any = {
  contacts: [],
};

const JeniusReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case JENIUS_ACTION_TYPE.ASSIGN_CONTACT:
      return {
        ...state,
        contacts: action.payload,
      };

    case JENIUS_ACTION_TYPE.ADD_CONTACT:
      state.contacts.push(action.payload);

    default:
      return state;
  }
};

export default JeniusReducer;
