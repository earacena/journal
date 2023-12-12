import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { logger } from '@/utils/logger';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UserCredentialContext } from './user-credential-provider';

const zEmailSignUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Must be valid email' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(4, { message: 'Password must have 4 or more characters' })
      .max(20, { message: 'Password must be less than 20 characters' })
      .regex(new RegExp(/\d/), 'Password must contain 1 digit')
      .regex(
        new RegExp(/[!@#$%^&*-+=]/),
        'Password must contain one of the following: !@#$%^&*-+=',
      ),
    confirmPassword: z.string().min(1, { message: 'Must confirm password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function EmailSignUpForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(UserCredentialContext);
  const auth = getAuth();

  const form = useForm<z.infer<typeof zEmailSignUpFormSchema>>({
    resolver: zodResolver(zEmailSignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof zEmailSignUpFormSchema>,
  ): Promise<void> {
    setLoading(true);

    const { email, password } = values;
    try {
      const userCredentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      user?.setUserCredential(userCredentail);
    } catch (err: unknown) {
      logger.logError(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-3xl">Create a new account</h2>
      <Form {...form}>
        <form
          className="flex flex-col mt-16 w-80"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>The email for the account.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Passwords must:
                  <ul className="list-disc ml-6">
                    <li>be between 4 and 20 characters long</li>
                    <li>contain at least 1 number</li>
                    <li>contain at least 1 special symbol: !@#$%^&*-+=</li>
                  </ul>
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Re-type the desired password.</FormDescription>
              </FormItem>
            )}
          />

          <Button className="mt-4" disabled={loading} type="submit">
            {loading ? <Loader className="mr-2 animate-spin" /> : null}
            {loading ? '' : 'Sign In'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
