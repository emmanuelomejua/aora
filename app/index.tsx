import { Image, Platform, ScrollView, Text, View,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';;

import { images } from '@/constants';

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full h-full px-4 justify-center items-center'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain'/>
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain'/>
        </View>

        <View className='relative mt-5'>
          <Text className='rext-3xl text-white font-bold text-center'>

          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

