import { StyleSheet, Text, View,Image ,TextInput, SafeAreaView, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import SysLoading from '../component/sys_loading';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import api from '../services/ApiService';
import * as pkg from '../../package.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Form = ({ ShowLoading, HideLoading }) => {
  const navigation = useNavigation();
  const [changeform, SetChangeForm] = useState(true)
  const [validate, setValidate] = useState({ name: '', email: '', password: '' })
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setConfirmPassword] = useState('')
  const [secureTextEntry, SetsecureTextEntry] = useState(true)
  const [eye, setEye] = useState('gray')
  const [iconeye, setIconeye] = useState('eye-slash')
  const changeFormSignup = () => {
    setValidate({ name: '', email: '', password: '' })
    SetChangeForm(false)
  }
  const changeFormLogin = () => {
    setValidate({ name: '', email: '', password: '' })
    SetChangeForm(true)
  }

  const Login = async () => {
    ShowLoading();
    await axios.post(`${api.baseURL}/login`,{email,password})
    .then(async res => {
      await AsyncStorage.setItem('token',res.data.token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tab', params: res.data.user }]
      })
    }).catch(e=>{
      if(e.response.status == 422){
        if (e.response.data.errors.email !== undefined) {
        validate.email = e.response.data.errors.email[0]
      } else {
        validate.email = ''
      }
      if (e.response.data.errors.password !== undefined) {
        validate.password = e.response.data.errors.password[0]
      } else {
        validate.password = ''
      }
      HideLoading();
      }
      if(e.response.status == 401){
        validate.password = 'incorrect password'
        HideLoading();
      }
      console.log(validate)
      
    })
  }
  const Signup = async () => {
    ShowLoading();
    await axios.post(`${api.baseURL}/register`, { name, email, password, password_confirmation })
      .then(async res => {
        await AsyncStorage.setItem('token', res.data.token)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tab', params: res.data.user }]
        })
      }).catch(e => {
        if (e.response.data.errors.email !== undefined) {
          validate.email = e.response.data.errors.email[0]
        } else {
          validate.email = ''
        }
        if (e.response.data.errors.name !== undefined) {
          validate.name = e.response.data.errors.name[0]
        } else {
          validate.name = ''
        }
        if (e.response.data.errors.password !== undefined) {
          validate.password = e.response.data.errors.password[0]
        } else {
          validate.password = ''
        }
        console.log(validate)
        HideLoading();
      })
  }
  if (changeform == true) {
    return (
      <View style={styles.body}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <Text> ????ng nh???p ????? b???t ?????u nh??!</Text>
        </View>
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
          <View style={{ backgroundColor: '#FFF8E1', marginHorizontal: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='envelope' size={15} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                value={email}
                onChangeText={value => { SetEmail(value) }}
                placeholder='Nh???p V??o Email'>
              </TextInput>
            </View>
          </View>
          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.email}</Text>

          <View style={{ backgroundColor: '#FFF8E1', margin: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='lock' size={22} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                value={password}
                onChangeText={value => { setPassword(value); setEye('black'); if (value == '') { setEye("gray") } }}
                secureTextEntry={secureTextEntry}
                placeholder='Nh???p V??o Password'></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (secureTextEntry) {
                  SetsecureTextEntry(false)
                  setIconeye('eye')
                } else {
                  SetsecureTextEntry(true)
                  setIconeye('eye-slash')
                }
              }}
              style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name={iconeye} size={22} color={eye}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.password}</Text>

        </View>
        <View style={{ flex: 4, backgroundColor: '#fff', }}>
          <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
            <Text style={{ fontWeight: '600' }}> Qu??n m???t kh???u?</Text>
          </View>
          <TouchableOpacity
            onPress={Login}
            style={{ margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6F00', padding: 10, marginHorizontal: 50, borderRadius: 10 }}>
            <Text style={{ color: 'white' }}>????ng nh???p</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text>OR</Text>
          </View>
          <TouchableOpacity
            onPress={changeFormSignup}
            style={{ margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFA000', padding: 10, marginHorizontal: 50, borderRadius: 10 }}
          >
            <Text style={{ color: 'black' }}>????ng K??</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    //Form ????ng K??
    return (
      <View style={styles.body}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <Text> Vui l??ng ??i???n th??ng tin ????ng k??!</Text>
        </View>

        <View style={{ flex: 4, backgroundColor: '#fff' }}>
          <View style={{ backgroundColor: '#FFF8E1', marginHorizontal: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='user' size={15} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput value={name} onChangeText={value => { SetName(value) }} placeholder='Nh???p V??o T??n C??ng Ty'></TextInput>
            </View>
          </View>

          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.name}</Text>

          <View style={{ backgroundColor: '#FFF8E1', marginHorizontal: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='envelope' size={15} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                value={email}
                onChangeText={value => { SetEmail(value) }}
                placeholder='Nh???p V??o Email'>
              </TextInput>
            </View>
          </View>
          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.email}</Text>

          <View style={{ backgroundColor: '#FFF8E1', marginHorizontal: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='lock' size={22} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                value={password}
                onChangeText={value => { setPassword(value); setEye('black'); if (value == '') { setEye("gray") } }}
                secureTextEntry={secureTextEntry}
                placeholder='Nh???p V??o Password'></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (secureTextEntry) {
                  SetsecureTextEntry(false)
                  setIconeye('eye')
                } else {
                  SetsecureTextEntry(true)
                  setIconeye('eye-slash')
                }
              }}
              style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name={iconeye} size={22} color={eye}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.password}</Text>

          <View style={{ backgroundColor: '#FFF8E1', marginHorizontal: 10, padding: 5, borderRadius: 10, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name='lock' size={22} color={'gray'}></Icon>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput value={password_confirmation} onChangeText={value => { setConfirmPassword(value) }} secureTextEntry={secureTextEntry} placeholder='Nh???p L???i Password'></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (secureTextEntry) {
                  SetsecureTextEntry(false)
                  setIconeye('eye')
                } else {
                  SetsecureTextEntry(true)
                  setIconeye('eye-slash')
                }
              }}
              style={{ justifyContent: 'center', marginRight: 10 }}>
              <Icon name={iconeye} size={22} color={eye}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 10, color: 'red', fontSize: 10 }}>{validate.password_confirmation}</Text>
        </View>
        <View style={{ flex: 3, backgroundColor: '#fff', }}>
          <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
            <Text style={{ fontWeight: '600' }}> Qu??n m???t kh???u?</Text>
          </View>
          <TouchableOpacity
            onPress={Signup}
            style={{ margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6F00', padding: 10, marginHorizontal: 50, borderRadius: 10 }}>
            <Text style={{ color: 'white' }}>????ng K??</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text>OR</Text>
          </View>
          <TouchableOpacity onPress={changeFormLogin}
            style={{ margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFA000', padding: 10, marginHorizontal: 50, borderRadius: 10 }}>
            <Text style={{ color: 'black' }}>????ng nh???p</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const LoginScreen = () => {
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height);
  const [STATUS_BAR_HEIGHT] = useState(StatusBar.currentHeight);
  const [loading, setLoading] = useState(false);

  const ShowLoading = () => {
    setLoading(true);
  }
  const HideLoading = () => {
    setLoading(false);
  }
  return (
    <SafeAreaView>
      <View height={WINDOW_HEIGHT - STATUS_BAR_HEIGHT} style={styles.container}>
        <SysLoading visible={loading} />
        <View style={styles.header} >
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#3366FF', fontSize: 25 }}>TOP</Text>
            <Text style={{ color: '#330099', fontFamily: 'serif', fontSize: 25 }}>job</Text>
          </View> */}
           <Image style={{height:150,width:150}} source={require('../../assets/logo1.png') }></Image>
        </View>
        <Form ShowLoading={ShowLoading} HideLoading={HideLoading} />
        <View style={styles.footer} >
          <Text>{pkg.version}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#3366FF',
    width: '100%'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  body: {
    flex: 3,
    backgroundColor: 'skyblue'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
}) 