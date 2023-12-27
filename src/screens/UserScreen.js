import React from 'react';
import {Alert, Text, View} from 'react-native';
import {client} from '../apis/common';
import {useSWRConfig} from 'swr';
import {Button} from 'react-native-ios-kit';

const UserScreen = () => {
  const {mutate} = useSWRConfig();
  const clearCache = () => mutate(() => true, undefined, {revalidate: false});

  async function logout() {
    Alert.alert('確定登出？', '', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '確定',
        onPress: () => {
          client.post('auth/signout').then(() => {
            clearCache();
          });
        },
      },
    ]);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>User Page</Text>
      <Button onPress={() => logout()} >Logout</Button>
    </View>
  );
};

export default UserScreen;
