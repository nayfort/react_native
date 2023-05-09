import React from 'react';
import { Animated, Easing, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {ViewPropTypes} from "deprecated-react-native-prop-types";

export default class Animation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.animationValue = new Animated.Value(0);
    this.animationValue.addListener(({ value }) => {
      const { frameCount } = this.props;

      if (value >= 0 && value <= frameCount) {
        this.setState({ value });
      }
    });
    this.interpolationRange = {};

    this.state = this.calculateImageFramesSize();

    this.generateInterpolationRanges();
  }

  calculateImageFramesSize = () => {
    const { columns, rows, width, height } = this.props;

    let { frameHeight, frameWidth } = this.props;

    let ratio = 1;

    let imageHeight = frameHeight * rows;

    let imageWidth = frameWidth * columns;

    if (width) {
      ratio = (width * columns) / imageWidth;
      frameHeight = (imageHeight / rows) * ratio;
      imageHeight *= ratio;
      imageWidth = width * columns;
      frameWidth = width;
    } else if (height) {
      ratio = (height * rows) / imageHeight;
      imageHeight = height * rows;
      frameWidth = (imageWidth / columns) * ratio;
      imageWidth *= ratio;
      frameHeight = height;
    }

    return {
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
    };
  };

  /*Change knot image*/
  changeView = async (callBack) => {
    callBack();
    await this.setState(this.calculateImageFramesSize());
    await this.generateInterpolationRanges();
  };

  /*Get image frame coordination*/
  getFrameCoords = (i) => {
    const { columns } = this.props;
    const { frameHeight, frameWidth } = this.state;
    const currentColumn = i % columns;
    const x = -currentColumn * frameWidth;
    const y = -((i - currentColumn) / columns) * frameHeight;

    return {
      x,
      y,
    };
  };

  /*Generate all coords and frames*/
  generateInterpolationRanges = () => {
    const { frameCount } = this.props;
    const frameCoords = Array.from({ length: frameCount }, (_, i) =>
      this.getFrameCoords(i)
    );
    const input = [].concat(
      ...Array.from({ length: frameCount }, (_, i) => [i, i + 1])
    );
    const outputY = [].concat(...frameCoords.map(({ y }) => [y, y]));
    const outputX = [].concat(...frameCoords.map(({ x }) => [x, x]));

    this.interpolationRange = {
      translateY: {
        in: input,
        out: outputY,
      },
      translateX: {
        in: input,
        out: outputX,
      },
    };
  };

  stop = () => this.animationValue.stopAnimation();
  reset = () => this.animationValue.setValue(0);
  start = (speed = 50) => {
    const { frameCount, onEndAnimation, loop } = this.props;

    const animation = Animated.timing(this.animationValue, {
      toValue: frameCount,
      duration:
        ((frameCount - this.animationValue._value) / (speed / 2)) * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    if (loop) {
      animation.start(({ finished }) => {
        if (finished) {
          this.reset();
          const fullAnimation = Animated.timing(this.animationValue, {
            toValue: frameCount,
            duration: (frameCount / (speed / 2)) * 1000,
            easing: Easing.linear,
          });
          this.loopAnimation(fullAnimation);
        }
      });
    } else {
      animation.start(({ finished }) => {
        if (finished) {
          onEndAnimation();
        }
      });
    }
  };

  loopAnimation = (animation) => {
    animation.start(({ finished }) => {
      if (finished) {
        this.reset();
        this.loopAnimation(animation);
      }
    });
  };

  onSwipe = ({ nativeEvent }) => {
    let { value = 0, translationX } = this.state;
    const { loop, frameCount } = this.props;
    const currentX = nativeEvent.x;
    const direction = currentX <= translationX ? 'left' : 'right';

    if (Math.abs(currentX - translationX) > 1) {
      if (direction === 'left' && value >= 0) {
        value -= 1;
      } else if (value <= frameCount) {
        value += 1;
      }

      if (loop) {
        if (value > frameCount) {
          value = 0;
        } else if (value < 0) {
          value = frameCount;
        }
      }
      this.setState({
        translationX: currentX,
        value,
      });
      this.animationValue.setValue(value);
    }
  };

  onSwipeStateChanged = ({ nativeEvent }) => {
    const { onEndAnimation, onSwipe, frameCount } = this.props;
    const { value } = this.state;
    switch (nativeEvent.state) {
      case State.BEGAN: {
        onSwipe();
        this.setState({
          translationX: nativeEvent.x,
        });
        break;
      }
      case State.END: {
        if (value >= frameCount - 1) {
          onEndAnimation();
        }
        break;
      }
    }
  };

  render() {
    const { imageHeight, imageWidth, frameHeight, frameWidth } = this.state;
    const { style, source, onLoad } = this.props;

    const {
      translateY = { in: [0, 0], out: [0, 0] },
      translateX = { in: [0, 0], out: [0, 0] },
    } = this.interpolationRange || {};

    return (
      <PanGestureHandler
        onGestureEvent={this.onSwipe}
        onHandlerStateChange={this.onSwipeStateChanged}
      >
        <View
          style={[
            style,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <View
            style={{
              height: frameHeight,
              width: frameWidth,
              overflow: 'hidden',
            }}
          >
            <Animated.Image
              source={source}
              onLoad={onLoad}
              style={{
                height: imageHeight,
                width: imageWidth,
                transform: [
                  {
                    translateX: this.animationValue.interpolate({
                      inputRange: translateX.in,
                      outputRange: translateX.out,
                    }),
                  },
                  {
                    translateY: this.animationValue.interpolate({
                      inputRange: translateY.in,
                      outputRange: translateY.out,
                    }),
                  },
                ],
              }}
            />
          </View>
        </View>
      </PanGestureHandler>
    );
  }
}

Animation.propTypes = {
  source: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  frameHeight: PropTypes.number.isRequired,
  frameWidth: PropTypes.number.isRequired,
  frameCount: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  onEndAnimation: PropTypes.func,
  onSwipe: PropTypes.func,
  onLoad: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  loop: PropTypes.bool,
};

Animation.defaultProps = {
  style: {},
  onLoad: null,
  onEndAnimation: null,
  onSwipe: null,
  width: null,
  height: null,
  loop: false,
};
