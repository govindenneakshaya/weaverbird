import { useState, useRef } from "react";

const UploadSection = () => {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Share Your Vision
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Upload Your Inspiration
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
          <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
            Share reference images of interiors you love, and let us bring your vision to life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-accent rounded-sm p-12 text-center cursor-pointer transition-colors duration-300 group"
          >
            <div className="text-5xl mb-4">📷</div>
            <p className="font-heading text-lg text-foreground">Drop your images here</p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              or click to browse • JPG, PNG, WEBP
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {images.map((img, i) => (
                <div key={i} className="relative group rounded-sm overflow-hidden aspect-square">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/60 rounded-full flex items-center justify-center text-primary-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
