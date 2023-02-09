import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterialVideo,
  ViroMaterials,
} from '@viro-community/react-viro';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as fs from 'react-native-fs';

const HelloWorldSceneAR = props => {
  const data = props.sceneNavigator.viroAppProps;
  console.log(data);
  ViroMaterials.createMaterials({
    skull: {
      diffuseTexture: require('./assets/models/SkullObject/skull_image.jpg'),
    },
  });
  return (
    <ViroARScene>
      {data.object === 'skull' ? (
        <Viro3DObject
          source={require('./assets/models/Skull.obj')}
          scale={[0.02, 0.02, 0.02]}
          position={[0, -0.1, -1]}
          rotation={[-45, 45, 45]}
          materials={['skull']}
          type="OBJ"></Viro3DObject>
      ) : (
        <Viro3DObject
          source={require('./assets/models/Brain.obj')}
          scale={[0.5, 0.5, 0.5]}
          position={[0, -0.1, -1]}
          rotation={[-45, 45, 45]}
          type="OBJ"></Viro3DObject>
      )}
    </ViroARScene>
  );
};

export default () => {
  // const devices = useCameraDevices();
  // const device = devices.back;
  // const camera = useRef(null);

  // //Camera

  // //Handler
  // const requestCameraPermission = useCallback(async () => {
  //   const permission = await Camera.requestCameraPermission();
  //   if (permission === 'denied') await Linking.openSettings();
  // }, []);

  const [object, setObject] = useState('skull');
  const [augmentedReality, setAugmentedReality] = useState(false);

  const renderAR = () => {
    return (
      <React.Fragment>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
          viroAppProps={{object: object}}
          style={styles.f1}></ViroARSceneNavigator>
        <View
          style={{
            width: windowWidth,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            top: 600,
          }}>
          <TouchableOpacity style={styles.button}>
            <Entypo name="info" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Entypo name="info" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Entypo name="info" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  };

  // const takePicture = async () => {
  //   const photo = await camera.current.takePhoto({
  //     flash: 'off',
  //   });
  //   console.log(photo.uri);
  // };

  const renderCamera = () => {
    if (device == null) {
      return <View style={{flex: 1}}></View>;
    } else {
      return (
        <React.Fragment>
          <Camera style={StyleSheet.absoluteFill} />
          <TouchableOpacity
            onPress={takePicture}
            style={styles.buttonContainer}>
            {/* <Text style={styles.buttonText}>Capture</Text> */}
          </TouchableOpacity>
        </React.Fragment>
      );
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log(object);

  return (
    <View style={{flex: 1}}>
      {augmentedReality ? renderAR() : renderCamera()}
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
