import { useCallback, useEffect, useState } from "react";
import {
  blurhash,
  getDataFromStorage,
  storeDataToStorage,
  width,
} from "@utils/helper";
import OnBoarding from "@components/onBoarding";
import { Box, ReText, Theme } from "@styles/theme";
import { router, useNavigation, useRouter } from "expo-router";
import { logoutMutation } from "@apis/auth";
import ImagesCarousel from "@components/imagesCarousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { homeIcons } from "@src/data/homeIcons";
import { TouchableOpacity } from "react-native";

const HomeScreen = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const { colors } = useTheme<Theme>();
  const navigation: any = useNavigation();
  const route = useRouter();

  const { mutate } = logoutMutation();

  useEffect(() => {
    const firstTime = async () => {
      const firstTime = await getDataFromStorage("firstTime");
      if (firstTime === null) {
        setIsFirstTime(true);
      }
    };
    firstTime();
  }, []);

  // const onPress = async () => {
  //   mutate();
  //   await storeDataToStorage("firstTime", null);
  //   router.replace("/sign-in");
  // };

  const onFinished = useCallback(async () => {
    setIsFirstTime(false);
    await storeDataToStorage("firstTime", true);
    router.replace("/sign-in");
  }, []);

  if (isFirstTime) {
    return <OnBoarding onFinished={onFinished} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginEnd="hm"
        height={vs(60)}
      >
        <Image
          source={require("@assets/icon.png")}
          style={{ width: ms(72), height: ms(72) }}
          contentFit="contain"
          placeholder={blurhash}
          transition={400}
          placeholderContentFit="contain"
        />
        <Feather
          name="menu"
          size={ms(24)}
          color={colors.text}
          onPress={() => navigation.openDrawer()}
        />
      </Box>
      <Box marginTop="vxs">
        <ImagesCarousel
          images={[
            require("@assets/images/carousel/2.png"),
            require("@assets/images/carousel/2.png"),
            require("@assets/images/carousel/2.png"),
          ]}
        />
      </Box>
      <Box
        flexDirection="row"
        marginTop="v4xl"
        justifyContent="space-evenly"
        flexWrap="wrap"
        gap="vl"
      >
        {homeIcons.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => route.push(item.route)}>
            <Image
              source={item.icon}
              style={{ width: width / 3, height: vs(100) }}
              contentFit="contain"
              placeholder={blurhash}
              transition={400}
              placeholderContentFit="contain"
            />
            <ReText
              variant="TitleMedium"
              textAlign="center"
              fontFamily="CairoBold"
            >
              {item.title}
            </ReText>
          </TouchableOpacity>
        ))}
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;
