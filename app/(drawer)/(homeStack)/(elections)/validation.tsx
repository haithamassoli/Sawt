import ControlledInput from "@components/controlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, ReText } from "@styles/theme";
import {
  ValidationElectoralSchemaType,
  validationElectoralSchema,
} from "@src/types/schema";
import { ms, vs } from "@utils/platform";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import CustomButton from "@components/ui/customButton";
import { useStore } from "@zustand/store";
import { storeDataToStorage } from "@utils/helper";
import Animated, { FadeInUp } from "react-native-reanimated";

const ValidationScreen = () => {
  const { isDark, user } = useStore();
  const { control, handleSubmit } = useForm<ValidationElectoralSchemaType>({
    resolver: zodResolver(validationElectoralSchema),
  });

  const onSubmit = async (data: ValidationElectoralSchemaType) => {
    console.log(data);
    const userWithElectoralNumber = {
      ...user,
      electoralNumber: data.electoral,
    };
    await storeDataToStorage("user", userWithElectoralNumber);
    useStore.setState({ user: userWithElectoralNumber });
    router.replace("/user-info");
  };

  return (
    <Box flex={1} marginHorizontal="hl" marginTop="vm">
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        }).duration(600)}
      >
        <ReText
          variant="HeadlineSmall"
          fontFamily="CairoBold"
          textAlign="left"
          color="primary"
        >
          الرقم الانتخابي
        </ReText>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(200)}
      >
        <ReText
          variant="BodyLarge"
          textAlign="left"
          color={isDark ? "black7" : "black5"}
        >
          لضمان حماية بياناتك
        </ReText>
        <ReText
          variant="BodyLarge"
          textAlign="left"
          color={isDark ? "black7" : "black5"}
        >
          يرجى ادخال الرقم الانتخابي الخاص بك.
        </ReText>
      </Animated.View>
      <Box marginTop="vl" />
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(400)}
      >
        <ReText variant="TitleSmall" textAlign="left">
          الرقم الانتخابي
        </ReText>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(600)}
      >
        <ControlledInput
          mode="flat"
          name="electoral"
          control={control}
          style={{
            borderRadius: ms(8),
            height: vs(36),
            width: "100%",
          }}
          underlineStyle={{
            display: "none",
          }}
          contentStyle={{
            borderRadius: ms(8),
            height: vs(36),
          }}
        />
      </Animated.View>
      <Box marginTop="v2xl" />
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(800)}
      >
        <CustomButton
          title="دخول"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{
            marginTop: vs(24),
          }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(1000)}
      >
        <ReText
          variant="BodyLarge"
          marginStart="hm"
          textAlign="center"
          color={isDark ? "black7" : "black5"}
        >
          في حال كنت لا تعرف رقمك الانتخابي يمكنك معرفته من خلال تطبيق سند
        </ReText>
      </Animated.View>
    </Box>
  );
};

export default ValidationScreen;
