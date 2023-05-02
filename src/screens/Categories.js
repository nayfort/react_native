import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import AdBanner from '../components/AdMob';
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
        AsyncStorage.setItem('alreadyLaunched', 'true');
        AsyncStorage.setItem('favoriteKnots', JSON.stringify([]));
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
        <AdBanner setHeight={(state) => this.setState(state)} />
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
  knotennummer: PropTypes.string,
  knotenname_de: PropTypes.string,
  knotenname_eng: PropTypes.string,
  knotenname_esp: PropTypes.string,
  knotenname_ru: PropTypes.string,
  knotenname_fr: PropTypes.string,
  knotenname_it: PropTypes.string,
  knotenname_tuek: PropTypes.string,
  knotenbeschreibung_de: PropTypes.string,
  knotenbeschreibung_eng: PropTypes.string,
  knotenbeschreibung_esp: PropTypes.string,
  knotenbeschreibung_ru: PropTypes.string,
  knotenbeschreibung_fr: PropTypes.string,
  knotenbeschreibung_it: PropTypes.string,
  knotenbeschreibung_tuek: PropTypes.string,
  knoten_frameweite: PropTypes.string,
  knoten_framehoehe: PropTypes.string,
  knoten_frame_2d: PropTypes.string,
  knoten_frame_360: PropTypes.string,
  knoten_count_x_2d: PropTypes.string,
  knoten_count_y_2d: PropTypes.string,
  knoten_count_x_360: PropTypes.string,
  knoten_count_y_360: PropTypes.string,
  knotenbild2d: PropTypes.string,
  knotenbild360: PropTypes.string,
  knoten_typ: PropTypes.string,
  knoten_abok: PropTypes.string,
  favorite: PropTypes.bool,
});

Categories.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  setFilteredKnots: PropTypes.func.isRequired,
  getKnots: PropTypes.func.isRequired,
  getLanguage: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  knots: PropTypes.arrayOf(knotPropType).isRequired,
  langCode: PropTypes.string.isRequired,
  isPortrait: PropTypes.bool.isRequired,
  dHeight: PropTypes.number.isRequired,
  dWidth: PropTypes.number.isRequired,
  handleOrientationChanges: PropTypes.func.isRequired,
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
