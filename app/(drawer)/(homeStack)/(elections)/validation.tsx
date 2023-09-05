import ControlledInput from "@components/controlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, ReText } from "@styles/theme";
import {
  ValidationElectoralSchemaType,
  validationElectoralSchema,
} from "@src/types/schema";
import { hs, ms, vs } from "@utils/platform";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import CustomButton from "@components/ui/customButton";
import { useStore } from "@zustand/store";
import { storeDataToStorage, width } from "@utils/helper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { vice } from "@src/data/vice";
import Snackbar from "@components/snackbar";
import { Modal, Portal } from "react-native-paper";
import { useState } from "react";

const ValidationScreen = () => {
  const { isDark, user } = useStore();
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm<ValidationElectoralSchemaType>({
    resolver: zodResolver(validationElectoralSchema),
  });
  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();
  const viceInfo = vice.find((v) => v.id === id);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onVoteConfirm = async (data: ValidationElectoralSchemaType) => {
    hideModal();
    const userWithElectoralNumber = {
      ...user,
      electoralNumber: data.electoral,
    };
    await storeDataToStorage("vote", id);
    useStore.setState({
      // @ts-ignore
      user: userWithElectoralNumber,
      snackbarText: "تم التصويت بنجاح",
    });
    router.replace("/user-info");
  };

  return (
    <>
      <Snackbar />
      <Box flex={1} marginHorizontal="hl" marginTop="vm">
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: isDark ? "black6" : "white",
              paddingVertical: vs(16),
              paddingHorizontal: hs(16),
              marginHorizontal: hs(16),
              borderRadius: ms(12),
            }}
          >
            <ReText variant="BodyLarge" textAlign="left" marginBottom="vs">
              {`هل أنت متأكد من التصويت للمرشح ${
                viceInfo?.realName && viceInfo?.realName
              }؟`}
            </ReText>
            <Box flexDirection="row" justifyContent="space-around" gap="hl">
              <CustomButton
                title="لا"
                onPress={hideModal}
                mode="text"
                style={{
                  width: width / 3,
                }}
              />
              <CustomButton
                title="نعم"
                onPress={handleSubmit(onVoteConfirm)}
                style={{
                  width: width / 3,
                }}
              />
            </Box>
          </Modal>
        </Portal>
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
            title="تصويت"
            mode="contained"
            onPress={handleSubmit(showModal)}
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
    </>
  );
};

export default ValidationScreen;
