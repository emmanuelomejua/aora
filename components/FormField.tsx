import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { FC, useState } from 'react';

import { icons } from '@/constants';



type formType = {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (e: any) => void;
    otherStyles: string
    keyboardType?: string;
}

const FormField:FC<formType> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false);
    
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='border-black-200 border-2 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput 
            className='flex-1 text-base text-white font-psemibold'
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' &&
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
        </TouchableOpacity>}

      </View>
    </View>
  )
}

export default FormField;
