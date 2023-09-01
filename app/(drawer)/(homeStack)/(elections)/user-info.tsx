import InfoTable from "@components/infoTable";
import ElectionsButton from "@components/ui/electionsButton";
import { Box } from "@styles/theme";
import { useStore } from "@zustand/store";
import { router } from "expo-router";
import { useEffect } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

const UserInfoScreen = () => {
  const { user } = useStore();
  useEffect(() => {
    if (!user?.electoralNumber) router.replace("/validation");
  }, [user]);
  return (
    <Box
      flex={1}
      paddingHorizontal="hm"
      paddingVertical="vm"
      justifyContent="space-between"
    >
      <Animated.View entering={FadeInUp.duration(600)}>
        <InfoTable
          name="خالد احمد عمر سمير"
          electoralDistrict="الأولى"
          electoralNumber="0123456789"
          id="0123456789"
          phone={user?.phoneNumber || "0771234567"}
        />
      </Animated.View>
      <Box marginBottom="v4xl">
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <ElectionsButton
            title="أسماء المرشحين في الدائرة الأولى"
            subTitle="يمكنك مراجعة السيرة الذاتية والبيان الانتخابي و وسائل التواصل لكل مرشح."
            onPress={() => router.push("/candidates")}
          />
        </Animated.View>
        <Box marginTop="vm" />
        <Animated.View entering={FadeInUp.duration(600).delay(400)}>
          <ElectionsButton
            title="نتائج الانتخابات في الدائرة الأولى"
            subTitle="يمكنك مراجعة نتائج الانتخابات وكافة الإحصاءات 
        المتعلقة بالدورة الفائتة."
            onPress={() => router.push("/results")}
          />
        </Animated.View>
      </Box>
    </Box>
  );
};

export default UserInfoScreen;
