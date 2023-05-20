// import React from 'react';
// import PropTypes from 'prop-types';
// import { View, Platform } from 'react-native';
// import Constants from 'expo-constants/build/Constants';
// import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
//
// export default class AdBanner extends React.PureComponent {
//     state = {
//         height: 0,
//     };
//
//     async componentDidMount() {
//         const interstitialID =
//             Platform.OS === 'ios'
//                 ? 'ca-app-pub-5790875057771465/3015135830'
//                 : 'ca-app-pub-5790875057771465/8224058464';
//
//         await AdMobInterstitial.setAdUnitID(interstitialID);
//         await AdMobInterstitial.requestAdAsync();
//
//         AdMobInterstitial.addEventListener('interstitialDidFailToLoad', (e) => {
//             console.log('interstitialDidFailToLoad', e);
//         });
//
//         let adStartTime,
//             lastTimeShown = 0;
//
//         AdMobInterstitial.addEventListener('interstitialDidOpen', () => {
//             adStartTime = Date.now();
//         });
//
//         AdMobInterstitial.addEventListener('interstitialDidClose', () => {
//             if (Date.now() - adStartTime < 5000) {
//                 lastTimeShown = 0;
//             }
//         });
//
//         this.showInterstitialAd = async () => {
//             if (Date.now() - lastTimeShown < 0) {
//                 return;
//             }
//             const isReady = await AdMobInterstitial.getIsReadyAsync();
//             if (!isReady) {
//                 return;
//             }
//
//             await AdMobInterstitial.showAdAsync();
//             lastTimeShown = Date.now();
//             await AdMobInterstitial.requestAdAsync();
//         };
//     }
//
//     componentWillUnmount() {
//         AdMobInterstitial.removeAllListeners();
//     }
//
//     render() {
//         const { setHeight } = this.props;
//         const { height } = this.state;
//
//         const bannerID =
//             Constants.appOwnership === 'expo'
//                 ? 'ca-app-pub-5790875057771465/8882733700'
//                 : 'ca-app-pub-5790875057771465/4484942244';
//
//         return (
//             <View
//                 style={{
//                     height,
//                     bottom: 0,
//                 }}
//             >
//                 <AdBanner
//                     ref={(ref) => (this.adMob = ref)}
//                     bannerSize="smartBannerPortrait"
//                     adUnitID={bannerID}
//                     onAdViewDidReceiveAd={() => {
//                         const { height } = this.adMob.state.style;
//                         this.setState({ height });
//                         setHeight({ height });
//                     }}
//                     onDidFailToReceiveAdWithError={(e) => {
//                         console.log('onDidFailToReceiveAdWithError', e);
//                     }}
//                 />
//             </View>
//         );
//     }
// }
//
// AdBanner.propTypes = {
//     setHeight: PropTypes.func,
// };
//
// AdBanner.defaultProps = {
//     setHeight: () => {},
// };



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { useState, useEffect } from 'react';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true
});

export const Banner = ({ setHeight }) => {
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);
    let adStartTime, lastTimeShown = 0;
    const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                setInterstitialLoaded(true);
            }
        );

        const unsubscribeClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setInterstitialLoaded(false);
                interstitial.load();
            }
        );

        interstitial.load();

        return () => {
            unsubscribeClosed();
            unsubscribeLoaded();
        }
    }

    useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();

        return () => {
            unsubscribeInterstitialEvents();
        };
    }, [])

    useEffect(()=>{
        if (Date.now() - lastTimeShown < 0) {
            return;
        }
        if (interstitialLoaded) {
            interstitial.show()
        }
    },[interstitialLoaded])

    return (
        <SafeAreaView style={styles.container}>
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true
                }}
                onAdOpened={()=>{
                    adStartTime = Date.now();
                }}
                onAdClosed={()=>{
                    if (Date.now() - adStartTime < 60000) {
                        lastTimeShown = 0;
                    }
                }}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Banner;