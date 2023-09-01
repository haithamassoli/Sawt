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
import { useRef, useState } from "react";
import { verifyCodeMutation } from "@apis/auth";
import Loading from "@components/loading";
import CustomButton from "@components/ui/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@zustand/store";
import { PhoneAuthProvider } from "firebase/auth";
import { auth, firebaseConfig } from "@src/firebase.config";
import { FirebaseRecaptchaVerifierModal } from "@components/firebase-recaptcha/modal";

const SingUp = () => {
  const recaptchaVerifier = useRef(null);
  const [showValidation, setShowValidation] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const { mutate: verifyCode, isLoading: isLoadingVerifyCode } =
    verifyCodeMutation();

  const { control, handleSubmit, getValues } = useForm<SignUpSchemaType>({
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
          setVerificationId(verificationId);
          setShowValidation(true);
          useStore.setState({
            snackbarText:
              "تم الربط مع سند بنجاح يرجى، لقد تم إرسال رسالة تحقق إلى هاتفك",
          });
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const onSubmitCode = (data: SignUpSchemaType) => {
    verifyCode(
      { verificationId, code: data.verificationCode!, name: getValues("name") },
      {
        onSuccess: () => {
          useStore.setState({
            snackbarText: "تم تسجيل الدخول بنجاح",
          });
          router.push("/(drawer)/(homeStack)");
        },
      }
    );
  };

  if (isLoadingVerifyCode) return <Loading />;

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
          <Box height={vs(32)} />
          <ControlledInput
            control={control}
            name="name"
            label={"الاسم"}
            autoComplete="name"
            textContentType="name"
          />
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
          {showValidation && (
            <ControlledInput
              control={control}
              name="verificationCode"
              label={"رمز التحقق"}
              inputMode="numeric"
              keyboardType="numeric"
              contentStyle={{
                height: vs(52),
                textAlignVertical: "center",
              }}
              right={
                <TextInput.Icon
                  icon={"check"}
                  color={Colors.primary3}
                  onPress={handleSubmit(onSubmitCode)}
                />
              }
            />
          )}
          <Box height={vs(32)} />
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
