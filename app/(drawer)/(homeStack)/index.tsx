import { width } from "@utils/helper";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation, router } from "expo-router";
import ImagesCarousel from "@components/imagesCarousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { homeIcons } from "@src/data/homeIcons";
import { TouchableOpacity } from "react-native";
import { useStore } from "@zustand/store";
import Snackbar from "@components/snackbar";
import Animated, { FadeInUp } from "react-native-reanimated";

const HomeScreen = () => {
  const { colors } = useTheme<Theme>();
  const navigation: any = useNavigation();
  const { user } = useStore();

  return (
    <Box
      flex={1}
      style={{
        paddingTop: useSafeAreaInsets().top,
      }}
    >
      <Snackbar />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal="hm"
        height={vs(60)}
      >
        <ReText variant="TitleMedium" fontFamily="CairoBold" color="primary">
          أهلا وسهلاً {user?.name}
        </ReText>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={ms(24)} color={colors.text} />
        </TouchableOpacity>
      </Box>
      <Box marginTop="vxs">
        <Animated.View
          entering={FadeInUp.withInitialValues({
            transform: [{ translateY: vs(-25) }],
          }).duration(600)}
        >
          <ImagesCarousel
            images={[
              require("@assets/images/carousel/2.png"),
              require("@assets/images/carousel/2.png"),
              require("@assets/images/carousel/2.png"),
            ]}
          />
        </Animated.View>
      </Box>
      <Box
        flexDirection="row"
        marginTop="v4xl"
        justifyContent="space-evenly"
        flexWrap="wrap"
        gap="vs"
      >
        {homeIcons.map((item, index) => (
          <Animated.View
            key={index.toString()}
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(index * 200 + 200)}
          >
            <TouchableOpacity
              onPress={() => {
                if (item.id === 3)
                  return useStore.setState({ snackbarText: "قريباً" });
                // @ts-ignore
                router.push(item.route);
              }}
              style={{
                marginBottom: vs(32),
              }}
            >
              <Box
                width={width / 3}
                height={width / 3}
                backgroundColor="black8"
                style={{
                  borderRadius: width / 3 / 2,
                }}
              >
                <Image
                  source={item.icon}
                  style={{
                    width: ms(112),
                    height: ms(112),
                    alignSelf: "center",
                  }}
                  contentFit="contain"
                  tintColor={item.id === 3 ? colors.black5 : null}
                  transition={400}
                />
              </Box>
              <ReText
                variant="TitleMedium"
                textAlign="center"
                fontFamily="CairoBold"
                style={{
                  color: item.id === 3 ? colors.black6 : colors.primary,
                }}
              >
                {item.title}
              </ReText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Box>
    </Box>
  );
};

export default HomeScreen;
