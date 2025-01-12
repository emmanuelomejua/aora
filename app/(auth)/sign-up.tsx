import {  Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';

import { images } from '@/constants';
import CustomBotton from '@/components/CustomBotton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';
import { useAuthContext } from '@/context/AuthContext';

const SignUp = () => {

  const {dispatch} = useAuthContext();
  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false)
  
  
  const submit = async () => {
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error', 'Please fill out the field')
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      dispatch({type: 'SET_USER', payload: result});
      dispatch({type: 'SET_LOGGED_IN', payload: true})
    
      router.replace('/home')
    } catch (error: any) {
      setLoading(false)
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
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
            placeholder='Email' otherStyles='mt-4' 
            keyboardType="email-address"
            handleChangeText={(e: any) => setForm({...form, email: e})}/>

            <FormField 
            title='Username' 
            value={form.username} placeholder='Username' otherStyles='mt-10' 
            handleChangeText={(e: any) => setForm({...form, username: e})}/>

            <FormField 
            title='Password' 
            value={form.password} placeholder='Password' otherStyles='mt-7' 
            handleChangeText={(e: any) => setForm({...form, password: e})}/>



            <CustomBotton title='Sign Up' handlePress={submit} containerStyles='mt-7' isLoading={loading}/>

            <View className='flex-row justify-center pt-4 gap-2'>
              <Text className='text-gray-100 text-lg font-pregular'>
                Already have an account?
              </Text>
              <Link href='/sign-in' className='text-secondary font-psemibold text-lg'>Sign In</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

