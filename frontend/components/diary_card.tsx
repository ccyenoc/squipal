import { Text, View } from "react-native";

type DiaryCardProps = {
    content : string,
    date : string,
}

export default function DiaryCard({content , date}: DiaryCardProps){
    return(
        <View
         style={{
            backgroundColor : "#ffffff",
            padding : 20,
            borderRadius : 20,
            borderColor : "#000000",
            marginBottom : 20,
         }}>
            <Text
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>{content}</Text>  
             <Text
                style={{
                textAlign: "right",
                color: "#888888",
                fontStyle : "italic",
            }}
            >
              {date}
            </Text>
        </View>
    )
}