import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card';
import React from 'react';
import Permission from './Components/Permission';
import Role from './Components/Role';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import SelectList from '@/Components/SelectList';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import AssignRoles from './Components/AssignRoles';
import { BarcodeIcon } from 'lucide-react';
import BadgeStatus from '@/Components/shadcn/BadgeStatus';
import MaintenerWorker from './Components/MaintenerWorker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table';

const Index = ({ role, permission, user, maintenen_workers, ...props }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    role: '',
    permission: [],
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const onCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll(
      '.checkbox-group input[type="checkbox"]'
    );
    const selectedPermissions = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.name);

    setData((prevState) => ({
      ...prevState,
      permission: selectedPermissions,
    }));
  };

  const roleOptions = role.map((role) => {
    return {
      display: role.name,
      value: role.id,
      id: role.id,
    };
  });

  const userOptions = user.map((emp) => {
    return {
      display: emp.username,
      value: emp.id,
      id: emp.id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('adminpanel.role_assign'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Authenticated>
      <div className="flex w-full gap-3 mb-3">
        <Permission />
        <Role />
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Generate Permission</CardTitle>
            <CardDescription>Permission</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="role">Role Name</Label>
                <SelectList
                  options={roleOptions}
                  label="Role"
                  placeholder="Select Role"
                  required
                  name="role"
                  onChange={handleChange}
                  value={data.role}
                  id="role"
                  nullvalue={true}
                />
              </div>
              <div className="flex flex-wrap gap-3 checkbox-group">
                {data.role &&
                  permission.map((pemit, key) => (
                    <div
                      key={key}
                      className="flex items-center flex-1 gap-3 whitespace-nowrap"
                    >
                      <Checkbox
                        name={pemit.name}
                        onChange={onCheckboxChange}
                        placeholder="Select Permission"
                        id={pemit.name}
                      />
                      <InputLabel htmlFor={pemit.name}>{pemit.name}</InputLabel>
                    </div>
                  ))}
              </div>

              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full gap-3">
        <AssignRoles userOptions={userOptions} roleOptions={roleOptions} />
        <Card>
          <CardHeader>
            <CardTitle>User Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {permission &&
                permission.map((pemit, key) => (
                  <BadgeStatus value={pemit.name} key={key} />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-3">
        <Card>
          <CardHeader>
            <CardTitle>User Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[50vh] overflow-auto space-y-3">
              {role &&
                role.map((roole) => {
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <BadgeStatus value={'normal'}>
                            {roole.name}
                          </BadgeStatus>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex gap-1">
                        {roole.permissions.map((permit) => {
                          return (
                            <BadgeStatus value={permit.name}>
                              {permit.name}
                            </BadgeStatus>
                          );
                        })}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full gap-3 mt-3">
        <div className="flex-1">
          <MaintenerWorker
            userOptions={userOptions}
            roleOptions={roleOptions}
          />
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>User Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenen_workers &&
                    maintenen_workers.map((worker, key) => (
                      <TableRow key={key}>
                        <TableCell>{key + 1}</TableCell>
                        <TableCell>{worker.username}</TableCell>
                        <TableCell>{worker.employee.nama_karyawan}</TableCell>
                        <TableCell>{worker.branch.unit}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
