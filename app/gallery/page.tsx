'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { X, Upload, ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase, GalleryImage } from '@/lib/supabase';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order', { ascending: true });
    if (data) setImages(data);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);

    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        const { error } = await supabase.from('gallery_images').insert({
          image_url: base64,
          title: file.name,
          category: 'Uncategorized',
          order: images.length,
        });

        if (!error) {
          fetchImages();
        }
      };
      reader.readAsDataURL(file);
    }

    setIsUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    multiple: true,
  });

  const categories = [
    'All',
    ...Array.from(new Set(images.map((img) => img.category || 'Uncategorized'))),
  ];

  const filteredImages =
    filter === 'All'
      ? images
      : images.filter((img) => (img.category || 'Uncategorized') === filter);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
              A visual collection of projects, field visits, and memorable moments
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card
              {...getRootProps()}
              className={`p-12 rounded-3xl border-2 border-dashed cursor-pointer transition-all mb-12 ${
                isDragActive
                  ? 'border-turquoise-500 bg-turquoise-50'
                  : 'border-turquoise-200 hover:border-turquoise-400 hover:bg-turquoise-50/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-center">
                <Upload
                  className={`w-16 h-16 mb-4 ${
                    isDragActive ? 'text-turquoise-600' : 'text-gray-400'
                  }`}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isDragActive
                    ? 'Drop images here...'
                    : 'Upload Images to Gallery'}
                </h3>
                <p className="text-gray-600">
                  Drag and drop images here, or click to select files
                </p>
                {isUploading && (
                  <p className="text-turquoise-600 mt-4">Uploading...</p>
                )}
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? 'default' : 'outline'}
                  className={`rounded-full ${
                    filter === category
                      ? 'bg-turquoise-500 hover:bg-turquoise-600 text-white'
                      : 'border-2 border-turquoise-200 text-gray-700 hover:bg-turquoise-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          {filteredImages.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {filteredImages.map((image, index) => (
                <AnimatedSection key={image.id} delay={index * 0.05}>
                  <Card
                    className="mb-6 overflow-hidden rounded-3xl border-2 border-turquoise-100 cursor-pointer hover:shadow-xl transition-all break-inside-avoid"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.image_url}
                        alt={image.title || 'Gallery image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {image.title && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">
                          {image.title}
                        </p>
                      </div>
                    )}
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No images in gallery. Upload some to get started!
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.title || 'Gallery image'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
