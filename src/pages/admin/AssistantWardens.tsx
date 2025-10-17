import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import InfoCard from "@/components/custom/InfoCard";
import type { Staff } from "@/components/custom/InfoCard";
import { getWardens } from "@/api/apiService";
import { useToast } from "@/components/ui/Toast";

const AssistantWardens = () => {
  const [wardens, setWardens] = useState<Staff[]>([]);
  const [filteredWardens, setFilteredWardens] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Fetch assistant wardens on mount
  useEffect(() => {
    const fetchWardens = async () => {
      try {
        setLoading(true);
        const resp = await getWardens(); // API: { message, wardens: [...] }

        if (resp?.wardens && Array.isArray(resp.wardens)) {
          const assistants: Staff[] = resp.wardens
            .filter((w: any) => w.role === "warden") // role = assistant warden
            .map((w: any) => ({
              id: w.warden_id || w._id,
              name: w.name,
              empId: w.emp_id,             // badge
              email: w.email,
              phone: w.phone_no,
              hostel: w.hostel_id?.[0],
              active: w.active !== false,
            }));

          setWardens(assistants);
          setFilteredWardens(assistants);
        } else {
          setWardens([]);
          setFilteredWardens([]);
        }
      } catch (err: any) {
        console.error(err);
        addToast({ title: "Error", description: err?.message ?? "Failed to load assistant wardens", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchWardens();
  }, [addToast]);

  const handleEdit = (id: string) => console.log("Edit clicked for:", id);
  const handleRemove = (id: string) => console.log("Remove clicked for:", id);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Assistant Wardens</h1>
          <p className="text-muted-foreground">Manage assistant warden assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Assistant Warden
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-muted-foreground text-center mt-10">Loading assistant wardens...</p>
      ) : filteredWardens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWardens.map((warden) => (
            <InfoCard
              key={warden.id}
              staff={warden}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center mt-10">No assistant wardens found.</p>
      )}
    </div>
  );
};

export default AssistantWardens;
