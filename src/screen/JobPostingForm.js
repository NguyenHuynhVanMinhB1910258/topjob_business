

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const io = require('socket.io-client')
const JobPostingForm = ({route}) => {
  // const ip = window.RTCPeerConnection.locaIIP;
  const navigation = useNavigation();
  const [token , setToken] = useState('');
  useState(async ()=>{
    setToken(await AsyncStorage.getItem('token'))
  })
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState('');
  const [requirement, setRequirement] = useState('');
  const [benefit, setBenefit] = useState('');
  const [date, setDate] = useState(new Date());
  const [quantity,setQuantity] = useState('');
  const [position,setPosition] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [errors,setErrors] = useState([]);
  const [socket, setSocket] = useState('')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDeadline(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  useEffect(()=>{
    setSocket(io(api.SocketURL, {
      transports: ['websocket']
    }));

  },[])
  const showDatepicker = () => {
    showMode('date');
  };
  const handleSubmit = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const deadline = `${year}-${month}-${day}`;
    const company_id = route.params;
    const data = {title,description,location,type,salary,requirement,benefit,deadline,quantity,position}
    console.log(data)
    axios.post(`${api.baseURL}/Jobs/${company_id}`,data,{
      headers: { 
        authorization: `Bearer ${token}`,
      },    
    }).then(res =>{
      socket.emit('post-job',res.data)
      navigation.goBack();
    }
    ).catch(e=>{
      setErrors(e.response.data.errors)
    })
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor:'#fff',}}>
      <View style={{marginBottom: 40}}>
      <Text>T??n c??ng vi???c:</Text>
      <TextInput
        placeholder="T??n c??ng vi???c"
        value={title}
        onChangeText={setTitle}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
      {errors.title && <Text style={{color:'red'}}>{errors.title[0]}</Text>}
      <Text>?????a ??i???m l??m vi???c:</Text>
      <TextInput
        placeholder="?????a ??i???m l??m vi???c"
        value={location}
        onChangeText={setLocation}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.location && <Text style={{color:'red'}}>{errors.location[0]}</Text>}
      <Text>V??? tr?? c??ng vi???c:</Text>
      <TextInput
        placeholder="V??? tr?? c??ng vi???c"
        value={position}
        onChangeText={setPosition}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.position && <Text style={{color:'red'}}>{errors.position[0]}</Text>}
      <Text>Lo???i c??ng vi???c:</Text>
      <View style={{backgroundColor:20,borderRadius: 10}}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item style={{}} label="Ch???n lo???i c??ng vi???c" value="" />
          <Picker.Item style={{}} label="To??n th???i gian" value="full-time" />
          <Picker.Item style={{}} label="B??n th???i gian" value="part-time" />
          <Picker.Item style={{}} label="T???m th???i" value="temporary" />
          <Picker.Item style={{}} label="T??? do" value="freelance" />
        </Picker>
      </View>
      {errors.type && <Text style={{color:'red'}}>{errors.type[0]}</Text>}
      <Text>M???c l????ng:</Text>
      <TextInput
        placeholder="L????ng"
        value={salary}
        onChangeText={setSalary}
        keyboardType={"numeric"}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.salary && <Text style={{color:'red'}}>{errors.salary[0]}</Text>}
       <Text>s??? l?????ng:</Text>
      <TextInput
        placeholder="S??? l?????ng"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType={"numeric"}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.quantity && <Text style={{color:'red'}}>{errors.quantity[0]}</Text>}
      <Text>Th???i h???n:</Text>
      <View>
      <TouchableOpacity onPress={showDatepicker} style={{ flexDirection:'row' ,marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}>
        <Text style={{flex:1}}>{date.toDateString()}</Text>
        <Icon name='date-range' size={20}></Icon>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    {errors.deadline && <Text style={{color:'red'}}>{errors.deadline[0]}</Text>}
      <Text>M?? t???:</Text>
      <TextInput
        placeholder="M?? t???"
        value={description}
        onChangeText={setDescription}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.description && <Text style={{color:'red'}}>{errors.description[0]}</Text>}
      <Text>Y??u c???u:</Text>
      <TextInput
        placeholder="Y??u c???u"
        value={requirement}
        onChangeText={setRequirement}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.requirement && <Text style={{color:'red'}}>{errors.requirement[0]}</Text>}
      <Text>Quy???n l???i:</Text>
      <TextInput
        placeholder="Quy???n l???i"
        value={benefit}
        onChangeText={setBenefit}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.benefit && <Text style={{color:'red'}}>{errors.benefit[0]}</Text>}
      <Button color={"#FF6F00"} title="????ng tin" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default JobPostingForm;
