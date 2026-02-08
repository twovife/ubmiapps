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
import SelectList from '@/Components/SelectList';

const AssignRoles = ({ userOptions, roleOptions }) => {
  const { data, setData, post, reset, processing, errors } = useForm({
    username: '',
    role: '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    post(route('adminpanel.user_assign'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>User Role</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitForm}>
          <div className="flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="username">User Name</Label>
            <SelectList
              options={userOptions}
              required
              name="username"
              onChange={handleChange}
              value={data.username}
              id="username"
              nullvalue={true}
            />
          </div>
          <div className="flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="role">Role Name</Label>
            <SelectList
              options={roleOptions}
              required
              name="role"
              onChange={handleChange}
              value={data.role}
              id="role"
              nullvalue={true}
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

export default AssignRoles;
