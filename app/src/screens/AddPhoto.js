import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/posts';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
 
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const noUser = 'Você precista estar logado para adicionar imagens';
class AddPhoto extends Component {
  state = {
    image: null,
    comment: '',
  };

  pickLocalImage = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return
    };
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!res.cancelled) {
      this.setState({ image: res.uri });
    }
  };

  pickCameraImage = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return
    };
    let res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!res.cancelled) {
      this.setState({ image: res.uri, base64: res.data });
    }
  }

  save = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return
    };
    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comment: [{
        nickname: this.props.name,
        comment: this.state.comment
      }]
    })

    this.setState({ image: null, comment: '' });
    this.props.navigation.navigate('Feed');
  };
  
  render() {
    console.disableYellowBox = true
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0} >
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Compartilhe uma imagem</Text>
              <View style={styles.imageContainer}>
                <Image source={{ uri: this.state.image }} style={styles.image} />
              </View>
              <TextInput
                placeholder= 'Algum comentário para a foto?'
                style={styles.input}
                editable={this.props.name != null}
                value={this.state.comment}
                onChangeText={comment => this.setState({ comment })}
              />
              <View style={styles.choicesContainer}>
                <Text style={styles.buttomText}>Escolha uma foto</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={{ alignItems: 'center'}}
                    onPress={this.pickLocalImage}
                  >
                    <Icon name='folder' size={30} color='#000' />
                    <Text>Arquivos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: 'center'}}
                    onPress={this.pickCameraImage}
                  >
                    <Icon name='folder' size={30} color='#000' />
                    <Text>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={this.save}
                  >
                    <Icon name='share' size={30} color='#000' />
                    <Text>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: 30,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#eee',
        marginTop: 10,
        resizeMode: 'contain'
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    choicesContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        width: '90%',
        marginTop: 30,
        padding: 5,
        backgroundColor: '#4286F4',
 
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        padding: 10,
    },
    buttomText: {
        fontSize: 20,
        color: '#fff',
    },
    input: {
        marginTop: 20,
        width: '90%',
    }
})

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);