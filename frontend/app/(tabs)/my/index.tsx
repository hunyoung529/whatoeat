import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

function My() {
  return (
    <View style={styles.container}>
      {/* 내 정보 섹션 */}
      <View style={styles.my1}>
        <Text style={styles.sectionTitle}>내 정보</Text>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <FontAwesome name="user" size={20} color="#333" />
            <Text style={styles.itemText}>닉네임 변경</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <FontAwesome name="lock" size={20} color="#333" />
            <Text style={styles.itemText}>비밀번호 변경</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 내 활동 섹션 */}
      <View style={styles.my2}>
        <Text style={styles.sectionTitle}>내 활동</Text>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.itemLeft}>
            <FontAwesome name="book" size={20} color="#333" />
            <Text style={styles.itemText}>내가 쓴 레시피</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemCount}>15</Text>
            <FontAwesome name="chevron-right" size={20} color="#333" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  my1: {
    marginBottom: 30,
  },
  my2: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10, // 아이콘과 텍스트 간 간격
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCount: {
    fontSize: 14,
    color: "#888",
    marginRight: 10, // 숫자와 화살표 간 간격
  },
});

export default My;
