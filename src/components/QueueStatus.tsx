import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, TrendingUp } from "lucide-react";

const QueueStatus = () => {
  const currentQueues = [
    {
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      currentNumber: 15,
      yourNumber: null,
      estimatedWait: "45 mins",
      status: "active"
    },
    {
      doctor: "Dr. Michael Chen", 
      specialization: "General Practice",
      currentNumber: 8,
      yourNumber: 12,
      estimatedWait: "20 mins",
      status: "waiting"
    },
    {
      doctor: "Dr. Emily Wilson",
      specialization: "Dermatology", 
      currentNumber: 23,
      yourNumber: null,
      estimatedWait: "60 mins",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-primary text-primary-foreground";
      case "active": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Live Queue Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentQueues.map((queue, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{queue.doctor}</h4>
                  <p className="text-sm text-muted-foreground">{queue.specialization}</p>
                </div>
                <Badge className={getStatusColor(queue.status)}>
                  {queue.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">#{queue.currentNumber}</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
                
                {queue.yourNumber && (
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-accent">#{queue.yourNumber}</div>
                    <div className="text-xs text-muted-foreground">Your Number</div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{queue.estimatedWait}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Est. Wait</div>
                </div>
              </div>
              
              {queue.yourNumber && (
                <div className="mt-3 p-2 bg-primary/10 rounded text-center">
                  <p className="text-sm text-primary font-medium">
                    {queue.yourNumber - queue.currentNumber} patients ahead of you
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueStatus;