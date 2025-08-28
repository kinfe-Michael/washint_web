'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Music,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import FormInput from '@/app/components/FormInput';
import FormImageUpload from '@/app/components/FormImage';

const primaryColor = '#f4511e';

interface AlbumResponse {
  id: string;
  title: string;
  cover_art_upload: string;
}

interface AlbumFormData {
  title: string;
  cover_art_upload: File | null;
}

interface FormErrors {
  title?: string;
  cover_art_upload?: string;
}


const AlbumForm: React.FC = () => {
  const [formData, setFormData] = useState<AlbumFormData>({
    title: '',
    cover_art_upload: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      cover_art_upload: file,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      cover_art_upload: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required.';
    }
    if (!formData.cover_art_upload) {
      errors.cover_art_upload = 'Album cover is required.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationErrors({});

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    if (formData.cover_art_upload) {
      formPayload.append('cover_art_upload', formData.cover_art_upload);
    }

    try {
      const response: AxiosResponse<AlbumResponse> = await axios.post('http://localhost:8000/api/albums/', formPayload, {
       
        withCredentials: true,
      });

      console.log('Album added successfully:', response.data);
      setSubmitStatus('success');
      setFormData({
        title: '',
        cover_art_upload: null,
      });
    } catch (error) {
      console.error('Submission error:', error);
      const axiosError = error as AxiosError;
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 font-sans antialiased text-zinc-200">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl p-6 md:p-10 shadow-lg border border-zinc-800">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
            <span className="sr-only">Go Back</span>
          </button>
          <div className="flex items-center gap-4">
            <Music className="w-8 h-8" style={{ color: primaryColor }} />
            <h1 className="text-2xl md:text-3xl font-extrabold">Add New Album</h1>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-green-900 text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span>Album added successfully!</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-900 text-red-300">
            <AlertCircle className="w-5 h-5" />
            <span>An error occurred. Please check your input and try again.</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            id="title"
            label="Album Title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Celestial Harmonies"
            error={validationErrors.title}
          />

          <FormImageUpload
            id="cover_art_upload"
            label="Album Cover"
            file={formData.cover_art_upload}
            onChange={handleFileChange}
            error={validationErrors.cover_art_upload}
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full p-3 rounded-lg font-bold text-white transition-all duration-300 transform"
            style={{ backgroundColor: primaryColor }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Creating Album...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Create Album</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;