import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  is_upcoming: boolean;
  display_order: number;
};

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Interior", description: "", is_upcoming: false });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const ADMIN_PIN = "1234";

  useEffect(() => {
    if (authenticated) fetchProjects();
  }, [authenticated]);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
    if (data) setProjects(data);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !form.title.trim()) {
      toast({ title: "Please provide a title and image", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage.from("project-images").upload(fileName, selectedFile);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("projects").insert({
        title: form.title,
        category: form.category,
        description: form.description || null,
        image_url: urlData.publicUrl,
        is_upcoming: form.is_upcoming,
        display_order: projects.length,
      });
      if (insertError) throw insertError;

      toast({ title: "Project uploaded successfully! ✨" });
      setForm({ title: "", category: "Interior", description: "", is_upcoming: false });
      setSelectedFile(null);
      setPreview(null);
      fetchProjects();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      toast({ title: "Project deleted" });
      fetchProjects();
    }
  };

  const toggleUpcoming = async (id: string, current: boolean) => {
    await supabase.from("projects").update({ is_upcoming: !current }).eq("id", id);
    fetchProjects();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-muted text-muted-foreground text-xs font-body hover:bg-accent hover:text-accent-foreground transition-colors shadow-md"
        title="Admin Panel"
      >
        ⚙
      </button>
    );
  }

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-6">
        <div className="bg-background rounded-lg p-8 max-w-sm w-full shadow-2xl">
          <h3 className="font-heading text-xl font-bold text-foreground mb-4">Admin Access</h3>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-3 bg-muted border border-border rounded-sm font-body text-sm text-foreground mb-4 focus:outline-none focus:border-accent"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (pin === ADMIN_PIN) setAuthenticated(true);
                else toast({ title: "Wrong PIN", variant: "destructive" });
              }
            }}
          />
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (pin === ADMIN_PIN) setAuthenticated(true);
                else toast({ title: "Wrong PIN", variant: "destructive" });
              }}
              className="flex-1 py-2.5 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-sm hover:bg-accent transition-colors"
            >
              Enter
            </button>
            <button
              onClick={() => { setOpen(false); setPin(""); }}
              className="flex-1 py-2.5 bg-muted text-muted-foreground font-body text-sm rounded-sm hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
          <h3 className="font-heading text-2xl font-bold text-foreground">Project Manager</h3>
          <button
            onClick={() => { setOpen(false); setAuthenticated(false); setPin(""); }}
            className="text-muted-foreground hover:text-foreground text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleUpload} className="space-y-4 mb-8 p-6 bg-muted/50 rounded-sm">
            <h4 className="font-heading text-lg font-semibold text-foreground">Upload New Project</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Title *"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:outline-none focus:border-accent"
              >
                {["Interior", "Exterior", "Bedroom", "Bathroom", "Kitchen", "Living Room", "Office"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
            />

            <label className="flex items-center gap-2 font-body text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_upcoming}
                onChange={(e) => setForm((f) => ({ ...f, is_upcoming: e.target.checked }))}
                className="rounded border-border"
              />
              Mark as upcoming project
            </label>

            <div className="flex items-center gap-4">
              <label className="flex-1 border-2 border-dashed border-border hover:border-accent rounded-sm p-4 text-center cursor-pointer transition-colors">
                <span className="font-body text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : "Click to select image"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
              </label>
              {preview && (
                <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-sm" />
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Project"}
            </button>
          </form>

          <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
            Existing Projects ({projects.length})
          </h4>
          
          {projects.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center py-8">No projects yet. Upload your first one above!</p>
          ) : (
            <div className="grid gap-3">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-sm border border-border">
                  <img src={project.image_url} alt={project.title} className="w-16 h-16 object-cover rounded-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-semibold text-foreground truncate">{project.title}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {project.category} {project.is_upcoming ? "• 🔜 Upcoming" : "• ✅ Completed"}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleUpcoming(project.id, project.is_upcoming)}
                    className="px-3 py-1.5 text-xs font-body bg-secondary text-secondary-foreground rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {project.is_upcoming ? "Mark Done" : "Mark Upcoming"}
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1.5 text-xs font-body bg-destructive text-destructive-foreground rounded-sm hover:opacity-80 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
