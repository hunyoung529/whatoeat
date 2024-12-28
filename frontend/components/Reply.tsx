import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { Link } from "expo-router";


export default function Reply() {
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
            <Text>댓글</Text>

            <View>

                <View style={styles.reply_Id_box}>
                    <Image
                        source={require("@/assets/images/reply.svg")}
                    />
                    <Text style={styles.id}>호랑이 </Text><Text>님</Text>
                </View>
                <Text style={styles.reply_content}>너무 맛있게 잘 먹었어요!</Text>


            </View>

            <View>

                <View style={styles.reply_Id_box_mine}>

                    <Image
                        source={require("@/assets/images/reply.svg")}
                    />
                    <Text style={styles.id}>훈영 </Text><Text>님</Text>
                    <Image
                        
                        source={require("@/assets/images/X.png")}
                    />
                </View>
                <Text style={styles.reply_content}>요리킹조리킹 뺨 때리실 뻔</Text>

            </View>

            



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",

    },
    line: {
        border: "1px solid black"
    },
    reply_Id_box: {
        flexDirection: "row", // 가로 정렬
        alignItems: "center", // 세로 중앙 정렬
    },
    id: {
        fontWeight: "bold"
    },
    reply_content: {
        marginLeft: 28,
    },

    reply_Id_box_mine: {
        flexDirection: "row", // 가로 정렬
        alignItems: "center", // 세로 중앙 정렬
    }

});
