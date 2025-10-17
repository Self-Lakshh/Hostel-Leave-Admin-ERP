import { useState } from "react";
import { Search, Download, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface LeaveRequest {
  id: string;
  studentName: string;
  enrollNumber: string;
  hostel: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedOn: string;
}

const mockLeaves: LeaveRequest[] = [
  { id: "1", studentName: "Raj Patel", enrollNumber: "CS21001", hostel: "Block A", leaveType: "Home Leave", fromDate: "2024-01-20", toDate: "2024-01-25", reason: "Family function", status: "pending", submittedOn: "2024-01-15" },
  { id: "2", studentName: "Priya Sharma", enrollNumber: "CS21045", hostel: "Block B", leaveType: "Medical Leave", fromDate: "2024-01-16", toDate: "2024-01-18", reason: "Medical checkup", status: "approved", submittedOn: "2024-01-14" },
  { id: "3", studentName: "Arjun Kumar", enrollNumber: "ME21023", hostel: "Block A", leaveType: "Home Leave", fromDate: "2024-01-22", toDate: "2024-01-28", reason: "Personal work", status: "pending", submittedOn: "2024-01-14" },
  { id: "4", studentName: "Sneha Desai", enrollNumber: "EC21067", hostel: "Block C", leaveType: "Emergency Leave", fromDate: "2024-01-15", toDate: "2024-01-17", reason: "Family emergency", status: "approved", submittedOn: "2024-01-13" },
  { id: "5", studentName: "Vikram Singh", enrollNumber: "CS21089", hostel: "Block A", leaveType: "Home Leave", fromDate: "2024-01-18", toDate: "2024-01-21", reason: "Personal", status: "rejected", submittedOn: "2024-01-13" },
];

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeaves = mockLeaves.filter((leave) => {
    const matchesSearch =
      leave.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.enrollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || leave.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "destructive";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Leave Management</h1>
          <p className="text-muted-foreground">Review and manage student leave requests</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or enrollment number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Student</th>
                <th className="text-left p-4 font-semibold">Leave Type</th>
                <th className="text-left p-4 font-semibold">Duration</th>
                <th className="text-left p-4 font-semibold">Reason</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{leave.studentName}</p>
                      <p className="text-sm text-muted-foreground">{leave.enrollNumber} • {leave.hostel}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{leave.leaveType}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p>{leave.fromDate}</p>
                      <p className="text-muted-foreground">to {leave.toDate}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{leave.reason}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant={getStatusVariant(leave.status)} className="capitalize">
                      {leave.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {leave.status === "pending" && (
                        <>
                          <button className="p-2 hover:bg-success/20 text-success rounded transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-destructive/20 text-destructive rounded transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
