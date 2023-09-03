import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { getDataFromStorage, storeDataToStorage } from "@utils/helper";
import { useEffect, useState } from "react";
import { RadioButton, ProgressBar } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";

const Polls = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const onValueChange = async (value: string) => {
    setValue(value);
    await storeDataToStorage("poll1", value);
    console.log(value);
  };

  const onValueChange2 = async (value: string) => {
    setValue2(value);
    await storeDataToStorage("poll2", value);
  };

  const getPolls = async () => {
    const poll1 = await getDataFromStorage("poll1");
    const poll2 = await getDataFromStorage("poll2");
    setValue(poll1);
    setValue2(poll2);
  };

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <Box flex={1} paddingHorizontal="hm" paddingBottom="vm">
      <Animated.View entering={FadeInUp.duration(600)}>
        <ReText variant="BodyLarge" textAlign="left">
          هل تستفيد بشكل مباشر من انشاء خطوط للباص السريع في جنوب عمان؟
        </ReText>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(200)}>
        {!value ? (
          <RadioButton.Group onValueChange={onValueChange} value={value}>
            <RadioButton.Item label="نعم" value="first" />
            <RadioButton.Item label="لا" value="second" />
          </RadioButton.Group>
        ) : (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="hm"
            marginTop="vxs"
            marginBottom="vm"
          >
            <Box width={"86%"}>
              <ProgressBar
                progress={0.84}
                color={Colors.primary}
                style={{
                  height: 6,
                  borderRadius: 12,
                }}
              />
            </Box>
            <ReText variant="BodyLarge" textAlign="left">
              84%
            </ReText>
          </Box>
        )}
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(400)}>
        <ReText variant="BodyLarge" textAlign="left">
          هل تستخدم باص عمان في حياتك اليومية؟
        </ReText>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(600)}>
        {!value2 ? (
          <RadioButton.Group onValueChange={onValueChange2} value={value2}>
            <RadioButton.Item label="نعم" value="first" />
            <RadioButton.Item label="لا" value="second" />
          </RadioButton.Group>
        ) : (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="hm"
            marginTop="vxs"
            marginBottom="vm"
          >
            <Box width={"86%"}>
              <ProgressBar
                progress={0.72}
                color={Colors.primary}
                style={{
                  height: 6,
                  borderRadius: 12,
                }}
              />
            </Box>
            <ReText variant="BodyLarge" textAlign="left">
              72%
            </ReText>
          </Box>
        )}
      </Animated.View>
    </Box>
  );
};

export default Polls;
