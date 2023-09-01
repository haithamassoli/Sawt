import { Box, ReText } from "@styles/theme";

type InfoTableProps = {
  name: string;
  id: string;
  phone: string;
  electoralNumber: string;
  electoralDistrict: string;
};

const InfoTable = ({
  name,
  electoralDistrict,
  electoralNumber,
  id,
  phone,
}: InfoTableProps) => {
  return (
    <Box borderRadius="l">
      <Box backgroundColor="primary" paddingVertical="vs">
        <ReText
          variant="TitleMedium"
          fontFamily="CairoBold"
          textAlign="center"
          color="lightText"
        >
          البيانات الشخصية
        </ReText>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            الاسم
          </ReText>
        </Box>
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            {name}
          </ReText>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            الدائرة الانتخابية
          </ReText>
        </Box>
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            {electoralDistrict}
          </ReText>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            رقم الدائرة الانتخابية
          </ReText>
        </Box>
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            {electoralNumber}
          </ReText>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            الرقم الوطني
          </ReText>
        </Box>
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            {id}
          </ReText>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            رقم الهاتف
          </ReText>
        </Box>
        <Box
          width={"50%"}
          borderWidth={1}
          borderColor="black6"
          paddingHorizontal="hxs"
          paddingVertical="vxs"
        >
          <ReText variant="BodyLarge" textAlign="center">
            {phone}
          </ReText>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoTable;
