import ControlledInput from "@components/controlledInput";
import * as ImagePicker from "expo-image-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, ReText } from "@styles/theme";
import {
  validationComplaintsSchema,
  validationComplaintsSchemaType,
} from "@src/types/schema";
import { ms, vs } from "@utils/platform";
import { useForm } from "react-hook-form";
import Animated, { FadeInUp } from "react-native-reanimated";
import CustomButton from "@components/ui/customButton";
import { useStore } from "@zustand/store";
import { useImagePicker } from "@src/hooks/useImagePicker";
import Loading from "@components/loading";
import { Image } from "expo-image";
import { blurhash } from "@utils/helper";
import Snackbar from "@components/snackbar";
import { ScrollView } from "react-native";
import { addComplaintMutation } from "@apis/complaints";
import { router } from "expo-router";
import Colors from "@styles/colors";

const ComplaintsScreen = () => {
  const [imageList, pickImage, isLoadingImage] = useImagePicker();
  const { isDark } = useStore();
  const { control, handleSubmit, reset } =
    useForm<validationComplaintsSchemaType>({
      resolver: zodResolver(validationComplaintsSchema),
    });

  const { mutate, isLoading } = addComplaintMutation();

  const onSubmit = (data: validationComplaintsSchemaType) => {
    const dataWithUser = {
      ...data,
      images: imageList,
      createdAt: new Date(),
    };
    mutate(dataWithUser, {
      onSuccess: () => {
        useStore.setState({
          snackbarText: "تم إرسال الشكوى بنجاح",
        });
        reset();
        router.push("/");
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Snackbar />
      <Box
        flex={1}
        paddingVertical="vxl"
        paddingHorizontal="hm"
        justifyContent="space-between"
      >
        <Box>
          <Animated.View entering={FadeInUp.duration(600)}>
            <ReText variant="BodyMedium" textAlign="left" marginBottom="vs">
              يمكنك تقديم شكوى أو اقتراح للهيئة المستقلة للانتخاب
            </ReText>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(600).delay(200)}
            style={{ width: "100%", alignItems: "center" }}
          >
            <ControlledInput
              control={control}
              mode="outlined"
              name="complaints"
              multiline
              label={"الشكوى أو الإقتراح"}
              placeholder={"أدخل الشكوى أو الإقتراح"}
              inputMode="text"
              textAlignVertical="top"
              outlineStyle={{
                borderRadius: ms(18),
                backgroundColor: isDark
                  ? Colors.darkBackground
                  : Colors.lightBackground,
              }}
              style={{
                width: "100%",
              }}
              contentStyle={{
                marginTop: vs(16),
                height: vs(156),
                fontSize: ms(16),
                fontFamily: "CairoBold",
              }}
            />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <CustomButton
              mode="text"
              style={{
                width: "96%",
              }}
              onPress={async () => {
                const { status } =
                  await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                  useStore.setState({
                    snackbarText: "يجب السماح بالوصول للصور",
                  });
                }
                pickImage();
              }}
              title="اختر صورة أو عدة صور"
            />
          </Animated.View>
          {isLoadingImage && (
            <Box flex={1} marginVertical="vl">
              <Loading size="small" />
            </Box>
          )}
          {imageList.map((item: any, index: number) => (
            <Image
              key={index}
              source={item}
              contentFit="contain"
              placeholder={blurhash}
              placeholderContentFit="cover"
              transition={400}
              style={{
                width: "86%",
                alignSelf: "center",
                height: vs(240),
                marginVertical: vs(10),
              }}
            />
          ))}
        </Box>
        <CustomButton
          title="إرسال"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        />
      </Box>
    </ScrollView>
  );
};

export default ComplaintsScreen;
