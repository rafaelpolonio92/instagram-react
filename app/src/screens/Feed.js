import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';
import { getPosts } from '../store/actions/posts';

class Feed extends Component {
  componentDidMount = () => {
    this.props.onGetPosts()
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) =>
            <Post key={item.id} {...item} />}>
        </FlatList>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.posts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);