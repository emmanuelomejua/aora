import {  Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';

import { images } from '@/constants';
import CustomBotton from '@/components/CustomBotton';
import { Link } from 'expo-router';


const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false)


  const submit = async () => {
    
    try {

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView >
        <View className='w-full flex justify-center min-h-[85vh] px-4 my-6'>
            <Image source={images.logo} resizeMode='contain' className='w-[135px] h-[35px]'/>
            <Text className='text-2xl font-semibold text-white mt-10 font-psemibol'>Log in to Aora</Text>

            <FormField 
            title='Email' value={form.email} 
            placeholder='' otherStyles='mt-4' 
            keyboardType="email-address"
            handleChangeText={(e: any) => setForm({...form, email: e})}/>

            <FormField 
            title='Password' 
            value={form.password} placeholder='' otherStyles='mt-7' 
            handleChangeText={(e: any) => setForm({...form, password: e})}/>

            <CustomBotton title='Sign In' handlePress={submit} containerStyles='mt-7' isLoading={loading}/>

            <View className='flex-row justify-center pt-4 gap-2'>
              <Text className='text-gray-100 text-lg font-pregular'>
                Don't have an account?
              </Text>
              <Link href='/sign-up' className='text-secondary font-psemibold text-lg'>Sign Up</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

