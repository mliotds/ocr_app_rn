import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      loading: false,
      url: '',
      showModal: true,
    };
  }

  getUrl() {
    Alert.prompt('Enter URL', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: (url) => this.setState({url: url}),
      },
    ]);
  }

  componentDidMount() {
    this.getUrl();
  }

  capturePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
      };
      const {base64, uri} = await this.camera.takePictureAsync(options);
      await this.setState({image: base64});
      const path = `${RNFetchBlob.fs.dirs.CacheDir}/test.png`;
      console.log(path);
    }
  };

  renderCameraView() {
    return (
      <RNCamera
        style={{height: '100%', overflow: 'hidden'}}
        flashMode={RNCamera.Constants.FlashMode.off}
        type={RNCamera.Constants.Type.back}
        ref={(ref) => (this.camera = ref)}
        cropToPreview={true}
        ratio="2:2"
      />
    );
  }

  renderImageView() {
    return (
      <Image
        style={{height: '100%', borderRadius: 10}}
        resizeMode="contain"
        source={{uri: `data:image/gif;base64,${this.state.image}`}}
      />
    );
  }

  renderActionButtons() {
    return (
      <View style={styles.save}>
        <TouchableOpacity onPress={() => this.retake()}>
          <View style={[styles.buttonView, {borderWidth: 1}]}>
            <Text style={{color: '#01043B', fontSize: 16}}>Retake</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.useThisPhoto()}>
          <View style={[styles.buttonView, {backgroundColor: '#01043B'}]}>
            <Text style={{color: 'white', fontSize: 16}}>Use this Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderCaptureButton() {
    return (
      <View style={styles.capture}>
        <TouchableOpacity onPress={() => this.capturePicture()}>
          <MaterialIcons style={styles.onbottom} name="camera" size={70} />
        </TouchableOpacity>
      </View>
    );
  }

  retake() {
    this.setState({image: ''});
  }

  async useThisPhoto() {
    const {navigation} = this.props;
    // this.setState({loading: true});
    navigation.navigate('ImageDetails', {
      image: this.state.image,
      data: {},
    });
    // await axios
    //   .post(
    //     'http://090ed513f637.ngrok.io/get_text_from_image/',
    //     {
    //       image: this.state.image,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .then(async (response) => {
    //     await console.log(response.data);
    //     await this.setState({loading: false});
    //     navigation.navigate('ImageDetails', {
    //       image: this.state.image,
    //       data: response.data,
    //     });
    //   })
    //   .catch(async (error) => {
    //     await console.log(error.response);
    //     await this.setState({loading: false});
    //     alert('Error connecting server.');
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              onPress={() => this.retake()}
              style={{color: '#01043B', flex: 1}}
              name="close"
              size={26}
            />
            <Image
              source={require('../assets/neosoft.png')}
              style={{height: 30, width: '50%', flex: 10}}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => this.setState({showModal: true})}>
              <Text>URL</Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>EKYC OCR Demo</Text>
          </View>
          {this.state.loading ? (
            <ActivityIndicator
              style={{marginTop: '50%'}}
              size="large"
              color="black"
            />
          ) : (
            <View>
              <View
                style={[
                  styles.textContainer,
                  {
                    height: Platform.OS === 'ios' ? 120 : 50,
                  },
                ]}>
                {this.state.image === '' ? (
                  <Text style={styles.text}>Click photo of PAN Card</Text>
                ) : (
                  <Text style={styles.text}>
                    Make sure the image is clear and glare freee
                  </Text>
                )}
              </View>
              <View style={{height: 250, padding: 20}}>
                {this.state.image === '' ? (
                  <View>{this.renderCameraView()}</View>
                ) : (
                  this.renderImageView()
                )}
              </View>
              <View
                style={[
                  styles.textContainer,
                  {
                    height: 50,
                  },
                ]}>
                {this.state.image === '' ? (
                  <Text style={styles.text}>Place ID inside the box</Text>
                ) : null}
              </View>
              {this.state.image == ''
                ? this.renderCaptureButton()
                : this.renderActionButtons()}
            </View>
          )}
        </View>
        <Modal animationType="slide" visible={this.state.showModal}>
          <View
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>Enter URL</Text>
          </View>
          <View style={{padding: 20}}>
            <TextInput
              style={{
                backgroundColor: 'lightgrey',
                borderRadius: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Enter URL"
              onChange={(text) => this.setState({url: text})}
            />
          </View>
          <View
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.setState({showModal: false})}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: 'black',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 32,
    backgroundColor: 'white',
  },
  preview: {
    height: 480,
    width: 360,
  },
  onbottom: {
    bottom: 30,
    color: '#01043B',
  },
  capture: {
    top: '15%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#424141',
    fontSize: 20,
    textAlign: 'center',
  },
  save: {
    top: '15%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 30,
  },
  buttonView: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderRadius: 5,
    borderColor: '#01043B',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
    paddingHorizontal: 30,
  },
});
