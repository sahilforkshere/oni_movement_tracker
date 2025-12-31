import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CounterScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000); 
    return () => clearInterval(t);
  }, []);

  const timeStr = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${m}:${sc}`;
  };

  const save = async () => {
    const mins = Math.ceil(seconds / 60) || 1; // convert to mins for record//
    const entry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' 
      }),
      duration: mins
    };

    try {
      const old = await AsyncStorage.getItem('dfm_sessions');
      const list = old ? JSON.parse(old) : [];
      list.push(entry);
      await AsyncStorage.setItem('dfm_sessions', JSON.stringify(list)); 
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
   
      <TouchableOpacity onPress={() => setModal(true)} style={styles.info}>
        <Text style={{fontSize: 26}}>ⓘ</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Stop recording after 10 kicks</Text>
      <Text style={styles.timer}>{timeStr(seconds)}</Text>

      <TouchableOpacity style={styles.save} onPress={save}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Save</Text>
      </TouchableOpacity>

      
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Steps to count fetal kicks</Text>
           
            <Text style={styles.step}>1. Choose a time when you are least distracted.</Text>
            <Text style={styles.step}>2. Lie on your left side or sit with feet propped up.</Text>
            <Text style={styles.step}>3. Place your hands on your belly.</Text>
            <Text style={styles.step}>4. Start a timer or watch the clock.</Text>
            <Text style={styles.step}>5. Count each kick until you reach 10.</Text>
            <Text style={styles.step}>6. Once you reach 10 kicks, save the session.</Text>
            <TouchableOpacity onPress={() => setModal(false)} style={{marginTop: 10, alignSelf: 'center'}}>
              <Text style={{color: '#007AFF'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  info: { position: 'absolute', top: 50, right: 25 },
  label: { fontSize: 18, color: '#555', marginBottom: 15 },
  timer: { fontSize: 72, fontWeight: 'bold', color: '#F25C54' },
  save: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 70, borderRadius: 30, marginTop: 40 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 30 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  step: { fontSize: 16, marginBottom: 12, lineHeight: 22 }
});