import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { TouchableOpacity } from "react-native";

const ElectionsButton = ({
  onPress,
  title,
  subTitle,
  style,
}: {
  onPress: () => void;
  title: string;
  subTitle: string;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        backgroundColor: Colors.primary,
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: vs(10),
        borderRadius: ms(18),
      }}
    >
      <Box flexDirection="row">
        <Feather
          name="chevron-left"
          size={ms(44)}
          color={Colors.lightText}
          style={{
            transform: [{ rotateY: "180deg" }],
          }}
        />
        <Feather
          name="chevron-left"
          size={ms(44)}
          color={Colors.lightText}
          style={{
            marginLeft: hs(-28),
            transform: [{ rotateY: "180deg" }],
          }}
        />
      </Box>
      <Box width={"84%"}>
        <ReText
          variant="TitleMedium"
          fontFamily="CairoBold"
          textAlign="left"
          color="lightText"
        >
          {title}
        </ReText>
        <ReText variant="BodySmall" textAlign="left" color="lightText">
          {subTitle}
        </ReText>
      </Box>
    </TouchableOpacity>
  );
};

export default ElectionsButton;
