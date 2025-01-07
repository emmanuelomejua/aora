import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { images } from '@/constants';
import CustomBotton from './CustomBotton';
import { router } from 'expo-router';



type EType = {
    title: string;
    subtitle: string;
}

const EmptyState: FC<EType> = ({title, subtitle}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />

        <Text className='text-xl font-psemibold text-white text-center mt-2'>{title}</Text>
        <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

        <CustomBotton 
            title='Create Video' 
            handlePress={() => router.push('/create')}
            containerStyles='w-full my-5'
        />
    </View>
  )
}

export default EmptyState;
