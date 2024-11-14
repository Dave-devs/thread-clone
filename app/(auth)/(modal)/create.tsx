import { StyleSheet, Text, View, Button } from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSheet, {
  BottomSheetMethods,
} from "../../../components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheetScrollView, { BottomSheetScrollViewMethods } from "@/components/BottomSheetScrollView";

const create = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef2 = useRef<BottomSheetScrollViewMethods>(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const pressHandler2 = useCallback(() => {
    bottomSheetRef2.current?.expand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Blank" onPress={() => pressHandler()} />
      <Button title="Scrollable" onPress={() => pressHandler2()} />
      {/* Blank */}
      <BottomSheet
        ref={bottomSheetRef}
        snapTo={"50%"}
        backgroundColor={"white"}
        backDropColor={"black"}
      >
        <Text>Blank</Text>
      </BottomSheet>
      {/* Scrollable */}
      <BottomSheetScrollView
        ref={bottomSheetRef2}
        snapTo={"80%"}
        backgroundColor={"white"}
        backDropColor={"black"}
      >
        <Text>Scrollable</Text>
      </BottomSheetScrollView>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});