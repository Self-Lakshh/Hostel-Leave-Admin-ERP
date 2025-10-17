import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import InfoCard from "@/components/custom/InfoCard";
import type { Staff } from "@/components/custom/InfoCard";
import { getWardens } from "@/api/apiService";
import { useToast } from "@/components/ui/Toast";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

interface WardenApiResponse {
  _id: string;
  warden_id: string;
  emp_id: string;
  name: string;
  email: string;
  phone_no: string;
  hostel_id: string[];
  role: string;
  active: boolean;
}

const Wardens: React.FC = () => {
  const [wardens, setWardens] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [selected, setSelected] = useState<Staff | null>(null);
  // no local saving state required here yet

  useEffect(() => {
    let mounted = true;

    const loadWardens = async () => {
      setLoading(true);
      try {
        const data: { wardens: WardenApiResponse[] } = await getWardens();
        if (!mounted) return;

        const seniorWardens: Staff[] = data.wardens
          .filter((w) => w.role === "senior_warden")
          .map((w) => ({
            id: w._id,
            name: w.name,
            empId: w.emp_id,             // show emp_id as badge
            email: w.email,
            phone: w.phone_no,
            active: w.active ?? true,
            hostel: w.hostel_id?.[0],        // array of hostels
          }));

        setWardens(seniorWardens);
      } catch (err: unknown) {
        console.error(err);
        const message = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err);
        addToast({
          title: "Error",
          description: message ?? "Failed to load wardens",
          type: "error",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadWardens();
    return () => {
      mounted = false;
    };
  }, [addToast]);

  const handleEdit = (id: string) => {
    const w = wardens.find((x) => x.id === id) ?? null;
    setSelected(w);
  };

  const handleRemove = (id: string) => {
    if (!window.confirm("Are you sure you want to remove this warden?")) return;
    setWardens((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: false } : w))
    );
    addToast({ title: "Removed", description: "Warden disabled", type: "success" });
  };

  const handleActivate = (id: string) => {
    setWardens((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: true } : w))
    );
    addToast({ title: "Activated", description: "Warden enabled", type: "success" });
  };

  const handleSave = (payload: Partial<Staff>) => {
    if (!selected) return;
    setWardens((prev) =>
      prev.map((w) => (w.id === selected.id ? { ...w, ...payload } : w))
    );
    addToast({ title: "Saved", description: "Warden updated", type: "success" });
    setSelected(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Wardens</h1>
          <p className="text-muted-foreground">Oversee senior warden assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Warden
        </Button>
      </div>

      {/* Wardens Grid */}
      {loading ? (
        <p className="text-muted-foreground text-center mt-10">Loading wardens...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardens.map((w) => (
            <InfoCard
              key={w.id}
              staff={w}
              onEdit={handleEdit}
              onRemove={handleRemove}
              onActivate={handleActivate}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      {selected && (
        <DialogContent isOpen={true} onClose={() => setSelected(null)} size="md">
          <DialogHeader>
            <DialogTitle>Edit Warden</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={selected.email ?? ""}
                onChange={(e) => setSelected({ ...selected, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={selected.phone ?? ""}
                onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Hostels</label>
              <Input value={selected.hostel ?? ""} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Employee ID</label>
              <Input value={selected.empId} readOnly />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleSave({
                  name: selected.name,
                  email: selected.email,
                  phone: selected.phone,
                })
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </div>
  );
};

export default Wardens;
