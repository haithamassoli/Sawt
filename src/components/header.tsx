import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { ms, vs } from "@utils/platform";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="hm"
      paddingVertical="vm"
      style={{
        marginTop: useSafeAreaInsets().top,
        zIndex: 100,
      }}
    >
      <ReText
        variant="TitleLarge"
        textAlign="left"
        fontFamily="CairoBold"
        color="primary"
      >
        {title}
      </ReText>
      <TouchableOpacity onPress={onPress}>
        <Feather name="arrow-left" size={ms(28)} color={Colors.primary} />
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
