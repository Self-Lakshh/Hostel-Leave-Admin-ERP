import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getStudentByEnrollment } from '@/api/apiService';
import GlassCard from '@/components/ui/GlassCard';

type StudentSimple = {
    name?: string;
    enrollment_no?: string;
    hostel?: string;
    room?: string;
    profile_pic?: string;
    course?: string;
    department?: string;
    phone?: string;
    phone_no?: string;
    email?: string;
    guardian_name?: string;
    branch?: string;
    parents?: Array<{ name?: string; relation?: string; phone?: string; email?: string }>;
};

const StudentDetails: React.FC = () => {
    const { enroll } = useParams<{ enroll: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState<StudentSimple | null>(null);

    useEffect(() => {
        if (!enroll) return;
        const load = async () => {
            setLoading(true);
            try {
                const resp = await getStudentByEnrollment(enroll);
                // API may return { data: { student: {...} } } or similar
                const s = (resp?.data ?? resp?.student ?? resp) as StudentSimple;
                setStudent(s);
            } catch (err) {
                console.error('Failed to load student', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [enroll]);

    if (loading) return <div className="text-muted-foreground">Loading...</div>;
    if (!student) return <div className="text-muted-foreground">Student not found.</div>;

    const s = student;

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient mb-1">{s.name || 'Student'}</h1>
                    <div className="flex items-center gap-3">
                        <Badge variant="default">Enrollment: {s.enrollment_no}</Badge>
                        <span className="text-sm text-muted-foreground">Hostel: {s.hostel ?? '—'}</span>
                        <span className="text-sm text-muted-foreground">Room: {s.room ?? '—'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                    <Button>Export</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: profile card */}
                <GlassCard className="flex flex-col items-center text-center">
                    {s.profile_pic ? (
                        <img src={s.profile_pic} alt={s.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                            <span className="text-primary font-semibold text-2xl">{(s.name || 'S').split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                    )}
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.course ?? s.department ?? '—'}</p>

                    <div className="mt-4 w-full space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Phone</span>
                            <span>{s.phone ?? s.phone_no ?? '—'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Email</span>
                            <span>{s.email ?? '—'}</span>
                        </div>
                    </div>
                </GlassCard>

                {/* Right: details and parents */}
                <div className="md:col-span-2 space-y-4">
                    <GlassCard>
                        <h4 className="font-semibold mb-3">Student Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-muted-foreground">Enrollment</div>
                                <div className="font-medium">{s.enrollment_no}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Guardian</div>
                                <div className="font-medium">{s.guardian_name ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Course</div>
                                <div className="font-medium">{s.course ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Branch</div>
                                <div className="font-medium">{s.branch ?? '—'}</div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h4 className="font-semibold mb-3">Parents / Guardians</h4>
                        {Array.isArray(s.parents) && s.parents.length > 0 ? (
                            s.parents.map((p: any, idx: number) => (
                                <div key={idx} className="mb-3 border-b border-border pb-3 last:border-b-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-muted-foreground">{p.relation}</div>
                                            <div className="font-medium">{p.name}</div>
                                        </div>
                                        <div className="text-right text-sm">
                                            <div>{p.phone ?? '—'}</div>
                                            <div className="text-muted-foreground">{p.email ?? '—'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No parent data available.</p>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
