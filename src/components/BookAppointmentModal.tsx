import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Users, Plus, Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookAppointmentModalProps {
  children: React.ReactNode;
}

const BookAppointmentModal = ({ children }: BookAppointmentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<string>("all");
  const { toast } = useToast();

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      village: "Downtown Medical Center",
      availableSlots: ["10:00 AM", "2:00 PM", "4:30 PM"],
      currentQueue: 5,
      estimatedWait: "45 mins"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "General Practice",
      village: "Riverside Village Clinic",
      availableSlots: ["9:30 AM", "1:15 PM", "3:45 PM"],
      currentQueue: 3,
      estimatedWait: "30 mins"
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialization: "Dermatology",
      village: "Hillside Community Hospital",
      availableSlots: ["11:00 AM", "2:30 PM"],
      currentQueue: 7,
      estimatedWait: "60 mins"
    },
    {
      id: 4,
      name: "Dr. John Smith",
      specialization: "Orthopedics",
      village: "Riverside Village Clinic",
      availableSlots: ["9:00 AM", "3:00 PM"],
      currentQueue: 2,
      estimatedWait: "20 mins"
    },
    {
      id: 5,
      name: "Dr. Maria Garcia",
      specialization: "Pediatrics",
      village: "Downtown Medical Center",
      availableSlots: ["10:30 AM", "1:00 PM", "4:00 PM"],
      currentQueue: 4,
      estimatedWait: "35 mins"
    },
    {
      id: 6,
      name: "Dr. Ahmed Hassan",
      specialization: "Neurology",
      village: "Green Valley Health Center",
      availableSlots: ["11:30 AM", "2:15 PM"],
      currentQueue: 6,
      estimatedWait: "50 mins"
    }
  ];

  // Get unique villages for filter dropdown
  const villages = ["all", ...Array.from(new Set(doctors.map(doctor => doctor.village)))];

  // Filter doctors based on search term and selected village
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVillage = selectedVillage === "all" || doctor.village === selectedVillage;
    return matchesSearch && matchesVillage;
  });

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find(d => d.id.toString() === doctorId);
    if (doctor) {
      const newQueueNumber = doctor.currentQueue + 1;
      setQueueNumber(newQueueNumber);
      setSelectedDoctor(doctor.name);
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your queue number is ${newQueueNumber}. Estimated wait time: ${doctor.estimatedWait}`,
      });
      
      setTimeout(() => {
        setIsOpen(false);
        setQueueNumber(null);
        setSelectedDoctor(null);
      }, 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogDescription>
            Select a doctor and get your queue number
          </DialogDescription>
        </DialogHeader>

        {queueNumber ? (
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Appointment Confirmed!</CardTitle>
              <CardDescription>
                You've been added to {selectedDoctor}'s queue
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">#{queueNumber}</div>
                <div className="text-muted-foreground">Your Queue Number</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Please arrive 15 minutes before your estimated time
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctor name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {villages.map((village) => (
                    <SelectItem key={village} value={village} className="hover:bg-muted">
                      {village === "all" ? "All Locations" : village}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </div>

            {/* Doctors List */}
            <div className="grid gap-4">
              {filteredDoctors.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-muted-foreground">
                    No doctors found matching your search criteria.
                  </div>
                </Card>
              ) : (
                filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-muted-foreground">{doctor.specialization}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{doctor.village}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{doctor.currentQueue} in queue</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>~{doctor.estimatedWait} wait</span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {doctor.availableSlots.map((slot, index) => (
                          <Badge key={index} variant="outline">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleBookAppointment(doctor.id.toString())}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;