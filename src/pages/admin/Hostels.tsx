import { Plus, Users, Bed, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import GlassCard from '@/components/ui/GlassCard';

interface Hostel {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  warden: string;
  assistantWarden: string;
}

const mockHostels: Hostel[] = [
  { id: "1", name: "Block A", capacity: 200, occupied: 187, warden: "Dr. Amit Shah", assistantWarden: "Rahul Mehta" },
  { id: "2", name: "Block B", capacity: 180, occupied: 165, warden: "Prof. Meera Joshi", assistantWarden: "Kavita Patel" },
  { id: "3", name: "Block C", capacity: 220, occupied: 198, warden: "Dr. Ramesh Gupta", assistantWarden: "Suresh Kumar" },
];

const Hostels = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Hostels</h1>
          <p className="text-muted-foreground">Overview of all hostel blocks and assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Hostel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHostels.map((hostel) => (
          <GlassCard key={hostel.id} className="flex flex-col">
            <h3 className="text-2xl font-bold mb-6">{hostel.name}</h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bed className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-semibold">{hostel.capacity} beds</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupied</p>
                    <p className="font-semibold">{hostel.occupied} students</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round((hostel.occupied / hostel.capacity) * 100)}%
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4 text-sm">
              <div className="flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Warden</p>
                  <p className="font-medium">{hostel.warden}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Assistant Warden</p>
                  <p className="font-medium">{hostel.assistantWarden}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Hostels;
