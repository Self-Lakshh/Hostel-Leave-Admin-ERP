import React from 'react';
import { DashboardCard } from '../../components/DashboardCard';
import { User, ClipboardList, CheckCircle, XCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value={250}
          icon={User}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Active Leaves"
          value={15}
          icon={ClipboardList}
          trend={{ value: 2, isPositive: true }}
        />
        <DashboardCard
          title="Approved Today"
          value={8}
          icon={CheckCircle}
          className="bg-green-50"
        />
        <DashboardCard
          title="Pending Requests"
          value={3}
          icon={XCircle}
          className="bg-red-50"
        />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">Requested leave for tomorrow</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
