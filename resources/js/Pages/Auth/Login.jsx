import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
import Loading from '@/Components/Loading';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      replace: true,
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      <Loading show={processing} />

      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {status
              ? status
              : 'Enter your username below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                type="text"
                placeholder="username"
                required
                autoComplete="username"
                isFocused={true}
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
              />
              <InputError message={errors.username} className="mt-2" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  );
}
