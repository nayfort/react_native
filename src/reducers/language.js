import { LANGUAGE_SET_COMPLETE } from '../constants/language';

const initialState = {
  langCode: 'eng',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_SET_COMPLETE: {
      const { langCode } = action;

      return { langCode };
    }
    default:
      return state;
  }
};
