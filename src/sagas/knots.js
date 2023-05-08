import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { KNOTS_GET, KNOT_LIKE } from '../constants/knots';
import { knotsRecived, knotLiked } from '../actions/knots';
import { executeSql } from '../db';

function* getKnots() {
  try {
    /*Get knots*/
    const knots = yield executeSql(
      'select * from alleknotentabelle order by knotenname_eng'
    );
    /*Get favorite knots from AsyncStorage*/
    const favoriteKnots = yield AsyncStorage.getItem('favoriteKnots');
    const favKnots = JSON.parse(favoriteKnots);

    knots.forEach((knot) => {
      const favKnot = favKnots.find(
        ({ knotennummer }) => knot.knotennummer === knotennummer
      );
      knot.favorite = favKnot?.favorite || false;
    });

    /*Recording got knots*/
    yield put(knotsRecived(knots));
  } catch (err) {
    Alert.alert('Something went wrong!', err.message);
  }
}

function* likeKnot({ knotId }) {
  try {
    const { knots, knot } = yield select((state) => state.knots);
    /*Get favorite knots from AsyncStorage*/
    const favoriteKnots = yield AsyncStorage.getItem('favoriteKnots');
    const { favorite } = knot;
    const changeKnotInsideArr = (arr) =>
      arr.map((elm) => {
        if (elm.knotennummer === knotId) {
          elm.favorite = !favorite;

          return elm;
        }

        return elm;
      });
    const newKnots = changeKnotInsideArr(knots);

    let favKnots = JSON.parse(favoriteKnots);

    const favKnot = favKnots.find((elm) => elm.knotennummer === knotId);

    if (favKnot) {
      favKnots = changeKnotInsideArr(favKnots);
    } else {
      favKnots.push({
        knotennummer: knotId,
        favorite: !favorite,
      });
    }

    knot.favorite = !favorite;

    AsyncStorage.setItem('favoriteKnots', JSON.stringify(favKnots));
    yield put(knotLiked(newKnots, { ...knot }));
  } catch (err) {
    Alert.alert('Something went wrong!', err);
  }
}

export default function* photosSaga() {
  yield takeLatest(KNOTS_GET, getKnots);
  yield takeLatest(KNOT_LIKE, likeKnot);
}

