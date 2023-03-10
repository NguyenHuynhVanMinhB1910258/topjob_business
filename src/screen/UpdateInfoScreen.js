import { StyleSheet, Text, View, Dimensions, StatusBar, FlatList, TextInput, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import region from '../../region.json'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../services/ApiService';
import axios from 'axios';
import SysLoading from '../component/sys_loading';
const io = require('socket.io-client')
const token = AsyncStorage.getItem('token')
const Province = {
  code: 0,
  name: 'chọn'
};
const Districts = {
  code: 0,
  name: 'chọn'
};
const data = [];
const ListProvinces = ({ name, code, Hide }) => {
  return (
    <TouchableOpacity onPress={() => {
      Province.code = code;
      Province.name = name;
      Districts.name = 'chọn';
      Districts.code = 0;
      // console.log(Province);
      Hide()
    }} style={{ padding: 10, borderBottomWidth: 0.2, borderColor: 'gray' }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}
const ListDistricts = ({ name, code, Hide }) => {
  return (
    <TouchableOpacity onPress={() => {
      Districts.code = code;
      Districts.name = name;
      // console.log(Districts);
      Hide()
    }} style={{ padding: 10, borderBottomWidth: 0.2, borderColor: 'gray' }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}
const Selection = ({ title, visible, data, Hide }) => {
  // console.log(title === 'Tỉnh Thành')
  return (
    <Modal
      transparent={true}
      visible={visible}>
      <TouchableOpacity animationType="fade" onPressOut={Hide} activeOpacity={1} style={{ flex: 1, backgroundColor: 100 }}></TouchableOpacity>
      <View animationType="slide" style={{ flex: 1, backgroundColor: '#fff', }}>
        <View style={{ alignItems: 'center' }}>
          <Text>Chọn {title}</Text>
        </View>
        <View style={{ padding: 10 }}>
          {title === 'Tỉnh Thành' ? (
            <FlatList data={data}
              renderItem={({ item }) => <ListProvinces name={item.name} code={item.code} Hide={Hide} />}
            />
          ) : (
            <FlatList data={data}
              renderItem={({ item }) => <ListDistricts name={item.name} code={item.code} Hide={Hide} />}
            />)}
        </View>
      </View>
    </Modal>
  )
}
const UpdateInfoScreen = ({route}) => {
  // console.log(route.params)
  const navigation = useNavigation();
  const [titleselection, settitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('')
  const [validate,setValidate] =useState({})
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [socket,setSocket] = useState('');
  // console.log(token)
  useEffect(()=>{
    setSocket(io(api.SocketURL,{
      transports: ['websocket']
    }))
  },[])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [1, 2],
      quality: 1,

    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const Submit = async () => {
    const formdata = new FormData();
    const validation = {};
    setLoading(true);
    if(Districts.code === 0 || Province.code === 0 || address.length === 0){
      if(Districts.code === 0){
         validation.Districts = 'Vui lòng điền thông tin quận huyện'
      }
      if(Province.code === 0){
        validation.Province = 'Vui lòng điền thông tin tỉnh thành'
      }
      if(address.length === 0 ){
        validation.address = 'Vui lòng điền thông tin địa chỉ'
      }
      formdata.append('address','')
    }
    formdata.append('id_business',route.params.id);
    if(Districts.code !== 0 && Province.code !== 0 && address.length !== 0){
      formdata.append('address',address+', '+Districts.name+', '+ Province.name);
    }
    if(phone.length === 0){
       validation.phone ='Vui lòng điền thông tin số điện thoại'
    }
    if(phone.length !== 10 && phone.length > 0 ){
      validation.phone ='Thông tin số điện thoại không hợp lệ'
    }
    formdata.append('phone',phone);
    if(image == null){
      validation.image = 'Vui lòng chọn 1 tấm ảnh'
      formdata.append('license','')
    }else{
      formdata.append('license',
    {
      uri: image.uri,
      type:image.type+'/jpeg',
      filename: 'license',
      name:'license.jpeg'
    });
    }
    // console.log(formdata._parts);
    await axios({
      method: "post",
      url: `${api.baseURL}/Business_info`,
      data: formdata,
      headers: { 
        authorization: `Bearer ${token._z}`,
        "Content-Type": "multipart/form-data" 
      },    
    }).then(res=>{
      socket.emit('post-info',res.data)
      navigation.goBack();
    }).catch(e => {
      if(e.response.status === 422){
        setValidate(validation)
        setLoading(false)
      }
    })

  }
 
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height - StatusBar.currentHeight);
  // console.
  return (
    <View style={{ width: '100%', height: WINDOW_HEIGHT, backgroundColor: 'white' }}>
      <SysLoading visible={loading} ></SysLoading>
      <Selection title={titleselection} data={data} visible={visible} Hide={() => { setVisible(false) }} />
      <View style={{ flex: 4, backgroundColor: '#330099' }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

          <View style={{ flex: 1, flexDirection: 'row', }}>
            <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 10 }}>
              <Text>Tỉnh Thành:</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                  settitle('Tỉnh Thành');
                  setdata(region);
                }}
                activeOpacity={0.9}
                style={{ borderWidth: 0.5, borderRadius: 10, padding: 10, borderColor: 'gray', marginRight: 20 }}>
                <Text style={{ fontSize: 10 }}>{Province.name}</Text>
              </TouchableOpacity>
              <Text style={{color:'red', fontSize: 12 ,marginRight:10}}>{validate.Province}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text>Quận Huyện:</Text>
              {Province.code <= 0 ? (
                <View
                  style={{ borderWidth: 0.5, borderRadius: 10, padding: 10, borderColor: 'gray', marginRight: 20 }}>
                  <Text style={{ fontSize: 10, color: 'gray' }}>{Districts.name}</Text>
                </View>
              ) : (<TouchableOpacity
                onPress={() => {
                  setVisible(true);
                  settitle('Quận Huyện');
                  for (let i = 0; i < region.length; i++) {
                    if (region[i].code == Province.code) {
                      setdata(region[i].districts)
                    }

                  }
                }}
                activeOpacity={0.9}
                style={{ borderWidth: 0.5, borderRadius: 10, padding: 10, borderColor: 'gray', marginRight: 20 }}>
                <Text style={{ fontSize: 10 }}>{Districts.name}</Text>
              </TouchableOpacity>)}
              <Text style={{color:'red', fontSize: 12}}>{validate.Districts}</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingRight: 20 }}>
            <Text>Địa chỉ công ty:</Text>
            <View style={{ height: 45, width: '100%', backgroundColor: '#fff', padding: 10, borderRadius: 10, borderColor: 'gray', borderWidth: 0.5 }}>
              <TextInput
                style={{ flex: 1 }}
                value={address}
                keyboardType={'ascii-capable'}
                onChangeText={setAddress}
                placeholder='nhập vào địa chỉ cụ thể'></TextInput>
            </View>
            <Text style={{color:'red', fontSize: 12}}>{validate.address}</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingRight: 20 }}>
          <Text>Số Điện Thoại:</Text>
          <View style={{ height: 45, width: '100%', backgroundColor: '#fff', padding: 10, borderRadius: 10, borderColor: 'gray', borderWidth: 0.5 }}>
            <TextInput
              style={{ flex: 1 }}
              value={phone}
              keyboardType={'numeric'}
              onChangeText={setPhone}
              placeholder='nhập vào số điện thoại'></TextInput>
              
          </View>
          <Text style={{color:'red', fontSize: 12}}>{validate.phone}</Text>
           <Text>Ảnh giấy phép kinh doanh:</Text>
           <Text style={{color:'red', fontSize: 12}}>{validate.image}</Text>
           <TouchableOpacity onPress={() => { pickImage() }} style={{ backgroundColor: '#FF6F00', marginHorizontal: 100, padding: 10, alignItems: 'center', borderRadius: 20, marginTop: 10 }}>
            <Text style={{ color: 'white' }}>Upload ảnh</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, alignItems: 'center' }}>
        </View> */}
      </View>
      <View style={{ flex: 4, backgroundColor: '#fff', alignItems: 'center' }}>
        {image && <Image source={{ uri: image.uri }} style={{ width: image.width / 20, marginTop: 10, height: image.height / 20 }} />}
        <Text style={{ fontSize: 10 }}></Text>
        <TouchableOpacity 
        // onPress={()=>{
        //   navigation.navigate({name: 'Post'})
        // }}
        onPress={Submit} 
        style={{ width: 100, backgroundColor: '#FFA000', alignItems: 'center', padding: 10, borderRadius: 20, }}>
          <Text>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UpdateInfoScreen

const styles = StyleSheet.create({})