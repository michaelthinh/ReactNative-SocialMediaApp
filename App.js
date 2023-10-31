import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import Title from './components/Title/Title';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

import globalStyle from './assets/styles/globalStyle';
import UserStory from './components/UserStory/UserStory';
import UserPost from './components/UserPost/UserPost';

const App = () => {
  const userStories = [
    {
      firstName: 'Joseph',
      id: 1,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Angel',
      id: 2,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'White',
      id: 3,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Olivia',
      id: 4,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nata',
      id: 5,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nicolas',
      id: 6,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Michael',
      id: 7,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Luis',
      id: 8,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Max',
      id: 9,
      profileImage: require('./assets/images/default_profile.png'),
    },
  ];

  const userPosts = [
    {
      firstName: 'Allison',
      lastName: 'Becker',
      location: 'Sukabumi, Jawa Barat',
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
      id: 1,
    },
    {
      firstName: 'Jennifer',
      lastName: 'Wilkson',
      location: 'Pondok Leungsir, Jawa Barat',
      likes: 1374,
      comments: 32,
      bookmarks: 60,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
      id: 2,
    },
    {
      firstName: 'Thinh',
      lastName: 'Michael',
      location: 'Ho Chi Minh, Vietnam',
      likes: 6902,
      comments: 101,
      bookmarks: 303,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
      id: 3,
    },
    {
      firstName: 'Nala',
      lastName: 'Vacheishvili',
      location: 'New York, NY',
      likes: 200,
      comments: 16,
      bookmarks: 6,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
      id: 4,
    },
    {
      firstName: 'Max',
      lastName: 'Schwarzmüller',
      location: 'Frankfurt, Germany',
      likes: 2034,
      comments: 32,
      bookmarks: 39,
      image: require('./assets/images/default_post.png'),
      profileImage: require('./assets/images/default_profile.png'),
      id: 5,
    },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const userPostsPageSize = 2;
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderedData, setUserPostsRenderedData] = useState([]);
  const [isLoadinguserPosts, setIsLoadinguserPosts] = useState(false);

  const pagination = (database, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setIsLoadingUserStories(true);
    const getInitalData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitalData);
    setIsLoadingUserStories(false);
    setIsLoadinguserPosts(true);
    const getInitalDataPosts = pagination(userPosts, 1, userPostsPageSize);
    setUserPostsRenderedData(getInitalDataPosts);
    setIsLoadinguserPosts(false);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={userPostsRenderedData}
          ListHeaderComponent={
            <>
              <View style={globalStyle.header}>
                <Title title="Let's Explore" />
                <TouchableOpacity style={globalStyle.messageIcon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={20}
                    color={'#898DAE'}
                  />
                  <View style={globalStyle.messageNumberContainer}>
                    <Text style={globalStyle.messageNumber}>2</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={globalStyle.userStoryContainer}>
                <FlatList
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    if (isLoadingUserStories) {
                      return;
                    }
                    setIsLoadingUserStories(true);
                    const contentToAppend = pagination(
                      userStories,
                      userStoriesCurrentPage + 1,
                      userStoriesPageSize,
                    );
                    if (contentToAppend.length > 0) {
                      setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
                      setUserStoriesRenderedData([
                        ...userStoriesRenderedData,
                        ...contentToAppend,
                      ]);
                    }
                    setIsLoadingUserStories(false);
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={userStoriesRenderedData}
                  renderItem={({item}) => (
                    <UserStory
                      key={item.id}
                      firstName={item.firstName}
                      profileImage={item.profileImage}
                    />
                  )}
                />
              </View>
            </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadinguserPosts) {
              return;
            }
            setIsLoadinguserPosts(true);
            const contentToAppend = pagination(
              userPosts,
              userPostsCurrentPage + 1,
              userPostsPageSize,
            );
            if (contentToAppend.length > 0) {
              setUserPostsCurrentPage(userPostsCurrentPage + 1);
              setUserPostsRenderedData([
                ...userPostsRenderedData,
                ...contentToAppend,
              ]);
            }
            setIsLoadinguserPosts(false);
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={globalStyle.userPostContainer}>
              <UserPost
                firstName={item.firstName}
                lastName={item.lastName}
                location={item.location}
                likes={item.likes}
                comments={item.comments}
                bookmarks={item.bookmarks}
                profileImage={item.profileImage}
                image={item.image}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
