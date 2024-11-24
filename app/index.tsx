import { Image, Platform, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View  className="flex-1 items-center justify-center bg-white">
      <Text className='text-xl'>Aora!!!</Text>
      <StatusBar style='auto'/>
      <Link href='/profile' style={{color: 'blue'}}>Go to Profile</Link>
    </View>
  );
}

