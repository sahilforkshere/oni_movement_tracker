import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CounterScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000); 
    return () => clearInterval(t);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${m}:${sc}`;
  };

  const handleSave = async () => {
    const minsTaken = Math.ceil(seconds / 60) || 1; 

 
    const session = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' 
      }), 
      duration: minsTaken
    };

    try {
      const old = await AsyncStorage.getItem('dfm_sessions');
      const list = old ? JSON.parse(old) : [];
      list.push(session);
      
      await AsyncStorage.setItem('dfm_sessions', JSON.stringify(list));
      navigation.goBack(); 
    } catch (e) {
      console.log("save error", e);
    }
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity onPress={() => setInfoVisible(true)} style={styles.infoIcon}>
        <Text style={{fontSize: 26}}>ⓘ</Text>
      </TouchableOpacity>

      <Text style={styles.instr}>Stop recording after 10 kicks</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>

     
      <TouchableOpacity onPress={() => Alert.alert("Advice", "If you feel less than 10 kicks in 2 hours, contact your doctor.")}>
        <Text style={styles.advice}>What if I am not getting enough kicks?</Text>
      </TouchableOpacity>

      <Modal visible={infoVisible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Steps to count fetal kicks</Text>
            <Text style={styles.step}>1. Choose a time when you are least distracted.</Text>
            <Text style={styles.step}>2. Lie on your left side or sit with feet propped up.</Text>
            <Text style={styles.step}>3. Place your hands on your belly.</Text>
            <Text style={styles.step}>4. Start a timer or watch the clock.</Text>
            <Text style={styles.step}>5. Count each kick until you reach 10.</Text>
            <Text style={styles.step}>6. Once you reach 10 kicks, save the session.</Text>
            <TouchableOpacity onPress={() => setInfoVisible(false)} style={styles.close}>
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
  infoIcon: { position: 'absolute', top: 50, right: 25 },
  instr: { fontSize: 18, marginBottom: 10, color: '#555' },
  timer: { fontSize: 72, fontWeight: 'bold', color: '#E74C3C', marginBottom: 40 },
  saveBtn: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 70, borderRadius: 30 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  advice: { marginTop: 20, textDecorationLine: 'underline', color: '#000' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 30 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  step: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
  close: { marginTop: 10, alignSelf: 'center' }
});