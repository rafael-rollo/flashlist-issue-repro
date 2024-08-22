/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ScaledSize,
  useWindowDimensions,
  Button,
} from 'react-native';
import tinycolor from 'tinycolor2';

import {Header} from 'react-native/Libraries/NewAppScreen';

const CARD_SIZE = {
  width: 152,
  height: 220,
};

const LIST_CONTAINER_PADDING = 32;

const LIST_SIZE = (window: ScaledSize) => ({
  height: CARD_SIZE.height + LIST_CONTAINER_PADDING * 2,
  width: window.width,
});

type Card = {
  color: string;
};

const HeaderFooter = () => {
  return <View style={{width: 20}} />;
};

const Separator = () => {
  return <View style={{width: 8}} />;
};

const Card = ({color}: {color: string}) => {
  const backgroundColor = tinycolor(color).setAlpha(0.5).toRgbString();
  return (
    <TouchableHighlight
      style={{
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        borderRadius: 8,
      }}
      onPress={() => console.warn('it worked!')}>
      <Text>press me</Text>
    </TouchableHighlight>
  );
};

const data: Card[] = [
  {color: 'yellow'},
  {color: 'red'},
  {color: 'green'},
  {color: 'blue'},
  {color: 'brown'},
];

const App = () => {
  const window = useWindowDimensions();

  const [items, setItems] = useState<Card[]>(data.slice(0, 1));

  const renderItem = ({item}: {item: Card}) => {
    return <Card color={item.color} />;
  };

  const keyExtractor = ({color}: {color: string}) => color;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <FlashList
          contentContainerStyle={{
            paddingVertical: LIST_CONTAINER_PADDING,
          }}
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedListSize={LIST_SIZE(window)}
          estimatedItemSize={CARD_SIZE.width}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={HeaderFooter}
          ListFooterComponent={HeaderFooter}
          ItemSeparatorComponent={Separator}
          removeClippedSubviews
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
          }}>
          <Button
            title="toogle list"
            onPress={() => setItems(items.length > 1 ? data.slice(0, 1) : data)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
