import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import Navigation from './components/Navigation';

import AR from './components/ARVision';
import VisionCamera from './components/ComputerVision';

const App = () => {
  const [augmentReality, setAugmentReality] = useState(false);
  // return (
  //   <View style={{flex: 1}}>
  //     {augmentReality ? <AR></AR> : <VisionCamera></VisionCamera>}
  //   </View>
  // );
  return <Navigation></Navigation>;
};

export default App;
