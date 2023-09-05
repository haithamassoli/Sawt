import Header from "@components/header";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        animation: "slide_from_left",
        autoHideHomeIndicator: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="complaints"
        options={{
          header: (props) => (
            <Header
              title="الشكاوى والإقتراحات"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="polls"
        options={{
          header: (props) => (
            <Header
              title="استفتاءات"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(elections)/validation"
        options={{
          header: (props) => (
            <Header
              title="التحقق من الرقم الانتخابي"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(elections)/user-info"
        options={{
          header: (props) => (
            <Header
              title="البيانات الشخصية"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(elections)/candidates"
        options={{
          header: (props) => (
            <Header
              title="المرشحين في الدائرة الأولى"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(elections)/results"
        options={{
          header: (props) => (
            <Header
              title="نتائج انتخابات الدائرة الأولى"
              onPress={() => props.navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen name="(elections)/vice-info" />
    </Stack>
  );
};

export default HomeStack;
