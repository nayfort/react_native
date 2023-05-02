/*Function run back screen*/
export const goBackSafe = (navigation) =>
  navigation.canGoBack && navigation.goBack();
