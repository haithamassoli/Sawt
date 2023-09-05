import { ScrollView } from "react-native";
import { useRef, useState, memo, useCallback } from "react";
import { isIOS, vs } from "@utils/platform";
import { StatusBar } from "expo-status-bar";
import { width } from "@utils/helper";
import { Box, ReText } from "@styles/theme";
import CustomButton from "@components/ui/customButton";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@styles/colors";

const OnBoarding = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(isIOS ? 0 : 1);

  const onNext = () => {
    setSelectedIndex((prev) => {
      scrollRef.current?.scrollTo({
        animated: true,
        x: width * (isIOS ? prev + 1 : prev - 1),
        y: 0,
      });
      return isIOS ? prev + 1 : prev - 1;
    });
  };

  const onFinished = useCallback(async () => {
    router.replace("/sign-in");
  }, []);

  const setImageIndex = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setSelectedIndex(index);
  };
  return (
    <Box flex={1}>
      <StatusBar hidden />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setImageIndex}
        pagingEnabled
        contentContainerStyle={{
          marginTop: !isIOS ? useSafeAreaInsets().top : 0,
          backgroundColor: Colors.primary,
        }}
      >
        <Box
          flex={1}
          width={width}
          paddingHorizontal="hl"
          justifyContent="space-evenly"
        >
          <Box marginBottom="h4xl">
            <Animated.View entering={FadeInUp.duration(600)}>
              <Image
                source={require("@assets/images/sawt.png")}
                transition={400}
                style={{
                  height: vs(280),
                }}
              />
            </Animated.View>
            <Animated.View entering={FadeInUp.duration(600).delay(200)}>
              <ReText variant="TitleLarge" textAlign="center" color="lightText">
                يتيح تطبيق صوت للمواطن الأردني ممارسة حقه الدستوري بالانتخاب
                أينما كان .. وقتما شاء
              </ReText>
            </Animated.View>
          </Box>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: 420 }],
              opacity: isIOS ? 0 : 1,
            })
              .duration(600)
              .delay(400)}
          >
            <CustomButton mode="elevated" title="التالي" onPress={onNext} />
          </Animated.View>
        </Box>
        <Box flex={1} width={width} justifyContent="space-between">
          {((selectedIndex === 1 && isIOS) ||
            (selectedIndex === 0 && !isIOS)) && (
            <Box
              marginBottom="h4xl"
              gap="hl"
              paddingHorizontal="hl"
              justifyContent="center"
              height={"46%"}
            >
              <Animated.View entering={FadeInUp.duration(600)}>
                <ReText
                  variant="TitleLarge"
                  textAlign="center"
                  color="lightText"
                >
                  كما يقدم خدمة المشاركة بالاستفتاءات التي قد تجريها الحكومات
                  لاستطلاع الرأي العام
                </ReText>
              </Animated.View>
              <Animated.View
                entering={FadeInUp.withInitialValues({
                  transform: [{ translateY: vs(420) }],
                  opacity: isIOS ? 0 : 1,
                })
                  .duration(600)
                  .delay(200)}
              >
                <CustomButton
                  mode="elevated"
                  title="التالي"
                  onPress={onFinished}
                />
              </Animated.View>
            </Box>
          )}
          {((selectedIndex === 1 && isIOS) ||
            (selectedIndex === 0 && !isIOS)) && (
            <Animated.View
              entering={FadeInDown.duration(600).delay(400)}
              style={{
                height: "46%",
              }}
            >
              <Image
                source={require("@assets/images/hands.png")}
                contentFit="cover"
                transition={400}
                style={{
                  height: "100%",
                }}
              />
            </Animated.View>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default memo(OnBoarding);
