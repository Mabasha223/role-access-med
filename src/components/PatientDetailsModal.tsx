import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, FileText, Heart } from "lucide-react";
import PrescriptionModal from "./PrescriptionModal";

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: number;
    name: string;
    time: string;
    type: string;
    status: string;
  } | null;
}

const PatientDetailsModal = ({ isOpen, onClose, patient }: PatientDetailsModalProps) => {
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  if (!patient) return null;

  // Mock patient data
  const patientDetails = {
    id: patient.id,
    name: patient.name,
    age: 35,
    gender: "Male",
    phone: "+1 234 567 8900",
    email: "john.doe@email.com",
    address: "123 Main St, City, State 12345",
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    medicalHistory: [
      "Hypertension diagnosed in 2020",
      "Regular checkups every 6 months",
      "No known allergies"
    ],
    currentMedications: [
      "Lisinopril 10mg - Once daily",
      "Amlodipine 5mg - Once daily"
    ],
    vitals: {
      bloodPressure: "140/90 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "180 lbs"
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Details - {patient.name}
            </DialogTitle>
            <DialogDescription>
              Appointment: {patient.type} at {patient.time}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Age</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gender</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Condition</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-primary border-primary">
                    {patientDetails.condition}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last visit: {patientDetails.lastVisit}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patientDetails.medicalHistory.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patientDetails.currentMedications.map((medication, index) => (
                      <div key={index} className="p-2 bg-muted/30 rounded">
                        <p className="text-sm">{medication}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Latest Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Blood Pressure</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Heart Rate</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.vitals.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.vitals.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-muted-foreground">{patientDetails.vitals.weight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => setIsPrescriptionOpen(true)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Write Prescription
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        patient={patientDetails}
      />
    </>
  );
};

export default PatientDetailsModal;