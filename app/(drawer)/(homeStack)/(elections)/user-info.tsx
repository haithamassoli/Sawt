import InfoTable from "@components/infoTable";
import Snackbar from "@components/snackbar";
import ElectionsButton from "@components/ui/electionsButton";
import { Box } from "@styles/theme";
import { useStore } from "@zustand/store";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const UserInfoScreen = () => {
  const { user } = useStore();
  return (
    <Box flex={1}>
      <Snackbar />
      <Box
        flex={1}
        paddingHorizontal="hm"
        paddingVertical="vm"
        justifyContent="space-between"
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          <InfoTable
            name={user?.name!}
            electoralDistrict="الأولى"
            governorate="العاصمة"
            id={user?.nationalId!}
            phone={user?.phoneNumber!}
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
    </Box>
  );
};

export default UserInfoScreen;
