import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function UploadScreen({ navigation }) {
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();

      if (
        cameraStatus.status === 'granted' &&
        mediaStatus.status === 'granted'
      ) {
        setHasPermissions(true);
      } else {
        Alert.alert(
          'Permissions manquantes',
          'L\'application a besoin d\'accéder à la caméra et à la galerie.'
        );
      }
    })();
  }, []);

  const takeAndSavePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      try {
        const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
        Alert.alert('Succès', 'Photo enregistrée dans la galerie !');
      } catch (error) {
        Alert.alert('Erreur', 'Échec de l\'enregistrement de la photo.');
        console.error(error);
      }
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    if (!result.canceled) {
      Alert.alert("Style analysé", "Ton outfit a été analysé avec succès !");
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
        <Text style={styles.mainTitle}>👔 Outfit of the Day</Text>
        <Text style={styles.mainSubtitle}>
          Partage ton style et reçois des conseils mode personnalisés
        </Text>

        <View style={styles.card}>
          <View style={styles.outfitIcon}>
            <Text style={styles.outfitIconText}>👔</Text>
          </View>
          
          <Text style={styles.cardTitle}>Montre-nous ton outfit du jour !</Text>
          <Text style={styles.cardSubtitle}>
            Notre IA analysera ton style et te donnera des conseils
          </Text>

          {!hasPermissions ? (
            <TouchableOpacity style={styles.disabledButton} disabled>
              <Text style={styles.disabledButtonText}>Permission requise</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.galleryButton} onPress={pickFromGallery}>
                <Text style={styles.galleryButtonText}>📁 Galerie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButton} onPress={takeAndSavePhoto}>
                <Text style={styles.cameraButtonText}>📷 Appareil Photo</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: '#8b5cf6',
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
  outfitIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  outfitIconText: {
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
    backgroundColor: '#ec4899',
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
    backgroundColor: '#8b5cf6',
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
  disabledButton: {
    backgroundColor: '#d1d5db',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  disabledButtonText: {
    color: '#6b7280',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});