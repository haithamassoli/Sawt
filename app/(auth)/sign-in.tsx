import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText } from "@styles/theme";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hs, ms, vs } from "@utils/platform";
import ControlledInput from "@components/controlledInput";
import { ScrollView, TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { useRef } from "react";
import { type ValidationSchemaType, validationSchema } from "@src/types/schema";
import CustomButton from "@components/ui/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirebaseRecaptchaVerifierModal } from "@components/firebase-recaptcha/modal";
import { auth, firebaseConfig } from "@src/firebase.config";
import { useStore } from "@zustand/store";
import { PhoneAuthProvider } from "firebase/auth";

const SignIn = () => {
  const recaptchaVerifier = useRef(null);

  const { control, handleSubmit } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: ValidationSchemaType) => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      await phoneProvider
        .verifyPhoneNumber(
          `+962${data.phoneNumber}`,
          recaptchaVerifier.current!
        )
        .then((verificationId) => {
          useStore.setState({
            snackbarText: "لقد تم إرسال رسالة تحقق إلى هاتفك",
          });
          router.push(
            // @ts-ignore
            `/verification?verificationId=${verificationId}&phone=+962${data.phoneNumber}`
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
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل الدخول</ReText>
          </Box>
          <Box height={vs(24)} />
          <ReText variant="LabelLarge" textAlign="left">
            رقم الهاتف
          </ReText>
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
            contentStyle={{
              height: vs(42),
            }}
            style={{
              height: vs(46),
              backgroundColor: Colors.lightBackground,
            }}
            right={
              <TextInput.Affix
                text="+962"
                textStyle={{
                  color: Colors.primary,
                }}
              />
            }
          />
          <CustomButton
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            title="تسجيل الدخول"
          />
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <ReText
              marginTop="hm"
              marginHorizontal="hs"
              textAlign="left"
              variant="BodySmall"
            >
              ليس لديك حساب؟ سجل الآن
            </ReText>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
