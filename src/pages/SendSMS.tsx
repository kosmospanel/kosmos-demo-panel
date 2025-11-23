import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Search as SearchIcon, RotateCw, Send } from "lucide-react";
import { toast } from "sonner";

interface Device {
  deviceId: string;
  dateCreated: string;
  deviceModel: string;
  onlineStatus: string;
  activeNumbers: string[];
}

const SendSMS = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [message, setMessage] = useState("");

  const demoDevices: Device[] = [
    {
      deviceId: "f905",
      dateCreated: "20-11-2025 11:28:43",
      deviceModel: "Nothing A142",
      onlineStatus: "Online",
      activeNumbers: ["+919848640496", "916281192012"],
    },
    {
      deviceId: "51a2",
      dateCreated: "20-11-2025 10:57:38",
      deviceModel: "samsung SM-A346E",
      onlineStatus: "Online",
      activeNumbers: ["+919876543210"],
    },
  ];

  const filteredDevices = demoDevices.filter(device =>
    device.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendSMS = () => {
    if (!selectedNumber || !receiverNumber || !message) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("SMS sent successfully!");
    setSelectedDevice(null);
    setSelectedNumber("");
    setReceiverNumber("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="text-destructive-foreground hover:bg-destructive-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-destructive-foreground">Send SMS</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-destructive-foreground hover:bg-destructive-foreground/10">
          <RotateCw className="w-5 h-5" />
        </Button>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your query i.e Device ID"
            className="mb-4 bg-card"
          />
          <div className="grid grid-cols-3 gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setSearchQuery("")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Clear
            </Button>
            <Button 
              variant="secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Goto Top
            </Button>
          </div>
        </div>

        {/* Online Status */}
        <Card className="mb-6 border-border/50 bg-card">
          <CardContent className="p-4">
            <p className="font-bold text-foreground">Online</p>
            <p className="text-sm text-muted-foreground mt-1">
              Active Numbers: {demoDevices.flatMap(d => d.activeNumbers).join(", ")}
            </p>
          </CardContent>
        </Card>

        {/* Devices List */}
        <div className="space-y-4">
          {filteredDevices.map((device, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Device ID:</p>
                    <p className="text-foreground">{device.deviceId}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-primary"
                    onClick={() => {
                      setSelectedDevice(device);
                      setSelectedNumber(device.activeNumbers[0]);
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Date Created:</p>
                  <p className="text-foreground">{device.dateCreated}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Device Model:</p>
                  <p className="text-foreground">{device.deviceModel}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Online Status:</p>
                  <p className="text-green-500 font-semibold">{device.onlineStatus}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Active Numbers:</p>
                  <p className="text-foreground">{device.activeNumbers.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Send SMS Dialog */}
      <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Send SMS</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Device ID:</Label>
              <p className="text-foreground font-semibold">{selectedDevice?.deviceId}</p>
            </div>

            <div className="space-y-2">
              <Label>Select User Number:</Label>
              <RadioGroup value={selectedNumber} onValueChange={setSelectedNumber}>
                {selectedDevice?.activeNumbers.map((number, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={number} id={`number-${idx}`} />
                    <Label htmlFor={`number-${idx}`} className="cursor-pointer">{number}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiver">Enter Receiver Number:</Label>
              <Input
                id="receiver"
                value={receiverNumber}
                onChange={(e) => setReceiverNumber(e.target.value)}
                placeholder="Enter receiver number"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Enter Your Message:</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="bg-background min-h-24"
              />
            </div>

            <Button onClick={handleSendSMS} className="w-full bg-purple-600 hover:bg-purple-700">
              Send SMS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendSMS;
