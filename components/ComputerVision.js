import React, {useRef, useCallback, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import {View, Text} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import * as Progress from 'react-native-progress';

const ComputerVision = ({navigation}) => {
  const images = ['Cat', 'Dog', 'Skull'];

  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  }, []);

  const readAndReshapeImage = async filePath => {
    const options = {mode: 'stretch'};
    const newPath = await ImageResizer.createResizedImage(
      filePath,
      64,
      64,
      'JPEG',
      100,
      0,
      undefined,
      false,
      options,
    );
    const response = await RNFS.readFile(newPath.path, 'base64');
    return response;
  };

  const takePicture = async () => {
    setLoading(true);
    const photo = await camera.current.takePhoto({
      flash: 'off',
    });
    const base64 = await readAndReshapeImage(photo.path);
    const response = await axios
      .post('http://192.168.0.101:8000/imageclassification/predict/', {base64})
      .catch(e => console.log(e));
    const index = await response.data;
    setLoading(false);
    navigation.navigate('ARVision', {
      modelIndex: index,
    });
  };

  const renderCamera = () => {
    if (device == null) {
      return <View style={{flex: 1}}></View>;
    } else {
      return (
        <React.Fragment>
          <Camera
            style={StyleSheet.absoluteFill}
            ref={camera}
            device={device}
            isActive={true}
            enableZoomGesture
            photo={true}
          />
          <TouchableOpacity
            onPress={takePicture}
            style={styles.buttonContainer}></TouchableOpacity>
        </React.Fragment>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}>
          <ActivityIndicator size={50} color="#00ff00" />
        </View>
      ) : (
        <View></View>
      )}
      {renderCamera()}
    </View>
  );
};

const styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    position: 'absolute',
    left: '50%',
    top: '80%',
    width: 60,
    height: 60,
    transform: [{translateX: -30}],
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default ComputerVision;
