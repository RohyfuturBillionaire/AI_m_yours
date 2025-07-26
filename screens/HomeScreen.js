
import React, { useEffect , useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// test
import { postPhoto } from '../api/testApiPython'; // Assurez-vous que le chemin est correct

export default function HomeScreen({ navigation }) {

// test 
const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus.status !== 'granted') {
        Alert.alert("Permission refusée", "La permission d'utiliser la caméra est requise.");
      }

      if (mediaStatus.status !== 'granted') {
        Alert.alert("Permission refusée", "La permission d'accéder à la galerie est requise.");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.canceled) {
      Alert.alert("Photo prise", "Image capturée avec succès !");
    }
  };

    // const pickImage = async () => {
    //   const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    //   if (!result.canceled) {
    //     // test
    //     setPhoto(result.assets[0]);

    //     try {
    //     const response = await postPhoto(result.uri);
    //     Alert.alert("Analyse terminée", `Résultat : ${response.result || 'Succès'}`);
    //   } catch (error) {
    //     Alert.alert("Erreur", "Impossible d'envoyer l'image au serveur.");
    //     console.error(error);
    //   }
    //     // Alert.alert("Image choisie", "Image sélectionnée !");
    //   }
    // };

    const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const image = result.assets[0];
    setPhoto(image); // Enregistre l’image dans le state si besoin

    try {
      const response = await postPhoto(image.uri); // <- CORRECTION ICI
      Alert.alert("Analyse terminée", `Résultat : ${response.result || 'Succès'}`);
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'envoyer l'image au serveur.");
      console.error(error);
    }
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
        <Text style={styles.mainTitle}>💙 Détecteur d'Émotion</Text>
        <Text style={styles.mainSubtitle}>
          Découvre ton état d'esprit actuel et reçois des conseils personnalisés
        </Text>

        <View style={styles.card}>
          <View style={styles.cameraIcon}>
            <Text style={styles.cameraIconText}>📷</Text>
          </View>
          
          <Text style={styles.cardTitle}>Prends une photo ou choisis-en une</Text>
          <Text style={styles.cardSubtitle}>
            L'IA analysera ton expression pour détecter ton humeur
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.galleryButtonText}>📁 Galerie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <Text style={styles.cameraButtonText}>📷 Appareil Photo</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#3b82f6',
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
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cameraIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cameraIconText: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  galleryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  galleryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  cameraButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});