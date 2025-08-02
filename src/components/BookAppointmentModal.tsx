import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookAppointmentModalProps {
  children: React.ReactNode;
}

const BookAppointmentModal = ({ children }: BookAppointmentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const { toast } = useToast();

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      availableSlots: ["10:00 AM", "2:00 PM", "4:30 PM"],
      currentQueue: 5,
      estimatedWait: "45 mins"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "General Practice",
      availableSlots: ["9:30 AM", "1:15 PM", "3:45 PM"],
      currentQueue: 3,
      estimatedWait: "30 mins"
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialization: "Dermatology",
      availableSlots: ["11:00 AM", "2:30 PM"],
      currentQueue: 7,
      estimatedWait: "60 mins"
    }
  ];

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
          <div className="grid gap-4">
            {doctors.map((doctor) => (
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
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;