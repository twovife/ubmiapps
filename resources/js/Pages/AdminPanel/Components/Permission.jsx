import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';
import { useForm } from '@inertiajs/react';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';

const Permission = () => {
  const { data, setData, post, reset, processing, errors } = useForm({
    name: '',
    type: 'permission',
  });

  const onChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('adminpanel.post_permission'), {
      onSuccess: () => {
        reset('name');
      },
    });
  };

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Generate Permission</CardTitle>
        <CardDescription>Permission</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Pemission Name</Label>
            <Input
              required
              name="name"
              onChange={onChange}
              id="name"
              value={data.name}
            />
          </div>
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Permission;
