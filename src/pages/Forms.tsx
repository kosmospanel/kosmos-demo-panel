import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search as SearchIcon, Trash2, RotateCw, Copy } from "lucide-react";

interface FormData {
  deviceId: string;
  dataId: string;
  dateCreated: string;
  name: string;
  mobileNumber: string;
  dateOfBirth?: string;
  email?: string;
}

const Forms = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const demoForms: FormData[] = [
    {
      deviceId: "8f92",
      dataId: "SLIJ",
      dateCreated: "20-11-2025 13:05:14",
      name: "Ramisetti Nagababu",
      mobileNumber: "+919848640496",
      dateOfBirth: "03/04/1990",
    },
    {
      deviceId: "f905",
      dataId: "TI-8",
      dateCreated: "20-11-2025 11:29:46",
      name: "saikumar Pathri",
      mobileNumber: "+919876543210",
      dateOfBirth: "15/07/1988",
    },
    {
      deviceId: "2a3c",
      dataId: "XK-9",
      dateCreated: "20-11-2025 10:15:32",
      name: "Priya Sharma",
      mobileNumber: "+919123456789",
      dateOfBirth: "22/12/1995",
      email: "priya.sharma@email.com",
    },
  ];

  const filteredForms = demoForms.filter(form =>
    form.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            Forms (Total: {demoForms.length})
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

        {/* Forms List */}
        <div className="space-y-4">
          {filteredForms.map((form, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Device ID:</p>
                    <p className="text-foreground">{form.deviceId}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Data ID:</p>
                    <p className="text-foreground">{form.dataId}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-orange-500">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Date Created:</p>
                  <p className="text-foreground">{form.dateCreated}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Name:</p>
                  <p className="text-foreground">{form.name}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">Mobile Number:</p>
                  <p className="text-foreground">{form.mobileNumber}</p>
                </div>

                {form.dateOfBirth && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Date Of Birth:</p>
                    <p className="text-foreground">{form.dateOfBirth}</p>
                  </div>
                )}

                {form.email && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email:</p>
                    <p className="text-foreground">{form.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forms;
