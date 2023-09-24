import { width } from "@utils/helper";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation, router } from "expo-router";
import ImagesCarousel from "@components/imagesCarousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { hs, ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { homeIcons } from "@src/data/homeIcons";
import { ScrollView, TouchableOpacity } from "react-native";
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
          أهلا وسهلاً {user?.name.split(" ")[0]}
        </ReText>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={ms(24)} color={colors.text} />
        </TouchableOpacity>
      </Box>
      <Box marginTop="vxs" />
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        }).duration(600)}
        style={{
          marginHorizontal: hs(16),
        }}
      >
        <ImagesCarousel
          images={[
            require("@assets/images/carousel/1.png"),
            require("@assets/images/carousel/2.png"),
            require("@assets/images/carousel/3.png"),
          ]}
        />
      </Animated.View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          flexDirection="row"
          justifyContent="space-evenly"
          flexWrap="wrap"
          style={{
            gap: ms(12),
          }}
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
                    return useStore.setState({
                      snackbarText: "لا يوجد انتخابات بلدية حالياً",
                    });
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
                      width: width / 4,
                      height: width / 4,
                      alignSelf: "center",
                      marginTop: vs(16),
                    }}
                    contentFit="contain"
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
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
