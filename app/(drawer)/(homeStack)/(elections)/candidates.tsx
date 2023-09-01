import Snackbar from "@components/snackbar";
import { Feather } from "@expo/vector-icons";
import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const data = [
  {
    id: 1,
    name: "المرشح الأول",
    description: "الوصف",
  },
  {
    id: 2,
    name: "المرشح الثاني",
    description: "الوصف",
  },
  {
    id: 3,
    name: "المرشح الثالث",
    description: "الوصف",
  },
  {
    id: 4,
    name: "المرشح الرابع",
    description: "الوصف",
  },
  {
    id: 5,
    name: "المرشح الخامس",
    description: "الوصف",
  },
  {
    id: 6,
    name: "المرشح السادس",
    description: "الوصف",
  },
  {
    id: 7,
    name: "المرشح السابع",
    description: "الوصف",
  },
  {
    id: 8,
    name: "المرشح الثامن",
    description: "الوصف",
  },
  {
    id: 9,
    name: "المرشح التاسع",
    description: "الوصف",
  },
  {
    id: 10,
    name: "المرشح العاشر",
    description: "الوصف",
  },
];

const CandidatesScreen = () => {
  const [selected, setSelected] = useState({});

  const onVote = () => {
    // @ts-ignore
    if (!selected?.id)
      return useStore.setState({
        snackbarText: "يجب اختيار مرشح واحد للتصويت",
      });
    router.push("/");
    useStore.setState({ snackbarText: "تم التصويت بنجاح" });
  };

  return (
    <>
      <Snackbar />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
        }}
        data={data}
        // estimatedItemSize={100}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            key={index.toString()}
            entering={FadeInUp.duration(600).delay(200 * index)}
          >
            <TouchableOpacity
              onPress={() =>
                // @ts-ignore
                setSelected((prev) => (prev?.id == item.id ? {} : item))
              }
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom="vs"
                paddingHorizontal="hm"
                paddingVertical="vm"
                // @ts-ignore
                backgroundColor={selected?.id == item.id ? "primary" : "black7"}
                borderRadius="l"
                // @ts-ignore
                borderColor={selected?.id == item.id ? "primary" : "black7"}
                // @ts-ignore
                borderWidth={selected?.id == item.id ? 2 : 0}
              >
                <Box flexDirection="row" alignItems="center">
                  <Feather name="user" size={ms(24)} color="black" />
                  <ReText variant="BodyLarge" marginLeft="hs">
                    {item.name}
                  </ReText>
                </Box>
                <TouchableOpacity onPress={() => router.push("/vice-info")}>
                  <Feather name="info" size={ms(26)} color="black" />
                </TouchableOpacity>
              </Box>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      <TouchableOpacity onPress={onVote}>
        <Image
          source={require("@assets/images/icons/vote.png")}
          contentFit="contain"
          style={{
            width: ms(80),
            height: ms(80),
            marginBottom: vs(12),
            marginTop: vs(8),
            backgroundColor: "transparent",
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default CandidatesScreen;
