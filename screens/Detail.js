import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

const Detail = ({route}) => {
    const { user } = useContext(AuthContext);
    // const userId = user.uid;
    const todoRef = firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();
    const [addData, setAddData] = useState('');
    // const updateTodo = () => {
    //     if(textHeading && textHeading.length > 0) {
    //         todoRef
    //         .doc(route.params.item.id)
    //         .update({
    //             name: textHeading
    //         }).then(() => {
    //             navigation.navigate('Home');
    //         }).catch(error => {
    //             alert(error.message);
    //         }
    //         );
    //     }
    // }
    // const updateTodo = (todos) => {
    //     if(addData && addData.length > 0) {
    //         todoRef
    //         .doc(todos.id)
    //         .update({
    //             heading: addData
    //         }).then(() => {
    //             navigation.navigate('Home');
    //         }
    //         ).catch(error => {
    //             alert(error);
    //         }
    //         );
    //     }
    // }
    const updateTodo = () => {
        //check if we have a todo
        if(addData && addData.length > 0) {
            //get the timestamp
            const timestamp = firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp,
                userId: user.uid,
            };
            todoRef.update(data).then(() => {
                setAddData('')
                alert('Todo added successfully');
                //release the keyboard
                Keyboard.dismiss();
            })
            .catch(error => {
                alert(error);
            });
        }
    }
return(
    <View style={styles.container}>
        <TextInput
        style={styles.textField}
        onChangeText={(heading) => setAddData(heading)}
        value={addData}
        placeholder="Update Todo"
        />
        <Pressable
        style={styles.buttonUpdate}
        onPress={() => updateTodo()}
        >
            <Text>UPDATE TODO</Text>
        </Pressable>
    </View>
)
}
export default Detail;
const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius:4,
        elevation: 10,
        backgroundColor: '#0de065',
    }
})