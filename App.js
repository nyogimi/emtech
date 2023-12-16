import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import { useFonts, Rubik_700Bold, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation
  const [goalToDeleteIndex, setGoalToDeleteIndex] = useState(null);

  let [fontsLoaded, fontError] = useFonts({
    Rubik_700Bold,
    Rubik_400Regular,
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim() === "") {
      return;
    }

    if (courseGoals.length >= 5) {
      setShowLimitPopup(true);
      return;
    }

    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    setEnteredGoalText("");
  }

  function deleteGoalHandler(index) {
    // Show the delete confirmation pop-up
    setGoalToDeleteIndex(index);
    setShowDeleteConfirmation(true);
  }

  function confirmDeleteGoal() {
    if (goalToDeleteIndex !== null) {
      const updatedGoals = [...courseGoals];
      updatedGoals.splice(goalToDeleteIndex, 1);
      setCourseGoals(updatedGoals);
    }
    // Close the delete confirmation pop-up
    setShowDeleteConfirmation(false);
    setGoalToDeleteIndex(null);
  }

  function cancelDeleteGoal() {
    // Close the delete confirmation pop-up
    setShowDeleteConfirmation(false);
    setGoalToDeleteIndex(null);
  }

  function clearGoalsHandler() {
    setCourseGoals([]);
  }

  return (
    <ImageBackground
      source={require("./assets/bg-image.jpg")}
      style={styles.appBackground}
    >
      <View style={styles.appContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>COURSE GOALS</Text>
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => setShowWelcome(true)}
          >
            <FontAwesome name="user-circle" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Your Course Goal"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <Pressable style={styles.button} onPress={addGoalHandler}>
            <Text style={styles.buttonText}>Add Goal</Text>
          </Pressable>
        </View>
        <View style={styles.goalsContainer}>
          <Text style={styles.goalsText}>List of Goals</Text>
          <FlatList
            data={courseGoals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.goalItem}>
                <Text style={styles.enteredGoalsText}>{item}</Text>
                <TouchableOpacity onPress={() => deleteGoalHandler(index)}>
                  <AntDesign name="closecircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.clearButtonContainer}>
          <Pressable style={styles.button} onPress={clearGoalsHandler}>
            <Text style={styles.buttonText}>Clear Goals</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />

      <Modal transparent={true} animationType="fade" visible={showWelcome}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Welcome Rhenz Fernandez!,
            Add your goals</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowWelcome(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} animationType="fade" visible={showLimitPopup}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              This is a warning about overwhelming goals . There is too much burden.
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowLimitPopup(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

  <Modal transparent={true} animationType="fade" visible={showDeleteConfirmation}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Are you sure you want to delete this goal?</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.confirmButton} onPress={confirmDeleteGoal}>
          <Text style={styles.confirmButtonText}>Yes</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={cancelDeleteGoal}>
          <Text style={styles.cancelButtonText}>No</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    margin: 25,
    flex: 1,
    alignContent: "center",
    backgroundColor: "rgba(245, 245, 245, 0.5)",
    height: "90%",
    borderRadius: 15,
  },
  appTitle: {
    fontFamily: "Rubik_700Bold",
    fontSize: 32,
    color: "black",
  },
  appBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 13,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "rgb(224,224,224)",
  },
  inputText: {
    flex: 1,
    borderWidth: 0,
    borderColor: "rgba(200, 200, 225, 0.5)",
    backgroundColor: "rgba(217, 232, 251, 0.5)",
    color: "black",
    padding: 13,
    borderRadius: 5,
    marginRight: 5,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
  },
  goalsContainer: {
    flex: 5,
    paddingTop: 15,
    padding: 25,
    borderTopWidth: 2,
    borderColor: "rgb(224,224,224)",
  },
  goalsText: {
    fontSize: 22,
    paddingBottom: 5,
    fontFamily: "Rubik_400Regular",
    justifyContent: "center",
    alignItems: "baseline",
    color: "black",
  },
  goalItem: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  enteredGoalsText: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    textAlignVertical: "center",
  },
  clearButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "70%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    margin: 10,
    color: "black",
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userButton: {
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Add a 1-pixel border
    borderColor: 'black', // Border color
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Add a 1-pixel border
    borderColor: 'black', // Border color
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 18,
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 18,
  },
});
