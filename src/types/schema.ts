import { z } from "zod";

export const validationSchema = z.object({
  phoneNumber: z
    .string({
      required_error: "رقم الهاتف يجب أن لا يكون فارغًا",
    })
    .min(9, "رقم الهاتف يجب أن يكتب مثل 771234567")
    .max(9, "رقم الهاتف يجب أن يكتب مثل 771234567"),
});

export type ValidationSchemaType = z.infer<typeof validationSchema>;

export const signUpSchema = z.object({
  name: z
    .string({
      required_error: "الاسم يجب أن لا يكون فارغًا",
    })
    .min(2, "الاسم يجب أن يتكون من حرفان على الأقل"),
  phoneNumber: z
    .string({
      required_error: "رقم الهاتف يجب أن لا يكون فارغًا",
    })
    .min(9, "رقم الهاتف يجب أن يكتب مثل 771234567")
    .max(9, "رقم الهاتف يجب أن يكتب مثل 771234567"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const verificationCodeSchema = z.object({
  verificationCode: z
    .string({
      required_error: "رمز التحقق يجب أن لا يكون فارغًا",
    })
    .min(6, "رمز التحقق يجب أن يكون 6 أرقام")
    .max(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});

export type VerificationCodeSchemaType = z.infer<typeof verificationCodeSchema>;

export const validationElectoralSchema = z.object({
  electoral: z
    .string({
      required_error: "الرقم الانتخابي يجب أن لا يكون فارغ",
    })
    .min(10, "الرقم الانتخابي يجب أن يكون 10 أرقام")
    .max(10, "الرقم الانتخابي يجب أن يكون 10 أرقام"),
});

export type ValidationElectoralSchemaType = z.infer<
  typeof validationElectoralSchema
>;

export const validationComplaintsSchema = z.object({
  complaints: z
    .string({
      required_error: "حقل الشكوى أو الإقتراح يجب أن لا يكون فارغ",
    })
    .min(10, "حقل الشكوى أو الإقتراح يجب أن يكون على الأقل 10 أحرف"),
});

export type validationComplaintsSchemaType = z.infer<
  typeof validationComplaintsSchema
>;

export interface IUser {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: [
    {
      displayName?: string;
      email: string;
      phoneNumber?: string;
      photoURL?: string;
      providerId: string;
      uid: string;
    }
  ];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
  phoneNumber: string;
  idNumber: string;
  name: string;
  electoralNumber?: string;
}
