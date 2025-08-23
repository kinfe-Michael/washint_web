'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Music,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  X,
} from 'lucide-react';
import axios, { AxiosResponse, AxiosError } from 'axios';

// Use a CSS variable for the primary color for easy reuse.
const primaryColor = '#f4511e';

// --- TYPE DEFINITIONS AND MOCK DATA ---
interface Album {
  id: string;
  title: string;
  artistId: string;
}

interface CreditEntry {
  role: string;
  name: string;
}

interface SongFormData {
  title: string;
  albumId: string;
  audio_file_upload: File | null;
  credits: CreditEntry[];
}

interface FormErrors {
  title?: string;
  albumId?: string;
  audio_file_upload?: string;
  credits?: string;
}

// Defining props interfaces for the reusable components
interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Album[];
  error?: string;
}

const mockAlbums: Album[] = [
  { id: 'album-1', title: 'Starlight Symphony', artistId: 'artist-1' },
  { id: 'album-2', title: 'Urban Serenade', artistId: 'artist-1' },
  { id: 'album-3', title: 'The Great Outdoors', artistId: 'artist-1' },
  { id: 'album-4', title: 'Retro Vibes', artistId: 'artist-2' },
  { id: 'album-5', title: 'Jazz Nights', artistId: 'artist-3' },
];

const commonRoles = ['Writer', 'Producer', 'Engineer', 'Musician', 'Mixer', 'Artist', 'Composer', 'Feat. Artist'];

// --- REUSABLE COMPONENTS WITH EXPLICIT TYPES ---
const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, error }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
        focus:outline-none transition-colors duration-200
        ${error ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
      `}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormSelect: React.FC<FormSelectProps> = ({ id, label, value, onChange, options, error }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`
        w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
        focus:outline-none transition-colors duration-200
        ${error ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
      `}
    >
      <option value="" disabled>Select a {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const App: React.FC = () => {
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    albumId: '',
    audio_file_upload: null,
    credits: [],
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  
  // Mocking an artistId for filtering
  const artistId = 'artist-1';

  const filteredAlbums: Album[] = artistId
    ? mockAlbums.filter(album => album.artistId === artistId)
    : [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      audio_file_upload: file,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      audio_file_upload: undefined,
    }));
  };

  const handleAddCredit = () => {
    // Add a new credit with an empty role to allow for custom input
    setFormData((prevData) => ({
      ...prevData,
      credits: [...prevData.credits, { role: '', name: '' }],
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      credits: undefined,
    }));
  };

  const handleRemoveCredit = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      credits: prevData.credits.filter((_, i) => i !== index),
    }));
  };

  const handleCreditChange = (index: number, field: keyof CreditEntry, value: string) => {
    setFormData((prevData) => {
      const newCredits = [...prevData.credits];
      newCredits[index] = { ...newCredits[index], [field]: value };
      return { ...prevData, credits: newCredits };
    });
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.title) errors.title = 'Title is required.';
    if (!formData.audio_file_upload) errors.audio_file_upload = 'Audio file is required.';
    
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
    
    // Filter out credits with empty names before submission
    const filteredCredits = formData.credits.filter(
      (credit) => credit.name.trim() !== ''
    );

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    if (formData.albumId) {
        formPayload.append('album', formData.albumId);
    }
    
    formPayload.append('credits', JSON.stringify(filteredCredits));
   
    if (formData.audio_file_upload) {
        formPayload.append('audio_file_upload', formData.audio_file_upload);
    }
   
    const authToken = 'YOUR_AUTH_TOKEN'; // Use a real auth token in a production environment
    
    try {
      const response: AxiosResponse = await axios.post('http://localhost:8000/api/songs/', formPayload, {
        withCredentials:true,
      });

      console.log('Song added successfully:', response.data);
      setSubmitStatus('success');
      setFormData({
        title: '',
        albumId: '',
        audio_file_upload: null,
        credits: [],
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Server response:', axiosError.response.data);
        console.error('Status code:', axiosError.response.status);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 font-sans antialiased text-zinc-200">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl p-6 md:p-10 shadow-lg border border-zinc-800">
        
        {/* --- Header and Back Button --- */}
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
            <h1 className="text-2xl md:text-3xl font-extrabold">Add New Song</h1>
          </div>
        </div>

        {/* --- Form Status Message --- */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-green-900 text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span>Song added successfully!</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-900 text-red-300">
            <AlertCircle className="w-5 h-5" />
            <span>An error occurred. Please check your input and try again.</span>
          </div>
        )}

        {/* --- Main Form --- */}
        <form onSubmit={handleSubmit}>
          
          <FormInput
            id="title"
            label="Song Title"
            value={formData.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="e.g., Echoes of the Night"
            error={validationErrors.title}
          />
          
          <FormSelect
            id="albumId"
            label="Album (Optional)"
            value={formData.albumId}
            onChange={(e) => handleInputChange(e)}
            options={filteredAlbums}
            error={validationErrors.albumId}
          />
          
          <div className="mb-6">
            <label htmlFor="audio_file_upload" className="block text-zinc-400 text-sm font-semibold mb-2">
              Audio File
            </label>
            <input
              type="file"
              id="audio_file_upload"
              name="audio_file_upload"
              onChange={handleFileChange}
              className={`
                w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
                focus:outline-none transition-colors duration-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                ${validationErrors.audio_file_upload ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
              `}
            />
            {validationErrors.audio_file_upload && <p className="text-red-500 text-sm mt-1">{validationErrors.audio_file_upload}</p>}
          </div>

          {/* --- Credits Section --- */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-zinc-400 text-sm font-semibold">
                Credits
              </label>
              <button
                type="button"
                onClick={handleAddCredit}
                className="flex items-center gap-1 text-sm font-medium text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
                title="Add new credit"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.credits.map((credit, index) => (
              <div key={index} className="flex flex-col gap-2 mb-4 p-4 rounded-lg border border-zinc-700">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    placeholder="Role (e.g., Writer)"
                    value={credit.role}
                    onChange={(e) => handleCreditChange(index, 'role', e.target.value)}
                    className="flex-grow p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2 border-zinc-700 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCredit(index)}
                    className="p-2 rounded-full hover:bg-red-900 transition-colors"
                    title="Remove credit"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>
                {/* Common roles as buttons */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {commonRoles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleCreditChange(index, 'role', role)}
                      className={`
                        text-xs font-semibold px-3 py-1 rounded-full border
                        ${credit.role === role ? 'bg-zinc-700 border-zinc-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-500'}
                      `}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Name (e.g., Jane Doe)"
                  value={credit.name}
                  onChange={(e) => handleCreditChange(index, 'name', e.target.value)}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2 border-zinc-700 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            ))}
            {validationErrors.credits && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.credits}</p>
            )}
          </div>
          
          {/* --- Submit Button --- */}
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full p-3 rounded-lg font-bold text-white transition-all duration-300 transform"
            style={{ backgroundColor: primaryColor }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Saving Song...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add Song</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
