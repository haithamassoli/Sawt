import { Box, ReText } from "@styles/theme";

const ResultsScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ReText variant="DisplaySmall">لم تصدر النتائج بعد</ReText>
      <ReText variant="BodySmall">صوت</ReText>
    </Box>
  );
};

export default ResultsScreen;
