import InfoTable from "@components/infoTable";
import ElectionsButton from "@components/ui/electionsButton";
import { Box, ReText } from "@styles/theme";
import { Stack } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const ViceInfoScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "د. محمد عبد الله الحسين",
        }}
      />
      <Box
        flex={1}
        paddingHorizontal="hm"
        paddingVertical="vm"
        justifyContent="space-between"
      >
        <Box>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Box backgroundColor="primary" paddingVertical="vs">
              <ReText
                variant="TitleMedium"
                fontFamily="CairoBold"
                textAlign="center"
                color="lightText"
              >
                السيرة الذاتية
              </ReText>
            </Box>
          </Animated.View>
          <Box
            borderWidth={1}
            borderColor="black6"
            paddingHorizontal="hxs"
            paddingVertical="vxs"
          >
            <ReText variant="BodyLarge" textAlign="left">
              حاصل على شهادة البكالوريوس في القانون من الجامعة الأردنية.
            </ReText>
            <ReText variant="BodyLarge" textAlign="left">
              درس الماجستير والدكتوراه في القانون الدولي من جامعة واشنطن.
            </ReText>
            <ReText variant="BodyLarge" textAlign="left">
              عمل مستشارا في وزارة الداخلية.
            </ReText>
          </Box>
        </Box>
        <Box marginTop="vm">
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <ElectionsButton
              title="البيان الانتخابي"
              subTitle="يمكنك الاطلاع على البيان الانتخابي الخاص بالمرشح."
              onPress={() => {}}
            />
          </Animated.View>
          <Box marginTop="vm" />
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <ElectionsButton
              title="وسائل التواصل"
              subTitle="يمكنك عرض وسائل التواصل مع المرشح."
              onPress={() => {}}
            />
          </Animated.View>
        </Box>
      </Box>
    </>
  );
};

export default ViceInfoScreen;
