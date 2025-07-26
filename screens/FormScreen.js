import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';

// test
import { postTestMessage } from '../api/testApiPython'; // Assurez-vous que le chemin est correct

export default function FormScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);

  // const handleSubmit = () => {
  //   if (input.trim()) {
  //     // Alert.alert("Message analysé", "Votre message : ""${input}" "a été analysé avec succès !");
  //     Alert.alert("Message analysé", `Votre message : "${input}" a été analysé avec succès !`);
  //     setInput('');
  //     setCharCount(0);
  //   } else {
  //     Alert.alert("Erreur", "Veuillez entrer un message avant d'analyser.");
  //   }
  // };

  
  // test
  const handleSubmit = async () => {
  if (input.trim()) {
    try {
      const response = await postTestMessage({ message: input.trim() });
      Alert.alert("Message analysé", `Réponse du serveur : ${response.result || 'Succès !'}`);
      setInput('');
      setCharCount(0);
    } catch (error) {
      Alert.alert("Erreur serveur", "Impossible d'analyser le message.");
      console.error(error);
    }
  } else {
    Alert.alert("Erreur", "Veuillez entrer un message avant d'analyser.");
  }
};

  const handleTextChange = (text) => {
    if (text.length <= 200) {
      setInput(text);
      setCharCount(text.length);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>💜 AI'm yours</Text>
        <Text style={styles.subtitle}>Flirt awake. Snore asleep. Win always</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.tabIcon}>📷</Text>
          <Text style={styles.tabText}>Mood detector</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => navigation.navigate('Text')}
        >
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={styles.tabText}>Pick-up line of day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabIcon}>💬</Text>
          <Text style={[styles.tabText, styles.activeTabText]}>Cringe-ometre</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.tabIcon}>👔</Text>
          <Text style={styles.tabText}>Outfit of the Date</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>💬 Test de Drague</Text>
        <Text style={styles.mainSubtitle}>
          Teste tes messages et reçois des conseils d'expert
        </Text>

        <View style={styles.card}>
          <Text style={styles.formTitle}>Écris ton message de séduction :</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Salut ! J'ai remarqué ton sourire depuis l'autre bout de la pièce..."
            value={input}
            onChangeText={handleTextChange}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <View style={styles.charCountContainer}>
            <Text style={styles.charCountText}>Maximum 200 caractères</Text>
            <Text style={[styles.charCount, charCount > 180 && styles.charCountWarning]}>
              {charCount}/200
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, !input.trim() && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!input.trim()}
          >
            <Text style={styles.submitButtonText}>✈️ Analyser mon message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#f97316',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  mainContent: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    minHeight: 100,
    marginBottom: 10,
  },
  charCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  charCountText: {
    fontSize: 12,
    color: '#6b7280',
  },
  charCount: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  charCountWarning: {
    color: '#ef4444',
  },
  submitButton: {
    backgroundColor: '#fb923c',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});