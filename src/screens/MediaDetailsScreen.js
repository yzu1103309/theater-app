import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Image,
  ImageBackground,
  ImageBackgroundComponent,
  ImageBackgroundBase,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import Icon from '../components/shared/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import FavoriteButton from '../components/shared/FavoriteButton';
import {Button} from 'react-native-ios-kit';
import {urlPrefix, vlcPrefix} from '../data';
import {LinearGradient} from 'expo-linear-gradient';
import Stars from 'react-native-stars';
import Spinner from 'react-native-loading-spinner-overlay';

const MediaDetailsScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(0);
  const insets = useSafeAreaInsets();
  const {item} = route.params;
  async function openURL() {
    const url =
      vlcPrefix +
      urlPrefix +
      item.type +
      `/${item.id}/movie${item.ext}&sub=${urlPrefix + item.type}/${
        item.id
      }/movie${item.subExt}`;
    const supported = await Linking.canOpenURL(url);
    console.log(url, supported);
    await Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Spinner
        visible={!!loading}
        overlayColor={'rgba(255,255,255,0.8)'}
        color={colors.black}
        animation={'fade'}
      />
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top}]}
        animation={'fadeIn'}
        delay={200}
        duration={300}
        easing="ease-in-out">
        <Icon
          icon="Back"
          viewStyle={styles.backIcon}
          size={28}
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton, {marginTop: insets.top}]}
        animation="fadeIn"
        delay={200}
        duration={300}
        easing="ease-in-out">
        <FavoriteButton onPress={() => {}} />
      </Animatable.View>
      <ImageBackground
        imageStyle={{height: '100%'}}
        style={[styles.imgBG, {marginTop: insets.top + 20}]}
        source={{uri: item.fanart}}
        onLoadStart={() => setLoading(loading + 1)}
        onLoadEnd={() => setLoading(loading - 1)}
        resizeMode={'cover'}>
        <LinearGradient
          colors={[
            'rgba(251,251,251,1)',
            'rgba(251,251,251,0.5)',
            'rgba(251,251,251,0.2)',
            'rgba(251,251,251,0.3)',
            'rgba(251,251,251,0.7)',
            'rgba(251,251,251,0.8)',
            'rgba(251,251,251,0.9)',
            'rgba(251,251,251,1)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            height: '100%',
            flexDirection: 'row',
          }}>
          <View style={styles.posterContainer}>
            <Image
              style={styles.poster}
              resizeMode={'contain'}
              onLoadStart={() => setLoading(loading + 1)}
              onLoadEnd={() => setLoading(loading - 1)}
              source={{uri: item.thumb}}
            />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={{fontSize: 18, maxWidth: '55%'}}>{item.title}</Text>
              <Text style={{fontSize: 12, marginTop: '2%'}}>
                國家：{item.country}、年份：{item.year}
              </Text>
              <View style={styles.stars}>
                <Stars
                  count={10}
                  spacing={2}
                  display={item.rating}
                  fullStar={
                    <Icon icon={'FullStar'} size={14} style={styles.fullStar} />
                  }
                  emptyStar={
                    <Icon
                      icon={'FullStar'}
                      size={14}
                      style={[styles.fullStar, {tintColor: colors.gray}]}
                    />
                  }
                />
                <Text style={styles.label}>{item.rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.plotContainer}>
          <Text style={{fontSize: 16, marginBottom: spacing.s}}>
            劇情簡介：
          </Text>
          <Text>{item.plot}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            theme={{primaryColor: '#03B3E3'}}
            style={[styles.btn, {width: '49%'}]}
            innerStyle={styles.btnText}
            inverted
            rounded
            onPress={() => {
              navigation.navigate('TMDB', {type: item.type, tmdb: item.tmdb});
            }}>
            TMDB
          </Button>
          <Button
            theme={{primaryColor: '#F5C518'}}
            color={'black'}
            style={[styles.btn, {width: '49%'}]}
            innerStyle={styles.btnText}
            inverted
            rounded
            onPress={() => {
              navigation.navigate('IMDB', {imdb: item.id});
            }}>
            IMDB
          </Button>
        </View>
        <Button
          theme={{primaryColor: '#2ECC71'}}
          style={styles.btn}
          innerStyle={styles.btnText}
          inverted
          rounded
          onPress={() => {
            if (item.type === 'movies') {
              openURL();
            } else {
              navigation.navigate('EPList', {id: item.id});
            }
          }}>
          {(item.type === 'movies' && '▶ 立即觀看') ||
            (item.type === 'tvshows' && '▲ 查看劇集清單')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  imgBG: {
    height: '30%',
  },
  content: {
    paddingHorizontal: spacing.l + 4,
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
    zIndex: 1,
  },
  backIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
  favoriteButton: {
    position: 'absolute',
    right: spacing.l,
    zIndex: 1,
  },
  btn: {
    marginBottom: spacing.s,
    borderRadius: sizes.radius,
    shadowColor: colors.lightGray,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  btnText: {
    fontWeight: 'bold',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  posterContainer: {
    height: '70%',
    width: '35%',
    marginTop: '9%',
    marginLeft: '5%',
    shadowColor: colors.black,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  titleContainer: {
    height: '27%',
    marginBottom: '10%',
    marginLeft: '1%',
  },
  rightContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: '2%',
    marginLeft: '-0.5%',
  },
  fullStar: {
    tintColor: '#ffDD00',
    shadowColor: colors.gray,
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
  },
  label: {
    fontSize: 12,
    marginLeft: 5,
  },
  plotContainer: {
    height: '64%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MediaDetailsScreen;
