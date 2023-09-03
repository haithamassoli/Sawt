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
import { SignUpSchemaType, signUpSchema } from "@src/types/schema";
import { useRef } from "react";
import CustomButton from "@components/ui/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@zustand/store";
import { PhoneAuthProvider } from "firebase/auth";
import { auth, firebaseConfig } from "@src/firebase.config";
import { FirebaseRecaptchaVerifierModal } from "@components/firebase-recaptcha/modal";

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
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل حساب جديد</ReText>
          </Box>
          <Box height={vs(24)} />
          <ReText variant="LabelLarge" textAlign="left">
            الاسم
          </ReText>
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
              backgroundColor: Colors.lightBackground,
            }}
          />
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
            style={{
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
            title="تسجيل"
          />
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
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;
