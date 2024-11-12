import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo';

const index = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View className='container'>
      <Image source={require('@/assets/images/thread-bg.png')} className='w-vw h-[250px] object-cover' />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.medium} className='heading'>How would you like to use Threads?</Text>
        <TouchableOpacity onPress={handleFacebookLogin}>
          <View className='bg-white border border-gray-200 rounded-md p-4 mx-5 shadow-[4px]'>
            {/* First Child */}
            <View className='center'>
              <Image source={require('@/assets/images/insta.png')} className='size-15' />
              <Text style={styles.medium} className='text-[15px]'>Continue with Instagarm</Text>
              <Ionicons name='chevron-forward' size={24} />
            </View>
            {/* Second Child */}
            <Text className='text-xs text-gray-400 font-dmSans pt-3'>Log in or create a Thread profile with your Instagram account. With a profile, you can post, interact, and get personalised recommendations.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleLogin}>
          <View className='bg-white border border-gray-200 rounded-md p-4 mx-5 shadow-[4px]'>
            {/* First Child */}
            <View className='center'>
              <Text style={styles.medium} className='text-[15px]'>Continue with Google</Text>
              <Ionicons name='chevron-forward' size={24} />
            </View>
            {/* Second Child */}
            <Text className='text-xs text-gray-400 font-dmSans pt-3'>Log in or create account with your Google account. With a profile, you can post, interact, and get personalised recommendations.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className='bg-white border border-gray-200 rounded-md p-4 mx-5 shadow-[4px]'>
            {/* First Child */}
            <View className='center'>
              <Text style={styles.medium} className='text-[15px]'>Use without a profile</Text>
              <Ionicons name='chevron-forward' size={24} />
            </View>
            {/* Second Child */}
            <Text className='text-xs text-gray-400 font-dmSans pt-3'>You can browse Threads without a profile, but won't be able to post, interact, or get personalised recommendations.</Text>
          </View>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  regular: {
    fontFamily: 'DMSans_400Regular'
  },
  medium: {
    fontFamily: 'DMSans_500Medium'
  },
  bold: {
    fontFamily: 'DMSans_700Bold'
  }
})