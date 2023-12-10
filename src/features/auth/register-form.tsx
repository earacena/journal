import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const zRegisterFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Must be valid email' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export function RegisterForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof zRegisterFormSchema>>({
    resolver: zodResolver(zRegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof zRegisterFormSchema>): void {
    setLoading(true);

    // TODO: Process credentials using firebase, and log users in, redirect to main page
    logger.log(JSON.stringify(values));

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
                <FormDescription>The password for the account.</FormDescription>
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
