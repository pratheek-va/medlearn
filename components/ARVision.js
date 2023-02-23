import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
  Text,
  Linking,
} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterialVideo,
  ViroMaterials,
  ViroNode,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ARModel = props => {
  const modelIndex = props.sceneNavigator.viroAppProps.modelIndex;
  const models = [
    {
      model: require('./../assets/models2/brain.glb'),
      scale: [0.5, 0.5, 0.5],
      rotate: [-45, 45, 45],
      position: [0, 0.1, 0],
    },
    {
      model: require('./../assets/models2/realistic_human_heart.glb'),
      scale: [0.1, 0.1, 0.1],
      rotate: [-45, 45, 45],
      position: [0, 0, -1],
    },
    {
      model: require('./../assets/models2/human_skull.glb'),
      scale: [0.5, 0.5, 0.5],
      rotate: [-45, 45, 45],
      position: [0, 0.1, 0],
    },
  ];

  const [rotation, setRotation] = useState(models[modelIndex].rotate);
  const [scale, setScale] = useState(models[modelIndex].scale);

  const _onRotate = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ];
      setRotation(currentRotation);
    }
  };

  const _onScale = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      const newScale = [
        scale[0] * scaleFactor,
        scale[1] * scaleFactor,
        scale[2] * scaleFactor,
      ];
      setScale(newScale);
    }
  };

  return (
    <ViroARScene>
      <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => {}}>
        <ViroAmbientLight color="#ffffff" intensity={800} />
        <Viro3DObject
          source={models[modelIndex].model}
          type="GLB"
          rotation={rotation}
          scale={scale}
          onRotate={_onRotate}
          onPinch={_onScale}
          position={models[modelIndex].position}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const ARVision = ({route, navigation}) => {
  const modelIndex = route.params.modelIndex;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator
        initialScene={{scene: ARModel}}
        autofocus={true}
        viroAppProps={{modelIndex: modelIndex}}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComputerVision')}>
          <FontAwesome name="camera" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Entypo name="info" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Entypo name="info" size={30} color="white" />
        </TouchableOpacity>
      </View>
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

export default ARVision;
