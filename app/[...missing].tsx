import { Box, ReText } from "@styles/theme";

export default function NotFoundScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ReText variant="DisplayMedium">This screen doesn't exist.</ReText>
    </Box>
  );
}
