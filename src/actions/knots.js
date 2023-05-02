import * as Constants from '../constants/knots';

export const knotsGet = () => ({
  type: Constants.KNOTS_GET,
});

export const knotsRecived = (knots) => ({
  type: Constants.KNOTS_RECIVED,
  knots,
});

export const filteredKnotsSet = (filteredKnots) => ({
  type: Constants.FILTERED_KNOTS_SET,
  filteredKnots,
});

export const knotSet = (knot) => ({
  type: Constants.KNOT_SET,
  knot,
});

export const knotLike = (knotId) => ({
  type: Constants.KNOT_LIKE,
  knotId,
});

export const knotLiked = (knots, knot) => ({
  type: Constants.KNOT_LIKED,
  knots,
  knot,
});
