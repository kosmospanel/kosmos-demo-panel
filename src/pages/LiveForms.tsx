import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

interface CustomForm {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: string;
}

const LiveForms = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<CustomForm[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const addField = () => {
    if (!newFieldLabel.trim()) {
      toast.error("Please enter a field label");
      return;
    }

    const newField: FormField = {
      id: Date.now().toString(),
      label: newFieldLabel,
      type: newFieldType,
      required: newFieldRequired,
    };

    setFields([...fields, newField]);
    setNewFieldLabel("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    toast.success("Field added");
  };

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId));
    toast.success("Field removed");
  };

  const saveForm = () => {
    if (!formName.trim()) {
      toast.error("Please enter a form name");
      return;
    }

    if (fields.length === 0) {
      toast.error("Please add at least one field");
      return;
    }

    const newForm: CustomForm = {
      id: Date.now().toString(),
      name: formName,
      fields: fields,
      createdAt: new Date().toLocaleString(),
    };

    setForms([...forms, newForm]);
    setFormName("");
    setFields([]);
    setIsCreating(false);
    toast.success("Form created successfully");
  };

  const deleteForm = (formId: string) => {
    setForms(forms.filter(f => f.id !== formId));
    toast.success("Form deleted");
  };

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
        <h1 className="text-2xl font-bold text-foreground">Live Forms</h1>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Create New Form Button */}
        {!isCreating && (
          <Button 
            onClick={() => setIsCreating(true)} 
            className="mb-6 w-full sm:w-auto"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Form
          </Button>
        )}

        {/* Form Builder */}
        {isCreating && (
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle>Create New Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form Name */}
              <div className="space-y-2">
                <Label htmlFor="formName">Form Name</Label>
                <Input
                  id="formName"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter form name"
                  className="bg-background"
                />
              </div>

              {/* Add Field Section */}
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Add Form Field</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fieldLabel">Field Label</Label>
                    <Input
                      id="fieldLabel"
                      value={newFieldLabel}
                      onChange={(e) => setNewFieldLabel(e.target.value)}
                      placeholder="e.g., Full Name"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fieldType">Field Type</Label>
                    <Select value={newFieldType} onValueChange={setNewFieldType}>
                      <SelectTrigger id="fieldType" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="tel">Phone</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="textarea">Text Area</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="select">Dropdown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="required" className="cursor-pointer">Required field</Label>
                </div>

                <Button onClick={addField} variant="secondary" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {/* Fields List */}
              {fields.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Form Fields ({fields.length})</h3>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <span className="text-muted-foreground font-mono">{index + 1}.</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{field.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Type: {field.type} {field.required && "• Required"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(field.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={saveForm} className="flex-1">
                  Save Form
                </Button>
                <Button 
                  onClick={() => {
                    setIsCreating(false);
                    setFormName("");
                    setFields([]);
                  }} 
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forms List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Your Forms ({forms.length})</h2>
          
          {forms.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No forms created yet. Create your first form above!</p>
              </CardContent>
            </Card>
          ) : (
            forms.map((form) => (
              <Card key={form.id} className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>{form.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created: {form.createdAt} • {form.fields.length} field(s)
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteForm(form.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {form.fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span className="text-foreground">{field.label}</span>
                        <span className="text-muted-foreground">({field.type})</span>
                        {field.required && (
                          <span className="text-destructive text-xs">*required</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveForms;
