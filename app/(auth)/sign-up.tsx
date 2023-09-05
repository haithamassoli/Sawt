import { Feather } from "@expo/vector-icons";
import { IconSize } from "@styles/size";
import { Box, ReText, Theme } from "@styles/theme";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hs, ms, vs } from "@utils/platform";
import ControlledInput from "@components/controlledInput";
import { ScrollView, TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { SignUpSchemaType, signUpSchema } from "@src/types/schema";
import { useRef } from "react";
import CustomButton from "@components/ui/customButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "@zustand/store";
import { PhoneAuthProvider } from "firebase/auth";
import { auth, firebaseConfig } from "@src/firebase.config";
import { FirebaseRecaptchaVerifierModal } from "@components/firebase-recaptcha/modal";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";

const SingUp = () => {
  const recaptchaVerifier = useRef(null);
  const { colors } = useTheme<Theme>();

  const { control, handleSubmit } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      await phoneProvider
        .verifyPhoneNumber(
          `+962${data.phoneNumber}`,
          recaptchaVerifier.current!
        )
        .then((verificationId) => {
          useStore.setState({
            snackbarText:
              "تم الربط مع سند بنجاح يرجى، لقد تم إرسال رسالة تحقق إلى هاتفك",
          });
          router.push(
            // @ts-ignore
            `/verification?verificationId=${verificationId}&phone=+962${data.phoneNumber}&name=${data.name}&nationalId=${data.nationalId}`
          );
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <Box
      flex={1}
      style={{
        paddingTop: useSafeAreaInsets().top,
      }}
    >
      <Snackbar />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: hs(16),
          paddingTop: vs(16),
        }}
      >
        <Box flex={1}>
          <Box height={"25%"} justifyContent="center" alignItems="center">
            <Animated.View
              entering={FadeInUp.withInitialValues({
                transform: [{ translateY: vs(-25) }],
              }).duration(600)}
            >
              <Feather name="user" color={colors.primary} size={IconSize.xl} />
            </Animated.View>
            <Animated.View
              entering={FadeInUp.withInitialValues({
                transform: [{ translateY: vs(-25) }],
              })
                .duration(600)
                .delay(100)}
            >
              <ReText variant="DisplaySmall">تسجيل حساب جديد</ReText>
            </Animated.View>
          </Box>
          <Box height={vs(24)} />
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(300)}
          >
            <ReText variant="LabelLarge" textAlign="left">
              الاسم
            </ReText>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(400)}
          >
            <ControlledInput
              control={control}
              name="name"
              mode="outlined"
              placeholder="محمد أحمد"
              autoComplete="name"
              textContentType="name"
              outlineStyle={{
                borderRadius: ms(18),
              }}
              style={{
                backgroundColor: colors.secBackground,
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(600)}
          >
            <ReText variant="LabelLarge" textAlign="left">
              رقم الهاتف
            </ReText>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(700)}
          >
            <ControlledInput
              control={control}
              name="phoneNumber"
              mode="outlined"
              placeholder="771234567"
              inputMode="numeric"
              keyboardType="numeric"
              outlineStyle={{
                borderRadius: ms(18),
              }}
              style={{
                backgroundColor: colors.secBackground,
              }}
              right={
                <TextInput.Affix
                  text="+962"
                  textStyle={{
                    color: colors.primary,
                  }}
                />
              }
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(900)}
          >
            <ReText variant="LabelLarge" textAlign="left">
              الرقم الوطني
            </ReText>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(1000)}
          >
            <ControlledInput
              control={control}
              name="nationalId"
              mode="outlined"
              placeholder="2000123456"
              outlineStyle={{
                borderRadius: ms(18),
              }}
              style={{
                backgroundColor: colors.secBackground,
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(1200)}
          >
            <CustomButton
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              title="تسجيل"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(1400)}
          >
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <ReText
                marginTop="hm"
                marginHorizontal="hs"
                textAlign="left"
                variant="BodySmall"
              >
                لديك حساب؟ تسجيل الدخول
              </ReText>
            </TouchableOpacity>
          </Animated.View>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SingUp;
