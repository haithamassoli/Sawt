import { Image, ScrollView } from "react-native";
import { useRef, useState, memo, useCallback } from "react";
import { isIOS } from "@utils/platform";
import { StatusBar } from "expo-status-bar";
import { width } from "@utils/helper";
import { Box, ReText } from "@styles/theme";
import CustomButton from "@components/ui/customButton";
import { router } from "expo-router";

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
      >
        <Box
          flex={1}
          width={width}
          backgroundColor="primary"
          paddingHorizontal="hl"
          justifyContent="space-evenly"
        >
          <Box marginBottom="h4xl">
            <Image source={require("@assets/images/sawt.png")} />
            <ReText variant="TitleLarge" textAlign="center" color="lightText">
              يتيح تطبيق صوت للمواطن الأردني ممارسة حقه الدستوري بالانتخاب أينما
              كان .. وقتما شاء
            </ReText>
          </Box>
          <CustomButton mode="elevated" title="التالي" onPress={onNext} />
        </Box>
        <Box
          flex={1}
          width={width}
          backgroundColor="primary"
          justifyContent="space-between"
        >
          <Box
            marginBottom="h4xl"
            gap="hl"
            paddingHorizontal="hl"
            justifyContent="center"
            height={"46%"}
          >
            <ReText variant="TitleLarge" textAlign="center" color="lightText">
              كما يقدم خدمة المشاركة بالاستفتاءات التي قد تجريها الحكومات
              لاستطلاع الرأي العام
            </ReText>
            <CustomButton mode="elevated" title="التالي" onPress={onFinished} />
          </Box>
          <Image
            source={require("@assets/images/hands.png")}
            style={{
              width: "100%",
              height: "46%",
              alignSelf: "flex-start",
              resizeMode: "cover",
            }}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default memo(OnBoarding);
