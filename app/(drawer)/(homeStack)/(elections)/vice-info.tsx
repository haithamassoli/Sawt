import Header from "@components/header";
import ElectionsButton from "@components/ui/electionsButton";
import { vice } from "@src/data/vice";
import { Box, ReText } from "@styles/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const ViceInfoScreen = () => {
  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();

  const viceInfo = vice.find((v) => v.id === id);
  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              title={viceInfo?.realName!}
              onPress={() => props.navigation.goBack()}
            />
          ),
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
            <Box
              backgroundColor="primary"
              paddingVertical="vs"
              borderTopLeftRadius="m"
              borderTopRightRadius="m"
            >
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
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <Box
              borderWidth={1}
              borderColor="black6"
              paddingHorizontal="hxs"
              paddingVertical="vxs"
              borderBottomLeftRadius="m"
              borderBottomRightRadius="m"
            >
              {viceInfo?.description?.map((d, index) => (
                <Animated.View
                  key={index.toString()}
                  entering={FadeInUp.duration(600).delay(200 * index + 200)}
                >
                  <ReText variant="BodyLarge" textAlign="left">
                    {d}
                  </ReText>
                </Animated.View>
              ))}
            </Box>
          </Animated.View>
        </Box>
        <Box marginTop="vm">
          <Animated.View entering={FadeInUp.duration(600).delay(800)}>
            <ElectionsButton
              title="البيان الانتخابي"
              subTitle="يمكنك الاطلاع على البيان الانتخابي الخاص بالمرشح."
              onPress={() => {}}
            />
          </Animated.View>
          <Box marginTop="vm" />
          <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
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
