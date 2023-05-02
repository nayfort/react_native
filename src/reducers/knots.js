import {
  FILTERED_KNOTS_SET,
  KNOT_SET,
  KNOTS_RECIVED,
  KNOT_LIKED,
} from '../constants/knots';

const initialState = {
  knots: [],
  filteredKnots: [],
  knot: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTERED_KNOTS_SET: {
      const { filteredKnots } = action;

      return { ...state, filteredKnots };
    }
    case KNOT_SET: {
      const { knot } = action;

      return { ...state, knot };
    }
    case KNOTS_RECIVED: {
      const { knots } = action;

      return { ...state, knots };
    }
    case KNOT_LIKED: {
      const { knots, knot } = state;

      return { ...state, knots, knot };
    }
    default:
      return state;
  }
};
