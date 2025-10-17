import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import StudentCard from "@/components/custom/StudentCard";
import Searchbar from "@/components/custom/Searchbar";
import { getAllStudents } from "@/api/apiService";
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  enrollNumber: string;
  image?: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const resp = await getAllStudents(); // resp = { message, data: [...] }

        // Check if resp.data exists
        if (resp && Array.isArray(resp.data)) {
          const formatted: Student[] = resp.data.map((item: any) => ({
            id: item.student?._id || item.student?.id,
            name: item.student?.name,
            enrollNumber: item.student?.enrollment_no,
            image: item.student?.profile_pic,
          }));
          setStudents(formatted);
          setFilteredStudents(formatted);
        } else {
          console.warn("Unexpected response format:", resp);
          setStudents([]);
          setFilteredStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    setFilteredStudents(
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.enrollNumber.toLowerCase().includes(lowerQuery)
      )
    );
  }, [searchQuery, students]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Students</h1>
          <p className="text-muted-foreground">View and manage all student and parent records</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Searchbar
          placeholder="Search by enrollment number..."
          value={searchQuery}
          onChange={(val: string) => setSearchQuery(val)}
        />
      </div>

      {/* Students Grid */}
      {loading ? (
        <p className="text-muted-foreground text-center mt-10">Loading students...</p>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              enrollNumber={student.enrollNumber}
              image={student.image}
              onClick={() => navigate(`/admin/students/${encodeURIComponent(student.enrollNumber)}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center mt-10">No students found.</p>
      )}
    </div>
  );
};

export default Students;
