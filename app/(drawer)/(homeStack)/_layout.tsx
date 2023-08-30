import { ms } from "@utils/platform";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitle: "رجوع",
        headerTitleStyle: {
          fontFamily: "CairoBold",
          fontSize: ms(16),
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="complaints"
        options={{ title: "الشكاوى والإقتراحات" }}
      />
      <Stack.Screen name="polls" options={{ title: "استفتاءات" }} />
      <Stack.Screen
        name="(elections)/validation"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elections)/info"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elections)/candidates"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elections)/results"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elections)/vice-info"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
};

export default HomeStack;
