import { z } from "zod";

export const validationSchema = z.object({
  phoneNumber: z
    .string({
      required_error: "رقم الهاتف يجب أن لا يكون فارغًا",
    })
    .min(9, "رقم الهاتف يجب أن يكتب مثل 770000000")
    .max(9, "رقم الهاتف يجب أن يكتب مثل 770000000"),
  verificationCode: z.optional(
    z
      .string({
        required_error: "رمز التحقق يجب أن لا يكون فارغًا",
      })
      .min(6, "رمز التحقق يجب أن يكون 6 أرقام")
      .max(6, "رمز التحقق يجب أن يكون 6 أرقام")
  ),
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
    .min(9, "رقم الهاتف يجب أن يكتب مثل 770000000")
    .max(9, "رقم الهاتف يجب أن يكتب مثل 770000000"),
  verificationCode: z.optional(
    z
      .string({
        required_error: "رمز التحقق يجب أن لا يكون فارغًا",
      })
      .min(6, "رمز التحقق يجب أن يكون 6 أرقام")
      .max(6, "رمز التحقق يجب أن يكون 6 أرقام")
  ),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const validationIdCodeSchema = z.object({
  idCode: z
    .string({
      required_error: "رقم الهوية يجب أن لا يكون فارغًا",
    })
    .min(10, "رقم الهوية يجب أن يكون 10 أرقام")
    .max(10, "رقم الهوية يجب أن يكون 10 أرقام"),
  phoneNumber: z
    .string({
      required_error: "رقم الهاتف يجب أن لا يكون فارغًا",
    })
    .min(9, "رقم الهاتف يجب أن يكتب مثل +962770000000")
    .max(9, "رقم الهاتف يجب أن يكتب مثل +962770000000"),
  verificationCode: z.optional(
    z.string({
      required_error: "رمز التحقق يجب أن لا يكون فارغًا",
    })
  ),
});

export type ValidationIdCodeSchemaType = z.infer<typeof validationIdCodeSchema>;

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
}
