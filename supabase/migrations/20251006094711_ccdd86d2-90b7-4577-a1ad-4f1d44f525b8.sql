-- Create storage bucket for palm scan images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'palm-scans',
  'palm-scans',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create policies for palm scan images
CREATE POLICY "Users can upload their own palm scans"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'palm-scans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own palm scans"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'palm-scans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own palm scans"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'palm-scans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add image_url column to palm_scans table
ALTER TABLE public.palm_scans
ADD COLUMN IF NOT EXISTS image_url text;