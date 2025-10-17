// Security.tsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import InfoCard from '@/components/custom/InfoCard';
import type { Staff } from '@/components/custom/InfoCard';
import { getAllSecurityGuards, updateSecurityGuard } from '@/api/apiService';
import { useToast } from '@/components/ui/Toast';
import { DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';

const Security: React.FC = () => {
  const [guards, setGuards] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [selected, setSelected] = useState<Staff | null>(null);
  const [saving, setSaving] = useState(false);

  // Load guards
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAllSecurityGuards();
        const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
        if (mounted) {
          // Map API fields to simplified Staff
          const mapped: Staff[] = list.map((g) => ({
            id: g.security_guard_id || g.emp_id,
            empId: g.emp_id,          // For badge
            name: g.name,
            email: g.email,
            phone: g.phone_no ?? g.phone,
            active: g.active !== false, // Default to true
          }));
          setGuards(mapped);
        }
      } catch (err: any) {
        console.error(err);
        addToast({ title: 'Error', description: err?.message ?? 'Failed to load guards', type: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [addToast]);

  // Edit button
  const handleEdit = (id: string) => {
    const g = guards.find((x) => x.id === id) ?? null;
    setSelected(g);
  };

  // Remove button
  const handleRemove = async (emp_id: string) => {
    if (!window.confirm('Are you sure you want to remove this guard?')) return;
    setSaving(true);
    try {
      await updateSecurityGuard(emp_id, { active: false });
      addToast({ title: 'Removed', description: 'Guard disabled', type: 'success' });
      // Refresh
      const data = await getAllSecurityGuards();
      const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
      const mapped: Staff[] = list.map((g) => ({
        id: g.security_guard_id || g.emp_id,
        empId: g.emp_id,
        name: g.name,
        email: g.email,
        phone: g.phone_no ?? g.phone,
        active: g.active !== false, // Default to true
      }));
      setGuards(mapped);
    } catch (err: any) {
      console.error(err);
      addToast({ title: 'Error', description: err?.message ?? 'Failed to remove guard', type: 'error' });
    } finally { setSaving(false); }
  };

  // Save edits
  const handleSave = async (payload: Partial<Staff>) => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateSecurityGuard(selected.id, {
        name: payload.name,
        email: payload.email,
        phone_no: payload.phone,
      });
      addToast({ title: 'Saved', description: 'Guard updated', type: 'success' });
      // Refresh
      const data = await getAllSecurityGuards();
      const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
      const mapped: Staff[] = list.map((g) => ({
        id: g.security_guard_id || g.emp_id,
        empId: g.emp_id,
        name: g.name,
        email: g.email,
        phone: g.phone_no ?? g.phone,
        active: g.active !== false, // Default to true
      }));
      setGuards(mapped);
      setSelected(null);
    } catch (err: any) {
      console.error(err);
      addToast({ title: 'Error', description: err?.message ?? 'Failed to save guard', type: 'error' });
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Security Personnel</h1>
          <p className="text-muted-foreground">Manage security staff across all hostels</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Security
        </Button>
      </div>

      {/* Guards Grid */}
      {loading ? (
        <div className="text-muted-foreground">Loading security guards...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guards.map((s) => (
            <InfoCard
              key={s.id}
              staff={s}
              onEdit={handleEdit}      // Security-specific Edit
              onRemove={handleRemove}  // Security-specific Remove
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      {selected && (
        <DialogContent
          isOpen={true}
          onClose={() => setSelected(null)}
          size="md"
          className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl transition-all duration-300 ease-out"
        >
          <DialogHeader className="pb-2 border-b border-gray-100">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Edit Security Guard
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 px-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <Input
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <Input
                type="email"
                value={selected.email ?? ''}
                onChange={(e) => setSelected({ ...selected, email: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <Input
                value={selected.phone ?? ''}
                onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600">Employee ID</label>
              <Input
                value={selected.empId}
                readOnly
                className="bg-gray-50 cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={() => setSelected(null)}
              className="rounded-lg border-gray-300 hover:bg-gray-100 transition-all px-4 py-1.5 text-sm font-medium"
            >
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
              disabled={saving}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-4 py-1.5 text-sm font-semibold"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

    </div>
  );
};

export default Security;
