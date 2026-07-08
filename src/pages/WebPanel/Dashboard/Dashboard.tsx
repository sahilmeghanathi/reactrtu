import React from 'react';
import { Card } from '@/components/ui/card';
import { Container, DataTable, Pagination } from '@/components/common';
import { usePagination } from '@/hooks/useDebounce';
import { Users, TrendingUp, Activity, Award } from 'lucide-react';

const Dashboard = () => {
  const pagination = usePagination(10, 5);

  const metrics = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+8%',
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      title: 'Growth Rate',
      value: '23%',
      change: '+4%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Achievements',
      value: '42',
      change: '+2%',
      icon: Award,
      color: 'bg-amber-500',
    },
  ];

  const sampleUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      status: 'Inactive',
      joinDate: '2024-01-30',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Moderator',
      status: 'Active',
      joinDate: '2024-03-10',
    },
    {
      id: '5',
      name: 'Tom Brown',
      email: 'tom@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-03-25',
    },
  ];

  const displayUsers = sampleUsers.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  return (
    <Container size="xl" className="py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's your performance overview.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Users</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Latest registered users on your platform
              </p>
            </div>

            <DataTable
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                {
                  key: 'status',
                  header: 'Status',
                  render: (item, status) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {status}
                    </span>
                  ),
                },
                { key: 'joinDate', header: 'Join Date' },
              ]}
              data={displayUsers}
              emptyMessage="No users available"
            />

            <div className="flex justify-end">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goToPage}
              />
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
