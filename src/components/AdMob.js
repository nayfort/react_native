// import React from 'react';
// import { View } from 'react-native';
// import { AdMobBanner } from 'expo-ads-admob';
//
// function AdMob() {
//   return (
//     <View>
//       <AdMobBanner
//         bannerSize="fullBanner"
//         adUnitID="your-ad-unit-id"
//         servePersonalizedAds // true or false
//       />
//     </View>
//   );
// }
//
// export default AdMob;


////////////////////////////////////////////


import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';


export default class Banner extends React.PureComponent {
    state = {
        height: 0,
    };

    render() {
        const { setHeight } = this.props;
        const { height } = this.state;

        const isIOS = Platform.OS === 'ios';
        /*AdMob banner ID*/
        const bannerID = isIOS
            ? 'ca-app-pub-5790875057771465/8882733700'
            : 'ca-app-pub-5790875057771465/4484942244';

        return (
            <View
                style={{
                    height,
                    bottom: 0,
                }}
            >
                <AdMobBanner
                    ref={(ref) => (this.adMob = ref)}
                    bannerSize="smartBannerPortrait"
                    adUnitID={bannerID}
                    onAdViewDidReceiveAd={() => {
                        const { height } = this.adMob.state.style;
                        this.setState({ height });
                        setHeight({ height });
                    }}
                    onDidFailToReceiveAdWithError={(e) => {
                        console.log('onDidFailToReceiveAdWithError', e);
                    }}
                />
            </View>
        );
    }
}

Banner.propTypes = {
    setHeight: PropTypes.func,
};

Banner.defaultProps = {
    setHeight: () => {},
};

export const getInterstitialAd = async () => {
    /*AdMob interstitial ID*/
    const interstitialID =
        Platform.OS === 'ios'
            ? 'ca-app-pub-5790875057771465/3015135830'
            : 'ca-app-pub-5790875057771465/8224058464';

    await AdMobInterstitial.setAdUnitID(interstitialID);
    await AdMobInterstitial.requestAdAsync();
};

AdMobInterstitial.addEventListener('interstitialDidFailToLoad', (e) => {
    console.log('interstitialDidFailToLoad', e);
});

let adStartTime,
    lastTimeShown = 0;
/*Start show AdMob*/
AdMobInterstitial.addEventListener('interstitialDidOpen', () => {
    adStartTime = Date.now();
});

/*End show AdMob*/
AdMobInterstitial.addEventListener('interstitialDidClose', () => {
    if (Date.now() - adStartTime < 5000) {
        lastTimeShown = 0;
    }
});

export const showInterstitialAd = async () => {
    if (Date.now() - lastTimeShown < 0) {
        return;
    }
    const isReady = await AdMobInterstitial.getIsReadyAsync();
    if (!isReady) {
        return;
    }

    await AdMobInterstitial.showAdAsync();
    lastTimeShown = Date.now();
    await AdMobInterstitial.requestAdAsync();
};

