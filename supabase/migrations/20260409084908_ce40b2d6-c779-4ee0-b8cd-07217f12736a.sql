
-- Create projects table for designer's portfolio
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Interior',
  description TEXT,
  image_url TEXT NOT NULL,
  is_upcoming BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Everyone can view projects
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

-- Anyone can insert projects (admin auth will be handled in app)
CREATE POLICY "Anyone can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

-- Anyone can update projects
CREATE POLICY "Anyone can update projects"
  ON public.projects FOR UPDATE
  USING (true);

-- Anyone can delete projects
CREATE POLICY "Anyone can delete projects"
  ON public.projects FOR DELETE
  USING (true);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Storage policies
CREATE POLICY "Project images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
