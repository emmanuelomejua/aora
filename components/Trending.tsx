import { View, Text, FlatList } from 'react-native'
import React, { FC } from 'react';

type IPost = {
    posts: any[];
}

const Trending: FC<IPost> = ({posts}) => {
  return (
    <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({item}) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
        )}
        horizontal
    />
  )
}

export default Trending;
