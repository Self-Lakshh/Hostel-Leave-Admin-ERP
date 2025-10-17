import { Users, UserX, Clock, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentRequests } from "@/components/dashboard/RecentRequests";

const Overview = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to SPSU University Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,234"
          icon={Users}
          trend={{ value: "12% from last month", positive: true }}
        />
        <StatCard
          title="Students Out"
          value="87"
          icon={UserX}
          trend={{ value: "5% from last week", positive: false }}
        />
        <StatCard
          title="Pending Requests"
          value="23"
          icon={Clock}
          className="border-warning/30"
        />
        <StatCard
          title="Active Requests"
          value="45"
          icon={CheckCircle}
          className="border-success/30"
        />
      </div>

      {/* Recent Requests */}
      <RecentRequests />
    </div>
  );
};

export default Overview;
