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

const MaintenerWorker = ({ userOptions, roleOptions }) => {
  const { data, setData, post, reset, processing, errors, transform } = useForm(
    {
      username: '',
      type: '',
    }
  );

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const submitForm = (e) => {
    transform((prevState) => ({
      ...prevState,
      type: 1, // Pastikan ini sesuai dengan logika yang ingin Anda capai
    }));
    post(route('adminpanel.giveMaintenerWorker'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  const removeForm = (e) => {
    transform((prevState) => ({
      ...prevState,
      type: 2, // Pastikan ini sesuai dengan logika yang ingin Anda capai
    }));
    post(route('adminpanel.giveMaintenerWorker'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
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
          <Button onClick={submitForm} type="submit" className="mt-3">
            Submit
          </Button>
          <Button onClick={removeForm} type="submit" className="mt-3">
            Remove
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenerWorker;
