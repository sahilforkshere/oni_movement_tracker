import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('dfm_sessions'); //storage
      if (value) {
        const parsed = JSON.parse(value); 
     
        setHistory(parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DFM (Kick counter)</Text>
      
     
      <View style={styles.article}>
        <Text style={{color: '#888'}}>article Placeholder</Text>
      </View>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate('Counter')}
      >
        <Text style={styles.btnText}>Record fetal movement</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Past records</Text>
      
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.displayDate}</Text>
            <Text style={{fontWeight: '600'}}>{item.duration} mins</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: 
  
  { flex: 1, backgroundColor: '#fff', padding: 20 }
  
  ,
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  article: { height: 120, backgroundColor: '#f2f2f2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  btn: { borderWidth: 1, padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 30 },
  btnText: { fontSize: 16, fontWeight: '600' },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }
});