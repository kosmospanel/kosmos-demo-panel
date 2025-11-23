import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Clock } from "lucide-react";

interface Alert {
  id: string;
  deviceId: string;
  status: "Online" | "Offline";
  timestamp: string;
  message: string;
}

const LiveAlerts = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      deviceId: "DEMO-001",
      status: "Online",
      timestamp: new Date().toLocaleString(),
      message: "Demo device is now online and ready for testing",
    },
  ]);

  useEffect(() => {
    // Simulate live alerts every 30 seconds
    const interval = setInterval(() => {
      const demoDevice = {
        id: Date.now().toString(),
        deviceId: "DEMO-001",
        status: Math.random() > 0.5 ? "Online" : "Offline" as "Online" | "Offline",
        timestamp: new Date().toLocaleString(),
        message: "",
      };
      
      demoDevice.message = demoDevice.status === "Online" 
        ? "Demo device reconnected successfully"
        : "Demo device went offline - connection lost";

      setAlerts(prev => [demoDevice, ...prev].slice(0, 20));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-2xl font-bold text-foreground">Live Alerts</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Real-time indicator */}
        <Card className="mb-6 border-green-600/50 bg-green-950/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="text-green-400 font-medium">Real-time monitoring active</p>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No alerts yet. Waiting for device activity...</p>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`border-border/50 ${
                  alert.status === "Online" 
                    ? "border-l-4 border-l-green-600" 
                    : "border-l-4 border-l-destructive"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{alert.deviceId}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={alert.status === "Online" ? "default" : "destructive"}
                      className={alert.status === "Online" ? "bg-green-600" : ""}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground">{alert.message}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;
