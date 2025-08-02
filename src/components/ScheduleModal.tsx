import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock schedule data
  const weeklySchedule = [
    {
      date: "2024-01-22",
      day: "Monday",
      appointments: [
        { time: "09:00", patient: "John Doe", type: "Consultation", status: "confirmed" },
        { time: "10:30", patient: "Jane Smith", type: "Follow-up", status: "confirmed" },
        { time: "14:00", patient: "Mike Wilson", type: "Check-up", status: "pending" }
      ]
    },
    {
      date: "2024-01-23",
      day: "Tuesday",
      appointments: [
        { time: "08:30", patient: "Sarah Johnson", type: "Consultation", status: "confirmed" },
        { time: "11:00", patient: "Tom Brown", type: "Follow-up", status: "confirmed" }
      ]
    },
    {
      date: "2024-01-24",
      day: "Wednesday",
      appointments: [
        { time: "09:30", patient: "Lisa Davis", type: "Check-up", status: "confirmed" },
        { time: "15:00", patient: "Robert Miller", type: "Consultation", status: "pending" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent text-accent-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Overview
          </DialogTitle>
          <DialogDescription>
            View and manage your weekly appointments
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Weekly Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklySchedule.map((day) => (
                  <div key={day.date} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{day.day}</h3>
                      <span className="text-sm text-muted-foreground">{day.date}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {day.appointments.map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span className="font-medium">{appointment.patient}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {appointment.type}
                            </Badge>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                      
                      {day.appointments.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          No appointments scheduled
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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

export default ScheduleModal;