import Snackbar from "@components/snackbar";
import CustomButton from "@components/ui/customButton";
import { Feather } from "@expo/vector-icons";
import { Box, ReText } from "@styles/theme";
import { getDataFromStorage, storeDataToStorage, width } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
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
];

const CandidatesScreen = () => {
  const [selected, setSelected] = useState({});
  const { isDark } = useStore();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onVote = () => {
    // @ts-ignore
    if (!selected?.id)
      return useStore.setState({
        snackbarText: "يجب اختيار مرشح واحد للتصويت",
      });
    showModal();
  };

  const onVoteConfirm = async () => {
    const vote = await getDataFromStorage("vote");
    if (vote) {
      hideModal();
      return useStore.setState({
        snackbarText: "تم التصويت من قبل",
      });
    }
    await storeDataToStorage("vote", selected);
    hideModal();
    useStore.setState({ snackbarText: "تم التصويت بنجاح" });
    router.replace("/(drawer)/(homeStack)/(elections)/user-info");
  };

  return (
    <>
      <Snackbar />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: isDark ? "black6" : "white",
            paddingVertical: vs(16),
            paddingHorizontal: hs(16),
            marginHorizontal: hs(16),
            borderRadius: ms(12),
          }}
        >
          <ReText variant="BodyLarge" textAlign="left" marginBottom="vs">
            هل أنت متأكد من التصويت لهذا المرشح؟
          </ReText>
          <Box flexDirection="row" justifyContent="space-around" gap="hl">
            <CustomButton
              title="لا"
              onPress={hideModal}
              mode="text"
              style={{
                width: width / 3,
              }}
            />
            <CustomButton
              title="نعم"
              onPress={onVoteConfirm}
              style={{
                width: width / 3,
              }}
            />
          </Box>
        </Modal>
      </Portal>
      <ReText
        variant="BodyMedium"
        textAlign="left"
        marginHorizontal="hl"
        marginTop="vm"
      >
        ● انقر على i لاستعراض بيانات المرشح
      </ReText>
      <ReText variant="BodyMedium" textAlign="left" marginHorizontal="hl">
        ● اختر اسم المرشح الذي ترغب في التصويت له ثم انقر على زر التصويت
      </ReText>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
        }}
        data={data}
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
                height={vs(52)}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom="vs"
                paddingHorizontal="hm"
                paddingVertical="vxs"
                backgroundColor={
                  // @ts-ignore
                  selected?.id == item.id
                    ? "primary"
                    : isDark
                    ? "black6"
                    : "black7"
                }
                borderRadius="l"
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
            marginBottom: vs(26),
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
