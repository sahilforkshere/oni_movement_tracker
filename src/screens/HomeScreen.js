import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [records, setRecords] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadRecords();
  }, [isFocused]);

  const loadRecords = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dfm_sessions'); 
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const sorted = parsedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setRecords(sorted);
      }
    } catch (e) {
      console.error("Failed to load:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DFM (Kick counter)</Text>
      
  
      <View style={styles.articleCard}>
        <Text style={styles.articleText}>Article Placeholder</Text>
      </View>

      <TouchableOpacity 
        style={styles.recordBtn} 
        onPress={() => navigation.navigate('Counter')}
      >
        <Text style={styles.btnText}>Record fetal movement</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Past records</Text>
      
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordRow}>
            <Text style={styles.recordDate}>{item.displayDate}</Text>
            <Text style={styles.recordDuration}>{item.duration} mins</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No records found yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  articleCard: { height: 120, backgroundColor: '#f5f5f5', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  articleText: { color: '#888' },
  recordBtn: { borderWidth: 1, borderColor: '#000', padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 30 },
  btnText: { fontWeight: '600' },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  recordRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  recordDate: { fontSize: 16 },
  recordDuration: { fontSize: 16, fontWeight: '500' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 }
});