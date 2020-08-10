import React from 'react';
import {View, Text, Image} from 'react-native';

class Temp extends React.Component {
  render() {
    const {route} = this.props;
    const {image} = route.params;
    return (
      <View>
        <Text>Vivek</Text>
        <Image
          style={{height: '100%'}}
          resizeMode="contain"
          source={{uri: `data:image/gif;base64,${image}`}}
        />
      </View>
    );
  }
}

export default Temp;
