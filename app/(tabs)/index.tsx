import DiaryCard from "@/frontend/components/diary_card";
import DiaryCardInput from "@/frontend/components/diary_card_input";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import squipal from "../../assets/images/squipal.png";

export function HomePage(){
    const [diaries, setDiaries] = useState<any []>([]);
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");
    const [chatMessage , setChatMessage] = useState<any[]>([]);

    // fetch all diaries from database
    const fetchDiaries = async() => {
        try{
            const response = await fetch("http://192.168.100.40:3000/diary");
            const data = await response.json();
            setDiaries(data);

            }
        catch(err){
         console.log("ERROR :",err);
    }
}

      // send the message to the backend for response
      const handleSend = async () => {
  if (!message.trim()) return;

  try {
    console.log("User message:", message);

    // show user message FIRST
    setChatMessage(prev => [
      ...prev,
      { sender: "user", text: message }
    ]);

    setMessage("");

    const response = await fetch("http://192.168.100.40:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // 🔥 LOG AI reply
    console.log("AI reply:", data);

    // show bot reply
    setChatMessage(prev => [
      ...prev,
      { sender: "bot", text: data.reply }
    ]);

    

  } catch (err) {
    console.log("ERROR:", err);
  }
};

 useEffect(() => {
        fetchDiaries();
    }, []);

    return(
        <ScrollView
        style={{ 
            padding: 20 ,
        }}>

            <Modal
              animationType="slide"
              visible={showChat}
              transparent>

                 <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >

                <View
  style={{
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  }}
>
  <View
    style={{
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      height: "75%",
    }}
  >

                {/*header*/}
                <View
                  style={{
                    flexDirection:"row",
                    alignItems:"center",
                    gap:10,
                  }}>

                    <TouchableOpacity onPress={() => setShowChat(false)}>
    <Ionicons
      name="arrow-back"
      size={24}
      color="black"
    />
  </TouchableOpacity>
  
                    <Image
                     source={squipal}
                      style={{
                        width:40,
                        height:40,
                        justifyContent:"center",
                        alignItems:"center",
                      }}/>
                    <Text
                      style={{
                        fontWeight : "bold",
                        fontSize : 20,
                      }}>Squipal AI</Text>

                </View>


                {/*content*/}
                <View
                  style={{
                    marginLeft:10,
                    marginRight :10,
                    marginTop:50,
                    marginBottom: 20,
                  }}>

                    {/*content*/}
                    <ScrollView
                      style={{
                        height : "85%",
                      }}>
  <Text
    style={{
      backgroundColor: "#d1d0d0",
      color: "#000",
      width: "70%",
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
    }}
  >
    Hi! I am your digital pal, Squipal!
  </Text>

  
  {chatMessage.map((msg, index) => (
    <Text
      key={index}
      style={{
        backgroundColor: msg.sender === "user" ? "#0035d3" : "#d1d0d0",
        color: msg.sender === "user" ? "#fff" : "#000",
        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        maxWidth: "70%",
      }}
    >
      {msg.text}
    </Text>
  ))}
  </ScrollView>

                </View>

                {/*text input*/}
                <View
                style={{
                  position: "absolute",
                  bottom: 30,
                  display:"flex",
                  flexDirection:"row",
                  marginTop:20,
                  left: 20,
                  right: 20,
                  gap:8,
                }}>

                <TextInput
                value = {message}
                onChangeText = {setMessage}
                style={{
                  backgroundColor:"#ffffff",
                  borderRadius:20,
                  borderColor:"#d1d0d0",
                  borderWidth:1,
                  padding:15,
                  width : "80%",
                  fontSize:15,
                }}
                placeholder="Chat with Squipal..."
                />

                <TouchableOpacity
    onPress={handleSend}
    style={{
      backgroundColor: "#0035d3",
      paddingVertical: 12,
      paddingHorizontal: 18,
      justifyContent:"center",
      borderRadius: 20,
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>
      Send
    </Text>
  </TouchableOpacity>

                </View>

                
                </View>
                </View>

                </KeyboardAvoidingView>
            </Modal>

        
        <View
   style={{
      marginTop: 70,
      alignItems: "center",
      justifyContent:"center",
      gap: 10,
      flexDirection:"row",
   }}
>
    <TouchableOpacity
      onPress={() => setShowChat(true)}>
   <Image
      source={squipal}
      style={{
         width: 50,
         height: 50,
      }}
   />
   </TouchableOpacity>

   <Text
      style={{
         fontSize: 24,
         textAlign: "center",
         fontWeight : "bold",
      }}
   >
      Welcome Back !
   </Text>
</View>

        < DiaryCardInput   />
        <Text
          style={{
            fontSize : 24,
            fontWeight : "bold",
            textAlign : "left",
            marginBottom : 20,
          }}>Your Story</Text>
        
        
        {diaries.map((diary,index) => (
            <DiaryCard
                key={index}
                content={diary.content}
                date={new Date(diary.date).toLocaleDateString()}
            />
        ))}
      
        </ScrollView>
    )
}

export default HomePage;