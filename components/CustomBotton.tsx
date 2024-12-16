import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react';


type BtnType = {
    title: string;
    handlePress: () => void;
    containerStyles: string;
    isLoading?: boolean
    textStyles?: string
}

const CustomBotton:FC<BtnType> = ({title, handlePress, containerStyles, isLoading, textStyles }) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.7}
    disabled={isLoading}
    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} 
    onPress={handlePress}>
      <Text className={`text-primary text-lg font-pbold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBotton;
