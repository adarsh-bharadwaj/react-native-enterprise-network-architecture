import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useUsers } from '../features/users/useUsers';

export const HomeScreen = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Error loading users</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};