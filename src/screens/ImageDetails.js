import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';

class ImageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      DOB: '',
      Gender: '',
      FatherName: '',
      PANno: '',
      Address: '',
      image: '',
    };
  }

  componentDidMount() {
    const {route} = this.props;
    const {data, image} = route.params;
    console.log(data);
    this.setState({
      Name: data.NAME,
      DOB: data.DOB,
      FatherName: data.FATHER_NAME,
      PANno: data.ID,
      image: image,
    });
  }

  render() {
    return (
      <View>
        <ScrollView style={{height: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <Text style={{color: 'grey'}}>Image</Text>
          </View>

          <View style={{height: 250, paddingHorizontal: 20}}>
            <Image
              style={{height: '100%', borderRadius: 10}}
              resizeMode="contain"
              source={{uri: `data:image/gif;base64,${this.state.image}`}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 30,
            }}>
            <Text style={{color: 'grey'}}>Text Extracted</Text>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <View style={styles.formContainer}>
              <View style={styles.formFieldContainer}>
                <View style={styles.formFieldContent}>
                  <Text style={{flexShrink: 1, color: 'grey'}}>Name</Text>
                </View>
                <View style={styles.formFieldContent}>
                  <TextInput
                    placeholder="Name"
                    value={this.state.Name}
                    multiline={true}
                    style={styles.textInputAlign}
                    onChange={(text) => this.setState({Name: text})}
                  />
                </View>
              </View>

              <View style={styles.formFieldContainer}>
                <View style={styles.formFieldContent}>
                  <Text style={{flexShrink: 1, color: 'grey'}}>
                    Date Of Birth
                  </Text>
                </View>
                <View style={styles.formFieldContent}>
                  <TextInput
                    placeholder="Date Of Birth"
                    value={this.state.DOB}
                    multiline={true}
                    style={styles.textInputAlign}
                    onChange={(text) => this.setState({DOB: text})}
                  />
                </View>
              </View>

              <View style={styles.formFieldContainer}>
                <View style={styles.formFieldContent}>
                  <Text style={{flexShrink: 1, color: 'grey'}}>
                    Father Name
                  </Text>
                </View>
                <View style={styles.formFieldContent}>
                  <TextInput
                    placeholder="Gender"
                    value={this.state.FatherName}
                    multiline={true}
                    style={styles.textInputAlign}
                    onChange={(text) => this.setState({FatherName: text})}
                  />
                </View>
              </View>

              <View style={styles.formFieldContainer}>
                <View style={styles.formFieldContent}>
                  <Text style={{flexShrink: 1, color: 'grey'}}>PAN Number</Text>
                </View>
                <View style={styles.formFieldContent}>
                  <TextInput
                    placeholder="PAN Number"
                    value={this.state.PANno}
                    multiline={true}
                    style={styles.textInputAlign}
                    onChange={(text) => this.setState({PANno: text})}
                  />
                </View>
              </View>

              {/* <View style={styles.formFieldContainer}>
                <View style={styles.formFieldContent}>
                  <Text style={{flexShrink: 1, color: 'grey'}}>Address</Text>
                </View>
                <View style={styles.formFieldContent}>
                  <TextInput
                    placeholder="Address"
                    value={this.state.Address}
                    multiline={true}
                    style={styles.textInputAlign}
                    onChange={(text) => this.setState({Address: text})}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ImageDetails;

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
  },
  formFieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E9',
  },
  formFieldContent: {
    width: '50%',
    padding: 10,
  },
  textInputAlign: {
    textAlign: 'right',
  },
});
