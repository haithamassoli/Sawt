import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText } from "@styles/theme";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hs, vs } from "@utils/platform";
import ControlledInput from "@components/controlledInput";
import { ScrollView, TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { SignUpSchemaType, signUpSchema } from "@src/types/schema";
import { useRef } from "react";
import CustomButton from "@components/ui/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@zustand/store";
import { PhoneAuthProvider } from "firebase/auth";
import { auth, firebaseConfig } from "@src/firebase.config";
import { FirebaseRecaptchaVerifierModal } from "@components/firebase-recaptcha/modal";
import Animated, { FadeInUp } from "react-native-reanimated";

const SingUp = () => {
  const recaptchaVerifier = useRef(null);

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
            `/verification?verificationId=${verificationId}&phone=+962${data.phoneNumber}&name=${data.name}`
          );
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            </Animated.View>
            <Animated.View
              entering={FadeInUp.withInitialValues({
                transform: [{ translateY: vs(-25) }],
              })
                .duration(600)
                .delay(200)}
            >
              <ReText variant="DisplaySmall">تسجيل حساب جديد</ReText>
            </Animated.View>
          </Box>
          <Box height={vs(32)} />
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
              label={"الاسم"}
              autoComplete="name"
              textContentType="name"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(600)}
          >
            <ControlledInput
              control={control}
              name="phoneNumber"
              label={"رقم الهاتف"}
              placeholder="770000000"
              inputMode="numeric"
              keyboardType="numeric"
              contentStyle={{
                height: vs(52),
                textAlignVertical: "center",
              }}
              right={
                <TextInput.Affix
                  text="+962"
                  textStyle={{
                    color: Colors.primary,
                    height: vs(42),
                  }}
                />
              }
            />
          </Animated.View>
          <Box height={vs(32)} />
          <Animated.View
            entering={FadeInUp.withInitialValues({
              transform: [{ translateY: vs(-25) }],
            })
              .duration(600)
              .delay(800)}
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
              .delay(1000)}
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
    </SafeAreaView>
  );
};

export default SingUp;
