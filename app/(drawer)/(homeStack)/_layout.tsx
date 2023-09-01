import { ms } from "@utils/platform";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitle: "رجوع",
        headerBackTitleStyle: {
          fontFamily: "CairoBold",
          fontSize: ms(16),
        },
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
          title: "الرقم الانتخابي",
        }}
      />
      <Stack.Screen
        name="(elections)/user-info"
        options={{
          title: "البيانات الشخصية",
        }}
      />
      <Stack.Screen
        name="(elections)/candidates"
        options={{
          title: "المرشحين",
        }}
      />
      <Stack.Screen
        name="(elections)/results"
        options={{
          title: "نتائج الانتخابات",
        }}
      />
      <Stack.Screen
        name="(elections)/vice-info"
        options={{
          title: "السيرة الذاتية",
        }}
      />
    </Stack>
  );
};

export default HomeStack;
