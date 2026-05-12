import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function DiaryCardInput(){
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [inputHeight, setInputHeight] = useState(100);

    const checkInput = () => {
        if(content.trim() === ""){
            setPopupMessage("Please enter some content for your diary entry.");
            setShowPopup(true);
            setTimeout(() => {
                    setShowPopup(false);
            }, 2000);
        }
        else{
            saveDiary();
        }
    }
    
    const addBackground = async() =>{
        try{
            // ask permission
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(!permission.granted){
                alert("Permision denied!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect: [4,3],
                quality : 1,
             });

            if(!result.canceled){
                setImage(result.assets[0].uri);
            }
           }
        catch(err){
             
        }
    };

    const saveDiary = async () =>{
        try{

            // send the content of the diary to the backend for saving in the database
            const response = await fetch("http://192.168.100.40:3000/diary", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: content,
                    date: new Date()
                 })
                });

                 // to fetch the data from backend for checking
                 const text = await response.text();
                 console.log("STATUS:", response.status);
                 console.log("RAW:", text);

                 setContent("")
                 

                 //success message
                 setPopupMessage("Diary Saved Successfully!");
                 setShowPopup(true);

                 setTimeout(() => {
                    setShowPopup(false);
                 }, 6000);
        }
        catch(err){
            console.log("Error : ", err);
        }
    }

    return(
        
        <View
          style={{
            borderColor: "#000000", 
            borderRadius: 10, 
            backgroundColor:"#ffffff",
            padding:20,
            margin:20,
            gap:120,
          }}>
            
            <Modal
    transparent
    visible={showPopup}
    animationType="fade"
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 25,
          borderRadius: 20,
          width: "70%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {popupMessage}
        </Text>
      </View>
    </View>
  </Modal>

            <TextInput
            multiline
            style={{
             fontSize: 16,
             fontStyle: "italic",
             height: inputHeight,
             maxHeight: 500,
             textAlignVertical: "top",
            }}
             placeholder  = "Write your story here..."
             value={content}              
             onChangeText={setContent}   
             onContentSizeChange={(e) =>
             setInputHeight(e.nativeEvent.contentSize.height)
            }
            />

            {image && (
                <Image
                    source={{uri:image}}
                    style={{
                        width: "100%",
                        height : 150,
                        marginTop:10,
                        borderRadius: 10,
                    }}
                />
            )
            }

            <View
              style={{
                flexDirection : "row",
                justifyContent : "flex-end",
                gap:10,
              }}>

            <TouchableOpacity
              style={{
                flexDirection : "row",
                gap:10,
                backgroundColor :"#1642bd",
                width : "50%",
                padding : 10,
                borderRadius : 50,
                justifyContent : "center",
                alignItems : "center",
              }}
              onPress={addBackground} >
            <Text
             style={{
                 color : "#ffffff"
             }}>
              + Add Background
            </Text>
            </TouchableOpacity>


            <TouchableOpacity
             style={{
                flexDirection : "row",
                gap:10,
                backgroundColor :"#1642bd",
                width : "25%",
                padding : 10,
                borderRadius : 50,
                justifyContent : "center",
                alignItems : "center",
             }}
             onPress={checkInput}>
            <Text
             style={{
                 color : "#ffffff"
             }}>
                Save
            </Text>           
            </TouchableOpacity> 
            </View>
        </View>
    )
}