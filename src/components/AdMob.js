import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

function AdMob() {
  return (
    <View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="your-ad-unit-id"
        servePersonalizedAds // true or false
      />
    </View>
  );
}

export default AdMob;
