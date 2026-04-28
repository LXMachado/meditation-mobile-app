import { z } from 'zod';

const emailSchema = z
  .string()
  .min(1, 'Email is required.')
  .email('Enter a valid email address.');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .regex(/[A-Za-z]/, 'Password must include at least one letter.')
  .regex(/\d/, 'Password must include at least one number.');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name.'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm your password.'),
<<<<<<< HEAD
    acceptTerms: z
      .boolean()
      .refine((value) => value, 'Please accept the terms to continue.'),
>>>>>>> a23bb03 (chore(deps): update expo and react native dependencies)
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
