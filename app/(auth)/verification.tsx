import { loginMutation, verifyCodeMutation } from "@apis/auth";
import Loading from "@components/loading";
import Snackbar from "@components/snackbar";
import CustomButton from "@components/ui/customButton";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import {
  VerificationCodeSchemaType,
  verificationCodeSchema,
} from "@src/types/schema";
import { Box, ReText, Theme } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { HelperText } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const VerificationCodeScreen = () => {
  const { colors } = useTheme<Theme>();
  const { mutate, isLoading } = loginMutation();
  const { mutate: verifyCode, isLoading: isLoadingVerifyCode } =
    verifyCodeMutation();

  const {
    verificationId,
    phone,
    name,
    nationalId,
  }: {
    verificationId: string;
    phone: string;
    name?: string;
    nationalId: string;
  } = useLocalSearchParams();

  console.log(verificationId, phone, name);

  const { control, handleSubmit } = useForm<VerificationCodeSchemaType>({
    resolver: zodResolver(verificationCodeSchema),
  });

  const onSubmit = (data: VerificationCodeSchemaType) => {
    if (!name) {
      mutate(
        { verificationId, code: data.verificationCode! },
        {
          onSuccess: () => {
            useStore.setState({
              snackbarText: "تم تسجيل الدخول بنجاح",
            });
            router.replace("/(drawer)/(homeStack)/");
          },
        }
      );
    } else {
      verifyCode(
        {
          verificationId,
          code: data.verificationCode!,
          name: name!,
          nationalId: nationalId!,
        },
        {
          onSuccess: (data) => {
            useStore.setState({
              snackbarText: "تم تسجيل الدخول بنجاح",
              // @ts-ignore
              user: data,
            });
            router.replace("/(drawer)/(homeStack)/");
          },
        }
      );
    }
  };

  if (isLoading || isLoadingVerifyCode) return <Loading />;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Snackbar />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            right: hs(32),
            top: vs(16),
            zIndex: 3,
          }}
        >
          <Animated.View
            entering={FadeInUp.duration(600)}
            style={{ flexDirection: "row" }}
          >
            <Feather name="chevron-left" size={ms(24)} color={colors.primary} />
            <Feather
              name="chevron-left"
              size={ms(24)}
              color={colors.primary}
              style={{
                marginLeft: hs(-12),
              }}
            />
          </Animated.View>
        </TouchableOpacity>
        <Box height={vs(100)} />
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <ReText
            variant="TitleLarge"
            textAlign="center"
            color="primary"
            marginVertical="vl"
          >
            أدخل رمز التحقق
          </ReText>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(600).delay(400)}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Controller
            control={control}
            name="verificationCode"
            rules={{
              required: true,
            }}
            render={({
              field: { onChange },
              fieldState: { error, invalid },
            }) => (
              <>
                <OTPTextView
                  handleTextChange={onChange}
                  keyboardType="numeric"
                  containerStyle={styles.textInputContainer}
                  // @ts-ignore
                  textInputStyle={[
                    styles.roundedTextInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  inputCount={6}
                  inputCellLength={1}
                />
                <HelperText
                  type="error"
                  visible={invalid}
                  style={{
                    fontFamily: "CairoReg",
                    textAlign: "left",
                    width: "86%",
                  }}
                >
                  {error?.message}
                </HelperText>
              </>
            )}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(600).delay(600)}
          style={{
            width: "86%",
          }}
        >
          <CustomButton
            mode="contained"
            title="تسجيل الدخول"
            onPress={handleSubmit(onSubmit)}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: hs(8),
    paddingVertical: vs(20),
  },
  textInputContainer: {
    direction: "rtl",
    transform: [{ rotateY: "180deg" }],
  },
  roundedTextInput: {
    transform: [{ rotateY: "180deg" }],
    direction: "rtl",
    borderRadius: ms(10),
    borderWidth: ms(4),
  },
});
