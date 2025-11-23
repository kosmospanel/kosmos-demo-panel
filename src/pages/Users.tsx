import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Smartphone, Wifi, WifiOff } from "lucide-react";

interface User {
  deviceId: string;
  deviceModel: string;
  onlineStatus: "Online" | "Offline";
  dateCreated: string;
  activeNumbers: string[];
}

const Users = () => {
  const navigate = useNavigate();

  const demoUsers: User[] = [
    {
      deviceId: "DEMO-001",
      deviceModel: "Demo Device - Samsung Galaxy S23",
      onlineStatus: "Online",
      dateCreated: "23-11-2025 05:30:00",
      activeNumbers: ["+919999999999", "+918888888888"],
    },
    {
      deviceId: "f905",
      deviceModel: "Nothing A142",
      onlineStatus: "Online",
      dateCreated: "20-11-2025 11:28:43",
      activeNumbers: ["+919848640496", "916281192012"],
    },
    {
      deviceId: "51a2",
      deviceModel: "Samsung SM-A346E",
      onlineStatus: "Offline",
      dateCreated: "20-11-2025 10:57:38",
      activeNumbers: ["+919876543210"],
    },
  ];

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
        <h1 className="text-2xl font-bold text-foreground">Users ({demoUsers.length})</h1>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {demoUsers.map((user, index) => (
            <Card key={index} className="border-border/50 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{user.deviceId}</h3>
                      {user.deviceId === "DEMO-001" && (
                        <Badge variant="secondary" className="mt-1">Demo Device</Badge>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={user.onlineStatus === "Online" ? "default" : "secondary"}
                    className={user.onlineStatus === "Online" ? "bg-green-600" : "bg-gray-600"}
                  >
                    {user.onlineStatus === "Online" ? (
                      <><Wifi className="w-3 h-3 mr-1" /> Online</>
                    ) : (
                      <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Device Model</p>
                    <p className="text-foreground font-medium">{user.deviceModel}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Date Created</p>
                    <p className="text-foreground font-medium">{user.dateCreated}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Active Numbers</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.activeNumbers.map((number, idx) => (
                        <Badge key={idx} variant="outline">
                          {number}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
