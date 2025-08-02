import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Eye, FileText } from "lucide-react";

interface PatientRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientRecordsModal = ({ isOpen, onClose }: PatientRecordsModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock patient records
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Active",
      phone: "+1 234 567 8900"
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      lastVisit: "2024-01-10",
      condition: "Diabetes",
      status: "Active",
      phone: "+1 234 567 8901"
    },
    {
      id: 3,
      name: "Mike Wilson",
      age: 42,
      lastVisit: "2023-12-20",
      condition: "Asthma",
      status: "Follow-up",
      phone: "+1 234 567 8902"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      age: 31,
      lastVisit: "2024-01-08",
      condition: "Migraine",
      status: "Active",
      phone: "+1 234 567 8903"
    },
    {
      id: 5,
      name: "Tom Brown",
      age: 55,
      lastVisit: "2024-01-12",
      condition: "Heart Disease",
      status: "Active",
      phone: "+1 234 567 8904"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Follow-up": return "bg-warning text-warning-foreground";
      case "Inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Patient Records
          </DialogTitle>
          <DialogDescription>
            Manage and view all patient records
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Patient List */}
          <Card>
            <CardHeader>
              <CardTitle>All Patients ({filteredPatients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-card transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-healing p-2 rounded-lg">
                        <Users className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Age: {patient.age}</span>
                          <span>•</span>
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {patient.condition}
                          </Badge>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{patient.phone}</span>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Records
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No patients found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRecordsModal;