import { Dimensions } from 'react-native';

import { CHANGE_WIDTH_HEIGHT } from '../constants/dimensions';

const getDimWidthHeight = () => {
  const { width, height } = Dimensions.get('window');
  const isPortrait = width < height;

  return { width, height, isPortrait };
};

const initialState = getDimWidthHeight();

export default (state = initialState, action) => {
  if (action.type === CHANGE_WIDTH_HEIGHT) {
    return getDimWidthHeight();
  }

  return state;
};
