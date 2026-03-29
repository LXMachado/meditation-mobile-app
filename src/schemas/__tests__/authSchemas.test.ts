import { signInSchema, signUpSchema, forgotPasswordSchema } from '../authSchemas';

describe('signInSchema', () => {
  it('validates correct sign-in data', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: 'any-password',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty email', () => {
    const result = signInSchema.safeParse({
      email: '',
      password: 'password',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email is required.');
    }
  });

  it('rejects invalid email format', () => {
    const result = signInSchema.safeParse({
      email: 'not-an-email',
      password: 'password',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email address.');
    }
  });

  it('rejects empty password', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password is required.');
    }
  });

  it('rejects missing fields', () => {
    const result = signInSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('signUpSchema', () => {
  const validSignUp = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    password: 'Secure123',
    confirmPassword: 'Secure123',
    acceptTerms: true,
  };

  it('validates correct sign-up data', () => {
    const result = signUpSchema.safeParse(validSignUp);
    expect(result.success).toBe(true);
  });

  it('rejects short full name', () => {
    const result = signUpSchema.safeParse({ ...validSignUp, fullName: 'J' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter your full name.');
    }
  });

  it('rejects password without a letter', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: '12345678',
      confirmPassword: '12345678',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message.includes('letter'))).toBe(true);
    }
  });

  it('rejects password without a number', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: 'OnlyLetters',
      confirmPassword: 'OnlyLetters',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message.includes('number'))).toBe(true);
    }
  });

  it('rejects password shorter than 8 characters', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: 'Ab1',
      confirmPassword: 'Ab1',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 8 characters.');
    }
  });

  it('rejects mismatched passwords', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      confirmPassword: 'Different123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Passwords do not match.');
      expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    }
  });

  it('rejects when terms are not accepted', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please accept the terms to continue.');
    }
  });
});

describe('forgotPasswordSchema', () => {
  it('validates correct email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(true);
  });

  it('rejects empty email', () => {
    const result = forgotPasswordSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'bad' });
    expect(result.success).toBe(false);
  });
});
