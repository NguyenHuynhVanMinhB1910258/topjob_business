import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const DetailJobsScreen = ({ route }) => {
    //  console.log(route.params)
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const job = route.params;
    const [deadline, setDealine] = useState('');
    useState(async () => {
        const currentDate = new Date();
        const dl = new Date(route.params.deadline);
        let timeDiff = dl.getTime() - currentDate.getTime();
        let daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDealine(daysLeft);
        setToken(await AsyncStorage.getItem('token'))
    })
    
    // const [edit,setEdit] = useState('')
    // const [id] = useState(route.params)
    // useEffect(() => {
    //     if (token !== '') {
    //         axios.get(`${api.baseURL}/Job/${id}`, {
    //             headers:
    //                 { authorization: `Bearer ${token}` }
    //         }).then(res => {
    //             setJob(res.data)
    //             const currentDate = new Date();
    //             const dl = new Date(res.data[0].deadline);
    //             let timeDiff =  dl.getTime() - currentDate.getTime();
    //             let daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //             setDealine(daysLeft);
    //         })
    //     }
    // }, [token])
    // console.log(job)
 
        return (
            <View style={{ height: '100%', backgroundColor: '#fff' }}>
                <View style={{ flex: 10, backgroundColor: '#fff' }}>
                    <ScrollView style={{padding:10,marginBottom: 0}}>
                        <View style={{ minHeight: 100, backgroundColor: 'antiquewhite',padding:10,borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', }}>Th??ng tin chung:</Text>
                            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10,  }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{fontSize: 12,fontWeight: 'bold',}}>M???c l????ng</Text>
                                        <Text style={{fontSize: 12}}>{job.salary}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{fontSize: 12,fontWeight: 'bold',}}>H??nh th???c l??m vi???c</Text>
                                        <Text style={{fontSize: 12}}>{job.type}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{fontSize: 12,fontWeight: 'bold',}}>S??? l?????ng tuy???n</Text>
                                        <Text style={{fontSize: 12}}>{job.quantity}</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{fontSize: 12,fontWeight: 'bold',}}>Ch???c v???</Text>
                                        <Text style={{fontSize: 12}}>{job.position}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop: 10}}> 
                                {/* <Text><Icon name='book-edit' size={15}></Icon> Edit</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{minHeight:80, backgroundColor: 'antiquewhite',padding: 10,marginTop:10,borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>?????a ??i???m l??m vi???c:</Text>
                            <Text style={{fontSize: 12}}>{job.location}</Text>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop: 10}}> 
                            {/* <Text><Icon name='book-edit' size={15}></Icon> Edit</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{minHeight:300, backgroundColor: 'antiquewhite',padding: 10,marginTop:10,borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>M?? t??? c??ng vi???c:</Text>
                            <Text style={{fontSize: 12}}>{job.description}</Text>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop: 10}}> 
                            {/* <Text><Icon name='book-edit' size={15}></Icon> Edit</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{minHeight:300, backgroundColor: 'antiquewhite',padding: 10,marginTop:10,borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Y??u c???u c??ng vi???c:</Text>
                            <Text style={{fontSize: 12}}>{job.requirement}</Text>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop: 10}}> 
                            {/* <Text><Icon name='book-edit' size={15}></Icon> Edit</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{minHeight:300, backgroundColor: 'antiquewhite',padding: 10,marginTop:10, marginBottom: 20,borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Quy???n l???i:</Text>
                            <Text style={{fontSize: 12}}>{job.benefit}</Text>
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', marginTop: 10}}> 
                            {/* <Text><Icon name='book-edit' size={15}></Icon> Edit</Text> */}
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{height: 25}}> </View> */}
                    </ScrollView>
                </View>
                <View style={{ flex: 2, }}>
                    <View style={{flex:1,alignItems: 'center'}}>
                        <Text>Th???i H???n</Text>
                        <Text>C??n {deadline} ng??y</Text>
                    </View>
                    <View style={{flex:1,flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex: 1,marginHorizontal:25,marginVertical:10,borderRadius:30, borderColor: '#FF6F00',borderWidth: 1, justifyContent: 'center',alignItems:'center'}}>
                        <Text style={{color: '#FF6F00'}}>T???m ???n</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={()=>{navigation.navigate({name: 'JobEditingForm', params: job})}}
                     style={{flex: 1, backgroundColor: '#FF6F00',marginHorizontal:25,marginVertical:10,borderRadius:30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>S???a b??i vi???t</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    

}
export default DetailJobsScreen

const styles = StyleSheet.create({})