import React, { useState } from 'react';
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native' 
import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';


  
const Postscreen = () => {   
    //Pick Image form Gallery
    const [images, setImages] = useState([]);
    const [image, setImage] = useState();

    const pickImages = async () => {
        // No permissions request is necessary for launching the image library
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          // allowsEditing: true,  
          allowsMultipleSelection: true,
          selectionLimit: 10,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);
       
        if (!result.cancelled) {
          setImages(result.uri ? [result.uri] : result.selected);
        }
    };

    const [specs, setSpecs] = useState('');

    //Counter
    const [count, setCount] = useState(0);

    //CheckBox1
    const [isChecked1, setChecked1] = useState(false);

    //CheckBox2
    const [isChecked2, setChecked2] = useState(false);

    //
    const [detail,setdetail] = useState('');

    //FullTime
    const [isFullTime, setFullTime] = useState(false);

    //PartTime
    const [isPartTime, setPartTime] = useState(false);

    
    const addPost = () => {

        console.log(
            "image:"+images +
            ", specs:"+specs +
            ", count:"+count +
            ", nonlimit:"+isChecked1+
            ", detail:"+detail +
            ", fullTime:"+isFullTime +
            ", partTime:"+isPartTime +
            ", company:"+isChecked2
        )

        const newImagesUri = "file:///" + images[0].split("file:/").join("");

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

       
    }


    return (    
        <View style={styles.container}> 
        <Text> </Text>
        <Text></Text>
        <Text></Text>
        <Text>                     freelance app</Text>  
        
        <View style={{margin:10}}>
            
            <FlatList
                horizontal={true}
                data={images}

                renderItem={({ item }) => (
                    <Image
                    source={{ uri: item.uri }}
                    style={ styles.image} 
                    onPress={console.log(item+":จิน")}
                    />
                )}

                keyExtractor={(item) => item.uri}
                contentContainerStyle={{margin:10}}
                ListFooterComponent={ 
                    <TouchableOpacity style={styles.image} onPress={pickImages}>
                    <Icon name='add' size={60} color="#4F6C93" style={{ margin:30}}/>         
                    </TouchableOpacity>
                }
            />
        
        </View>
        <View style={{marginTop:20}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#4F6C93', marginLeft:20}}>รับสมัคร</Text>
        </View>

        <View style={{marginTop:-30, marginLeft:100, flexDirection:"row", alignItems:'center'}}>
            <TextInput style={styles.input} onChangeText={(text) => setSpecs(text)}></TextInput>
        </View>

        <View style={{marginTop:20, marginLeft:20}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#4F6C93'}}>จำนวน</Text>
        </View>
        
        <View style={{marginTop:-25, marginLeft:100, flexDirection:"row"}}>
            <TouchableOpacity style={{height:30, width: 30, borderRadius:6, backgroundColor:'#D9D9D9'}} onPress={() => setCount(count - 1)}/>
            <Icon name='remove' size={10} color='#4F6C93' style={{marginTop:10, marginLeft:-20}} />

        </View>

        <View style={{marginTop:-35, marginLeft:140, flexDirection:"row", alignItems:'center'}}>
            <View style={{height:40, width: 80, borderRadius:6, backgroundColor:'#F2F2F2'}}></View>
            <Text style={{fontSize:20, marginLeft:-50}}>{count}</Text>

        </View>

        <View style={{marginTop:-35, marginLeft:230, flexDirection:"row", alignItems:'center'}}>
            <TouchableOpacity style={{height:30, width: 30, borderRadius:6, backgroundColor:'#D9D9D9'}} onPress={() => setCount(count + 1)}/>
            <Icon name='add' size={10} color='#4F6C93' style={{marginLeft:-20}}/>
        </View>

        <View style={{marginTop:-25, marginLeft:280}}>
            <Text style={{fontSize:16, fontWeight:'bold', color:'#4F6C93'}}>ไม่จำกัด</Text>
        </View>

        <View style={{marginTop:-27, marginLeft:335, flexDirection:"row", alignItems:'center'}}>
            <Checkbox 
                style={styles.checkbox} 
                value={isChecked1} 
                onValueChange={setChecked1} 
                color={isChecked1 ? '#4F6C93' : '#D9D9D9'}
            />
        </View>

        <View style={{marginTop:20, marginLeft:20, flexDirection:'row'}}>
            <TextInput multiline={true} style={{width:350, height:150, borderRadius:6,backgroundColor:'#F2F2F2'}}
            onChangeText={(text) => setdetail(text)}></TextInput>
        </View>

        <View style={{alignItems:'flex-start', marginLeft:20, margin:30}}>
            <TouchableOpacity style={{height:60, width:160,borderRadius:6, backgroundColor: isFullTime ? '#80E1D0' : '#f5fffa'}} onPress={() => setFullTime(!isFullTime)}>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#4F6C93', marginLeft:40, marginTop:-45}}>Full time</Text>
        </View>

        <View style={{alignItems:'flex-end', margin:20, marginTop:-75}}>
            <TouchableOpacity style={{height:60, width:160, alignItems:'center',borderRadius:6, backgroundColor: isPartTime ? '#E89F9F' : '#f5fffa'}} onPress={() => setPartTime(!isPartTime)}>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#4F6C93', marginRight:35, marginTop:-45}}>Part time</Text>
        </View>

        <View style={{margin:20, flexDirection:"row", alignItems:'center'}}>
            <Checkbox 
                style={styles.checkbox} 
                value={isChecked2} 
                onValueChange={setChecked2} 
                color={isChecked2 ? '#4F6C93' : '#D9D9D9'}
            />
            <Text style={styles.paragraph}>รับสมัครในนามของบริษัท</Text>
        </View>

        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#75A9EE',height:60,width:160,alignItems:'center',justifyContent:'center',borderRadius:6 }} 
            onPress={() => addPost()}>

            </TouchableOpacity>
            <Text style={{fontSize:24, fontWeight:'bold', color:'#EFF6FF', margin:-45}}>โพสต์</Text>
        </View>

        </View>
    ); 
}

export default Postscreen  
const styles = StyleSheet.create({     
    container: {         
        flex:2       
     },
    input:{
        height:40,
        width: 280,
        borderRadius:6,
        backgroundColor:'#F2F2F2',
    },
    image:{
        width: 110, 
        height: 130, 
        margin:5, 
        borderRadius:6,
        backgroundColor: '#cccccc'

    },
    checkbox: {
        margin: 8,
        borderRadius:6
    },
    paragraph: {
        fontSize:16, 
        fontWeight:'bold',
        color:'#4F6C93'
    },


    });