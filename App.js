import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View,TouchableOpacity,Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  // This is how we create a state in a functional component in react/react native
  // This are the items in the array and their meaning and fucntion:
  // task = name of the state (track the task from the box)
  // setTask = function used to set the state (task)

  // useState info:
  // We use useState for things that change often in our app.
  // So instead of creating a variable everytime someone wants to add a new task
  const [task, setTask]=useState();
  const [taskItems,setTaskItems]=useState([]);

  // create a function that will log the task stored in the State.
  const handleAddTask = () => {
    // Adding this line will make the keyboard on the phone go down once the +(add button) is pressed.
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    // null so this part gets empty
    setTask(null);
  }

  // DELETE TASK

  // Should take the index in the array so we can take it out
  // Will get the Copy of the items and create a new array with everything from taskItems and stores it on itemsCopy. 
  // splices = will remove 1 item from the array and store the result back in itemsCopy
  // Will set up the TaskItems back to itemsCopy wich will not include the one we just deleted
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }


  return (

    <View style={styles.container}>
      {/* Adding scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow:1
        }}
        // Determines if the keyboard should stay visible after a tap.
        // handled = will not dismiss automatically, will have to click on the Add('+') symbol.
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks  */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>

          {/* This is where the tasks will go  */}
          {
            taskItems.map((item,index)=>{
              return (
              <TouchableOpacity key={index} onPress = {() => completeTask(index)}>
                  <Task  text={item}/>
              </TouchableOpacity>
              )
            })
          }
          {/* <View> */}
          
        </View>

       
          
      </View>
        </ScrollView>
      </View>
      

      )/* Write a task
      KeyboardAvoidingView which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
      behavior = {Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >

        {/* onChangeText = everytime the text changes will grab the text and will set the task to be that text */}
        {/* We want to set the 'value' to be equal to that state */}
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
        
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>

          </View>

        </TouchableOpacity>
      </KeyboardAvoidingView>

    
    
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    
  
  },
 

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
sectionTitle: {
  fontSize: 24,
  fontWeight: 'bold'

},
items: {
  marginTop:30,
},


// Add task styling 
writeTaskWrapper:{
  position:'absolute',
  bottom: 60,
  width:'100%',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center'



},

input:{
paddingVertical:15,
paddingHorizontal:15,
backgroundColor:'#FFF',
borderRadius:60,
borderColor:'#C0C0C0',
borderWidth:1,
width:250,
},

addWrapper:{
  width:60,
  height:60,
  backgroundColor:'#FFF',
  borderRadius:60,
  justifyContent:'center',
  alignItems:'center',
  borderColor:'#C0C0C0',
  borderWidth:1,  




},
addText:{},


});
