import { Image, Platform, ScrollView, Text, View,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import 'react-native-url-polyfill/auto'

import { images } from '@/constants';
import CustomBotton from '@/components/CustomBotton';
import { useAuthContext } from '@/context/AuthContext';

export default function App() {

  const { state: { loading, loggedIn }} = useAuthContext();

  if(!loading && loggedIn) return <Redirect href='/home' />


  return (
    <SafeAreaView className='bg-primary px-4 flex-1 justify-center items-center'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='w-full justify-center items-center'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain'/>
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain'/>
        </View>

        <View className='relative mt-4'>
          <Text className='text-3xl text-white font-bold text-center'>
            Discover endless possibilities with {' '}<Text className='text-secondary-200'>Aora</Text>
          </Text>

          <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain'/>
        </View>

        <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
        </Text>

        <CustomBotton title='Continue with email' handlePress={() => router.push('/sign-in')} containerStyles='w-full  mt-7'/>
      </ScrollView>
      
      <StatusBar backgroundColor='#161622' style='light'/>

    </SafeAreaView>
  );
}

