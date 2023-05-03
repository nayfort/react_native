import React from 'react';
import RNPropTypes, {ViewPropTypes} from 'deprecated-react-native-prop-types';
import PropTypes from "prop-types";
import {
    TouchableOpacity,
    Animated,
    View,
    Easing,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import iconsSprite from '../assets/icons/imagesheet2.png';
import thumbIcon from '../assets/icons/thumb.png';
import repeatIcon from '../assets/icons/repeat.png';
import backIcon from '../assets/icons/left-arrow.png';
import uploadIcon from '../assets/icons/upload.png';
import translateIcon from '../assets/icons/translate.png';
import searchIcon from '../assets/icons/search.png';
import flipIcon from '../assets/icons/flip.png';
import full360Icon from '../assets/icons/360-degree.png';
import reverseIcon from '../assets/icons/reverse.png';

const img = resolveAssetSource(iconsSprite);

const Icon = React.memo((props) => {
  const { coordsEmpty, coordsFull, size, onPress, reverse } = props;
  const animationValue = new Animated.Value(reverse ? 1 : 0);

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -coordsEmpty.originX,
      coordsFull ? -coordsFull.originX : -coordsEmpty.originX,
    ],
  });
  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -coordsEmpty.originY,
      coordsFull ? -coordsFull.originY : -coordsEmpty.originY,
    ],
  });

  const fillIcon = () => {
    Animated.timing(animationValue, {
      toValue: reverse ? 0 : 1,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  const clearIcon = () => {
    Animated.timing(animationValue, {
      toValue: reverse ? 1 : 0,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={fillIcon}
      onPressOut={clearIcon}
      activeOpacity={1}
      onPress={onPress}
      style={{
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          transform: [{ scale: 0.58 }],
          height: size.height,
          width: size.width,
          overflow: 'hidden',
        }}
      >
        <Animated.Image
          source={iconsSprite}
          style={{
            height: img.height,
            width: img.width,
            resizeMode: 'contain',
            transform: [{ translateX }, { translateY }],
          }}
          {...props}
        />
      </View>
    </TouchableOpacity>
  );
});

Icon.propTypes = {
  coordsEmpty: PropTypes.shape({
    originX: RNPropTypes.number,
    originY: RNPropTypes.number,
  }),
  size: PropTypes.shape({
    width: RNPropTypes.number,
    height: RNPropTypes.number,
  }),
  coordsFull: PropTypes.shape({
    originX: RNPropTypes.number,
    originY: RNPropTypes.number,
  }),
  onPress: RNPropTypes.func,
  reverse: RNPropTypes.bool,
};

Icon.defaultProps = {
  coordsFull: null,
  onPress: null,
  reverse: false,
};

const NewIcon = React.memo((props) => {
  return (
    <View
      style={[
        {
          width: 55,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        },
        props.style,
      ]}
    >
      <TouchableOpacity
        onPress={props.onPress}
        style={{ justifyContent: 'center', height: 45 }}
      >
        <Animated.Image
          source={props.icon}
          style={[{ resizeMode: 'contain', width: 25 }, props.style]}
        />
      </TouchableOpacity>
    </View>
  );
});

NewIcon.propTypes = {
  onPress: RNPropTypes.func,
  style: ViewPropTypes.style,
};

NewIcon.defaultProps = {
  onPress: null,
  style: {},
};

export const LanguagesIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={translateIcon} />
);
export const BackIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={backIcon} />
);
export const SearchIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={searchIcon} />
);

export const LikeIcon = (props) => (
  <Icon
    coordsEmpty={{
      originX: 374,
      originY: 347,
    }}
    coordsFull={{
      originX: 282,
      originY: 343,
    }}
    size={{
      width: 50,
      height: 45,
    }}
    {...props}
  />
);

export const PlayIcon = (props) => (
  <Icon
    coordsEmpty={{
      originX: 104,
      originY: 246,
    }}
    coordsFull={{
      originX: 112,
      originY: 162,
    }}
    size={{
      width: 35,
      height: 42,
    }}
    {...props}
  />
);

export const PauseIcon = (props) => (
  <Icon
    coordsEmpty={{
      originX: 361,
      originY: 258,
    }}
    coordsFull={{
      originX: 183,
      originY: 250,
    }}
    size={{
      width: 35,
      height: 42,
    }}
    {...props}
  />
);

export const RotateIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={reverseIcon} />
);
export const ReRotateIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={reverseIcon} />
);
export const Icon360 = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={full360Icon} />
);

export const KnotIcon = (props) => (
  <Icon
    coordsEmpty={{
      originX: 390,
      originY: 806,
    }}
    coordsFull={{
      originX: 298,
      originY: 802,
    }}
    size={{
      width: 50,
      height: 60,
    }}
    {...props}
  />
);

export const MirrorLeftIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={flipIcon} />
);
export const MirrorRightIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={flipIcon} />
);
export const ShareIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={uploadIcon} />
);

const ThumbIcon = React.memo(({ onPress, style }) => (
  <View
    style={[
      {
        backgroundColor: '#F9AA33',
        width: 66,
        height: 66,
        borderRadius: 33,
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      },
      style,
    ]}
  >
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 66,
        justifyContent: 'center',
      }}
    >
      <Animated.Image
        source={thumbIcon}
        style={{ resizeMode: 'contain', width: 35 }}
      />
    </TouchableOpacity>
  </View>
));

ThumbIcon.propTypes = {
  onPress: RNPropTypes.func,
  style: ViewPropTypes.style,
};

ThumbIcon.defaultProps = {
  onPress: null,
  style: {},
};

export default ThumbIcon;

export const RepeatIcon = (props) => (
  <NewIcon style={props.style} onPress={props.onPress} icon={repeatIcon} />
);

RepeatIcon.propTypes = {
  onPress: RNPropTypes.func,
  style: ViewPropTypes.style,
};

RepeatIcon.defaultProps = {
  onPress: null,
  style: {},
};
