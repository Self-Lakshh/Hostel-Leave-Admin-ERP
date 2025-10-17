import { Plus, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import GlassCard from '@/components/ui/GlassCard';

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Super Admin" | "Admin";
}

const mockAdmins: Admin[] = [
  { id: "1", name: "Dr. Prakash Desai", email: "prakash.desai@spsu.edu", phone: "+91 98765 90001", role: "Super Admin" },
  { id: "2", name: "Neha Kapoor", email: "neha.kapoor@spsu.edu", phone: "+91 98765 90002", role: "Admin" },
  { id: "3", name: "Vikram Reddy", email: "vikram.reddy@spsu.edu", phone: "+91 98765 90003", role: "Admin" },
];

const Admins = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Admins</h1>
          <p className="text-muted-foreground">Control administrator access and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAdmins.map((admin) => (
          <GlassCard key={admin.id} className="flex flex-col items-center text-center">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-semibold">
                  {admin.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{admin.name}</h3>
              <Badge variant={admin.role === "Super Admin" ? "default" : "secondary"}>
                <Shield className="w-3 h-3 mr-1" />
                {admin.role}
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{admin.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{admin.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Admins;
