import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, ListViewBase } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
// const myIcon = <Icon name='trash-o' color='red'/>
const Home = () => {
  const { user, logout } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const todoRef = firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();
    // const userId = user.uid;
    
    const fetchTodos = async() => {
      try {
        const todos =[];

        await firestore()
        .collection('todos')
        .where('userId','==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          // const todos = [];
          querySnapshot.forEach((doc) => {
            const {
              userId,
              id,
              heading
            } = doc.data();
            todos.push({
              id: doc.id,
              heading,
              userId,
            });
          });
        });
        setTodos(todos);
      } catch(e) {
        console.log(e);
      }
    };

    //fetch or read data from firebase
    // useEffect(() => {
    //     todoRef
    //     // .where('userId','==', user.uid)
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(
    //         querySnapshot => {
    //             const todos = [];
    //             querySnapshot.forEach((doc) => {
    //                 const { heading } = doc.data();
    //                 todos.push({
    //                     userId: user.uid,
    //                     id: doc.id,
    //                     heading,
    //                 });
    //             });
    //             setTodos(todos);
    //         });
    // }, []);
    //delete a todo from firebase
    const deleteTodo = (todos) => {
        todoRef.doc(todos.id).delete().then(() => {
            alert('Todo deleted successfully');
    })
    .catch(error => {
        alert(error);
    });
}
//add a todo
const addTodo = () => {
    //check if we have a todo
    if(addData && addData.length > 0) {
        //get the timestamp
        const timestamp = firestore.FieldValue.serverTimestamp();
        const data = {
            heading: addData,
            createdAt: timestamp,
            userId: user.uid,
        };
        todoRef.add(data).then(() => {
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

// const updateTodo = (todos) => {
//     if(todos.heading && todos.heading.length > 0) {
//         todoRef
//         .doc(todos.id)
//         .update({
//             heading: todos.heading
//         }).then(() => {
//             navigation.navigate('Home');
//         }
//         ).catch(error => {
//             alert(error);
//         }
//         );
//     }
// }

useEffect(() => {
  fetchTodos();
});

return(
    <View style={{flex:1}}>
        <View style={styles.formContainer}>
            <TextInput
            style={styles.input}
            placeholder="Add A New Todo"
            placeholderTextColor="#aaaaaa"
            onChangeText={(heading) => setAddData(heading)}
            value={addData}
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            />
            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data = { todos }
            numColumns={1}
            renderItem={({item}) => (
                <View>
                    <Pressable
                    style={styles.container}
                    // onPress={() => navigation.navigate('Detail', {item})}
                    >
                        <Icon
                        name='trash-o'
                        color='red'
                        onPress={() => deleteTodo(item)}
                        style={styles.todoIcon}
                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            )}
        />
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
    </View>
)
}

export default Home;
const styles = StyleSheet.create({
    container: {
        // backgroundColor:'#e5e5e5',
        backgroundColor:'#fff',
        // backgroundColor:'#03C4A1',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        color:'white',
    },
    innerContainer: {
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
        color:'black',
    },
    itemHeading: {
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
        color:'black',
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:40,
        color:'black',
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
        color: 'black'
    },
    button:{
        height:47,
        borderRadius:5,
        backgroundColor:'#00b5ec',
        width:80,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'white',
        fontSize:20,
    },
    todoIcon:{
        margin:5,
        marginTop:0,
        marginBottom:0,
        fontSize:22,
        marginLeft:14,
    }
})
// import { View, Text, StyleSheet } from 'react-native'
// import React, { useContext } from 'react'
// import FormButton from '../components/FormButton';
// import { AuthContext } from '../navigation/AuthProvider';

// const HomeScreen = () => {
//     const {user, logout} = useContext(AuthContext);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>HomeScreen {user.uid}</Text>
//       <FormButton buttonTitle='Logout' onPress={() => logout()} />
//     </View>
//   );
// }

// export default HomeScreen;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#f9fafd',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     text: {
//         fontSize: 20,
//         color:'#333333',
//     }
// });