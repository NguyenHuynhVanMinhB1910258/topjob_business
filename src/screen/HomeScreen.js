import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Header } from './PostScreen';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
export default function HomeScreen({ navigation, route }) {
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height - StatusBar.currentHeight);
  const [user] = useState(route.params)

  const [token, settoken] = useState('')
  useState(async () => { settoken(await AsyncStorage.getItem('token')) })
 

  const [stories, setStories] = useState([
    {
      userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
      userName: 'Brayden Willis',
      storyImage:
        'https://images.pexels.com/photos/4726898/pexels-photo-4726898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
      userName: 'Sophie Price',
      storyImage:
        'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/79.jpg',
      userName: 'Rick Perry',
      storyImage:
        'https://images.pexels.com/photos/3380805/pexels-photo-3380805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
      userName: 'Dave Pena',
      storyImage:
        'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      userImage: 'https://randomuser.me/api/portraits/women/74.jpg',
      userName: 'Layla Kennedy',
      storyImage:
        'https://images.pexels.com/photos/33287/dog-viszla-close.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
  ]);

  const [blog, setBlog] = useState([
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2022/10/cach-danng-tin-tuyen-dung-thu-hut-ung-vien.png',
      blogName: 'B???t m?? c??ch ????ng tin tuy???n d???ng hi???u qu??? h??t 100%...',
      shortBlog: 'C??ch ????ng tin tuy???n d???ng thu h??t ???ng vi??n ti???m n??ng v???n l?? lu??n b??i to??n ?????y th??ch th???c c???a nh?? tuy???n d???ng. S???..',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2022/10/vi-sao-nhan-vien-hay-bo-viec-3.jpg',
      blogName: 'V?? sao nh??n vi??n hay b??? vi???c? Nguy??n nh??n v?? c??ch...',
      shortBlog: 'V?? sao nh??n vi??n hay b??? vi???c? L??m th??? n??o ????? gi??? ch??n nh??n vi??n? ??? l?? nh???ng c??u h???i h??c b??a m?? nhi???u...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/tuyen-dung-nhan-su-cap-cao-tuyendung.topcv_.vn-1-696x435.jpg',
      blogName: 'Quy tr??nh tuy???n d???ng nh??n s??? c???p cao th??nh c??ng',
      shortBlog: 'Tuy???n d???ng nh??n s??? c???p cao c?? vai tr?? quan tr???ng ?????i v???i s??? ph??t tri???n c???a m???i doanh nghi???p. Nh??n s??? c???p cao...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/nguoi-tim-viec-tuyendung.topcv-1-218x150.jpg',
      blogName: 'H??n 46% ng?????i t??m vi???c mu???n l????ng tr??n 20 tri???u ?????ng/th??ng',
      shortBlog: 'Theo b??o c??o th??? tr?????ng lao ?????ng Th??nh ph??? H??? Ch?? Minh th???i ??i???m tr?????c v?? sau T???t Qu?? M??o 2023 m???i ????y: c??...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/ky-nang-dan-dat-doi-nhom-tuyendung.topcv_.vn-1-218x150.jpg',
      blogName: 'C??c k??? n??ng d???n d???t ?????i nh??m trong th???i k??? suy tho??i kinh t???',
      shortBlog: 'D?? ??? b???t k??? ????n v??? n??o, quy m?? ra sao th?? k??? n??ng d???n d???t ?????i nh??m v???n c?? vai tr?? quan tr???ng,...',
    },
    
  ]);

  const [currentStoryView, setCurrentStoryView] = useState(stories);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

  return (
    <View style={{ height: WINDOW_HEIGHT, backgroundColor: '#fff' }}>
      {/* Header */}
      <Header user={user} />
      <View style={{ flex: 8 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stories */}
          <View style={[styles.storiesView]}>
            <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Th??ng Tin M???i</Text>
            <PagerView style={{ height: 110 }} initialPage={0}>
              {stories.map((story, i) => (
                <View style={{ marginLeft: 10, alignItems: 'center' }} key={i}>
                  <TouchableOpacity
                    style={styles.storyContentView}
                  >
                    <Image
                      style={{
                        width: 365,
                        height: 100,
                        borderRadius: 10,
                        opacity: story.isSeen ? 0.5 : 1,
                      }}
                      source={{
                        uri: story.storyImage,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </PagerView>
          </View>
          {/* Chats View */}
          <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }} >Hi???u Qu??? Tuy???n D???ng</Text>
          <View style={{ height: 250 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: 'lightblue', margin: 10, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>???ng vi??n m???i</Text>
                <Text>6</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'lightgoldenrodyellow', margin: 10, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Ti???p nh???n</Text>
                <Text>6</Text>
              </View>
              
           
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: 'lightpink', margin: 10, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tin h???t h???n</Text>
                <Text>6</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'lightgreen', margin: 10, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tin hi???n th???</Text>
                <Text>6</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 20, }}></View>
          <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }} >Blog</Text>
          {/* Story Modal */}
          <View style={{ minHeight: 150, marginBottom: 100 }}>
            {blog.map((blog , i)=>(<View style={{ backgroundColor: 'white', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10 }} >
              <Image source={{ uri: blog.srcImage }} style={{ height: 100, width: 120 }} />
              <View style={{ paddingHorizontal: 5, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{blog.blogName}</Text>
                <Text style={{ fontSize: 10 }}>{blog.shortBlog}</Text>
              </View>
            </View>))}
          
          </View>
        </ScrollView>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  storyContentView: {
    // width: 90,
    // height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});