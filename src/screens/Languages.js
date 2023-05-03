import React from 'react';
import RNPropTypes from 'deprecated-react-native-prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { languageSet } from '../actions/language';
import { LanguageCategory } from '../components/Category';
//import AdBanner from '../components/AdMob';
import languages from '../assets/languages.json';
import { goBackSafe } from '../utils/GoBackSafe/GoBackSafe';
import theme from '../styles/theme';

const Language = React.memo(
  ({ setLanguage, langCode, navigation, isPortrait, height, width }) => (
    <>
      {/*Background color depending phone theme*/}
      <ScrollView style={{ backgroundColor: theme.backgroundColor }}>
        {languages.map(({ name, code }) => (
          <LanguageCategory
            key={code}
            name={name}
            active={langCode === code}
            onPress={() => {
              setLanguage(code);
              goBackSafe(navigation);
            }}
            isPortrait={isPortrait}
            height={height}
            width={width}
          />
        ))}
      </ScrollView>
      {/*AdMob banner*/}
      {/*<AdBanner />*/}
    </>
  )
);

Language.propTypes = {
  setLanguage: RNPropTypes.func,
  langCode: RNPropTypes.string,
  navigation: PropTypes.shape({
    goBack: RNPropTypes.func,
  }),
  isPortrait: RNPropTypes.bool,
  height: RNPropTypes.number,
  width: RNPropTypes.number,
};

const mapStateToProps = ({
  language: { langCode },
  dimensions: { isPortrait, height, width },
}) => ({
  langCode,
  isPortrait,
  height,
  width,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (code) => dispatch(languageSet(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
