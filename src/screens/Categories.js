import React from 'react';
import { connect } from 'react-redux';
import RNPropTypes from 'deprecated-react-native-prop-types';
import PropTypes from "prop-types";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { filteredKnotsSet, knotsGet } from '../actions/knots';
import { languageGet, languageSet } from '../actions/language';
import changeDimWidthHeight from '../actions/dimensions';
import categories from '../assets/categories';
import Category from '../components/Category';
import exit from '../components/Exit';
//import AdBanner from '../components/AdMob';
import ThumbIcon from '../components/Icons';
import rate, { check10Days } from '../components/Rate';
import theme from '../styles/theme';
import connectToDB from '../db';
import AlertAccess from '../utils/AlertAccess/AlertAccess';
import defaultLanguage from '../utils/DefaultLanguage/defaultLanguage';
import Spinner from '../components/Spinner/Spinner';

class Categories extends React.PureComponent {
  state = {
    height: 0,
    access: false,
    isLoading: false,
  };

  /*Function for get user accessed use knots API*/
  Accessed = () => {
    const { langCode, setLanguage } = this.props;

    const functions = () => {
      defaultLanguage(setLanguage);
      AlertAccess(this.exitApp, langCode);
    };

    try {
      AsyncStorage.getItem('access').then((value) => {
        if (value !== 'true') {
          functions();
        } else if (value === null) {
          functions();
        }
      });
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  componentDidMount() {
    const {
      getKnots,
      getLanguage,
      navigation,
      langCode,
      handleOrientationChanges,
    } = this.props;

    BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    Dimensions.addEventListener('change', handleOrientationChanges);
    /*Start spinner*/
    this.setState({ isLoading: true });
    AsyncStorage.getItem('alreadyLaunched').then(async (value) => {
      if (value === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        await AsyncStorage.setItem('favoriteKnots', JSON.stringify([]));
        await connectToDB();
        /*End spinner*/
        this.setState({ isLoading: false });
      }
      check10Days(langCode);
      this.Accessed();
      await getKnots();
      /*End spinner*/
      this.setState({ isLoading: false });
    });
    getLanguage();
    /*Set languages params*/
    navigation.setParams({
      langCode,
    });
  }

  componentDidUpdate(prevProps) {
    const { navigation, langCode } = this.props;

    if (prevProps.langCode !== langCode) {
      navigation.setParams({
        langCode,
      });
    }
  }

  exitApp = () => {
    const { langCode } = this.props;

    exit(langCode);

    return true;
  };

  /*Search function*/
  filterKnots = (catCode) => {
    const { knots } = this.props;

    switch (catCode) {
      case 'all': {
        return knots;
      }
      case 'favorite': {
        return knots.filter(({ favorite }) => favorite === true);
      }
      default: {
        return knots.filter(({ knoten_typ }) => {
          const types = knoten_typ.split('_');

          return types.includes(catCode);
        });
      }
    }
  };

  render() {
    const {
      setFilteredKnots,
      navigation,
      langCode,
      isPortrait,
      dHeight,
      dWidth,
    } = this.props;
    const { height } = this.state;

    /*Show rate alert*/
    const Rate = () => rate(langCode);

    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <>
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[0, 3, 13]}
          contentContainerStyle={styles.container}
        >
          {categories.map((category, i, arr) => {
            const { code, image } = category;
            const filteredKnots = this.filterKnots(code);
            const name = category[`name_${langCode}`];
            const type = category[`type_${langCode}`];

            return [
              (!arr[i - 1] || arr[i - 1][`type_${langCode}`] !== type) && (
                <View>
                  <Text
                    style={[
                      styles.type,
                      { paddingHorizontal: !isPortrait ? 50 : 10 },
                    ]}
                    key={code}
                  >
                    {type}
                  </Text>
                </View>
              ),
              <Category
                key={code}
                data={{
                  name,
                  image,
                  count: filteredKnots.length,
                }}
                onPress={() => {
                  setFilteredKnots(filteredKnots);
                  navigation.navigate('Knots', { title: name });
                }}
                isPortrait={isPortrait}
                height={dHeight}
                width={dWidth}
              />,
            ];
          })}
        </ScrollView>
        <ThumbIcon onPress={Rate} style={{ bottom: height + 15 }} />
        {/*AdMob banner*/}
        {/*<AdBanner setHeight={(state) => this.setState(state)} />*/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    color: theme.text,
    backgroundColor: theme.background,
  },
  type: {
    ...theme.categoryTypeHeader,
    padding: 8,
    fontSize: 16,
  },
});

export const knotPropType = PropTypes.shape({
  knotennummer: RNPropTypes.string,
  knotenname_de: RNPropTypes.string,
  knotenname_eng: RNPropTypes.string,
  knotenname_esp: RNPropTypes.string,
  knotenname_ru: RNPropTypes.string,
  knotenname_fr: RNPropTypes.string,
  knotenname_it: RNPropTypes.string,
  knotenname_tuek: RNPropTypes.string,
  knotenbeschreibung_de: RNPropTypes.string,
  knotenbeschreibung_eng: RNPropTypes.string,
  knotenbeschreibung_esp: RNPropTypes.string,
  knotenbeschreibung_ru: RNPropTypes.string,
  knotenbeschreibung_fr: RNPropTypes.string,
  knotenbeschreibung_it: RNPropTypes.string,
  knotenbeschreibung_tuek: RNPropTypes.string,
  knoten_frameweite: RNPropTypes.string,
  knoten_framehoehe: RNPropTypes.string,
  knoten_frame_2d: RNPropTypes.string,
  knoten_frame_360: RNPropTypes.string,
  knoten_count_x_2d: RNPropTypes.string,
  knoten_count_y_2d: RNPropTypes.string,
  knoten_count_x_360: RNPropTypes.string,
  knoten_count_y_360: RNPropTypes.string,
  knotenbild2d: RNPropTypes.string,
  knotenbild360: RNPropTypes.string,
  knoten_typ: RNPropTypes.string,
  knoten_abok: RNPropTypes.string,
  favorite: RNPropTypes.bool,
});

Categories.propTypes = {
  navigation: PropTypes.shape({
    navigate: RNPropTypes.func,
    setParams: RNPropTypes.func,
  }),
  setFilteredKnots: RNPropTypes.func,
  getKnots: RNPropTypes.func,
  getLanguage: RNPropTypes.func,
  setLanguage: RNPropTypes.func,
  knots: RNPropTypes.arrayOf(knotPropType),
  langCode: RNPropTypes.string,
  isPortrait: RNPropTypes.bool,
  dHeight: RNPropTypes.number,
  dWidth: RNPropTypes.number,
  handleOrientationChanges: RNPropTypes.func,
};

const mapStateToProps = ({
  knots: { knots },
  language: { langCode },
  dimensions: { isPortrait, height, width },
}) => ({
  knots,
  langCode,
  isPortrait,
  dHeight: height,
  dWidth: width,
});

const mapDispatchToProps = (dispatch) => ({
  setFilteredKnots: (knots) => dispatch(filteredKnotsSet(knots)),
  getKnots: () => dispatch(knotsGet()),
  getLanguage: () => dispatch(languageGet()),
  handleOrientationChanges: () => dispatch(changeDimWidthHeight()),
  setLanguage: (code) => dispatch(languageSet(code)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Categories);
