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
  Image as ImageIcon,
} from 'lucide-react';
import axios, { AxiosResponse, AxiosError } from 'axios';

const primaryColor = '#f4511e';

// Extend the Album interface to match your API response
interface Album {
  id: string;
  title: string;
}

// Interface for the API response structure
interface AlbumsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Album[];
}

interface CreditEntry {
  role: string;
  name: string;
}

interface SongFormData {
  title: string;
  albumId: string;
  audio_file_upload: File | null;
  song_cover_upload: File | null; 
  credits: CreditEntry[];
}

interface FormErrors {
  title?: string;
  albumId?: string;
  audio_file_upload?: string;
  song_cover_upload?: string;
  credits?: string;
}

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
  placeholder?: string;
}

interface FormImageUploadProps {
  id: string;
  label: string;
  file: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const commonRoles = ['Writer', 'Producer', 'Engineer', 'Musician', 'Mixer', 'Artist', 'Composer', 'Feat. Artist'];

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

const FormSelect: React.FC<FormSelectProps> = ({ id, label, value, onChange, options, error, placeholder }) => (
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
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormImageUpload: React.FC<FormImageUploadProps> = ({ id, label, file, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [file]);

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className={`relative w-36 h-36 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${error ? 'border-red-500' : 'border-zinc-700 focus-within:border-white'}`}>
        <label htmlFor={id} className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-colors">
          {preview ? (
            <img src={preview} alt="Song Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <ImageIcon className="w-8 h-8" />
              <span className="mt-2 text-center text-sm">Upload Cover</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};


const App: React.FC = () => {
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    albumId: '',
    audio_file_upload: null,
    song_cover_upload: null, 
    credits: [],
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  
  // New state for fetching albums
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isAlbumsLoading, setIsAlbumsLoading] = useState<boolean>(true);
  const [albumsError, setAlbumsError] = useState<string | null>(null);

  // UseEffect to fetch albums from the authenticated artist
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response: AxiosResponse<AlbumsApiResponse> = await axios.get('http://localhost:8000/api/albums/', {
          withCredentials: true,
        });
        setAlbums(response.data.results);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
        setAlbumsError('Failed to load albums. Please try again later.');
      } finally {
        setIsAlbumsLoading(false);
      }
    };
    fetchAlbums();
  }, []);

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
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleAddCredit = () => {
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
    if (!formData.song_cover_upload) errors.song_cover_upload = 'Song cover is required.';
    
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

    if (formData.song_cover_upload) {
        formPayload.append('song_cover_upload', formData.song_cover_upload);
    }
   
    
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
        song_cover_upload: null,
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

  const renderAlbumSelect = () => {
    if (isAlbumsLoading) {
      return (
        <div className="mb-6 flex items-center justify-center p-3 rounded-lg bg-zinc-800 text-zinc-400">
          <Loader2 className="animate-spin w-5 h-5 mr-2" />
          <span>Loading albums...</span>
        </div>
      );
    }

    if (albumsError) {
      return (
        <div className="mb-6 p-3 rounded-lg border border-red-500 bg-red-900 text-red-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{albumsError}</span>
        </div>
      );
    }

    if (albums.length === 0) {
      return (
        <div className="mb-6 p-3 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>No albums found. You need to create an album first.</span>
        </div>
      );
    }
    
    return (
      <FormSelect
        id="albumId"
        label="Album (Optional)"
        value={formData.albumId}
        onChange={(e) => handleInputChange(e)}
        options={albums}
        error={validationErrors.albumId}
        placeholder="Select an album"
      />
    );
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
            <h1 className="text-2xl md:text-3xl font-extrabold">Add New Song</h1>
          </div>
        </div>

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

        <form onSubmit={handleSubmit}>
          
          <FormInput
            id="title"
            label="Song Title"
            value={formData.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="e.g., Echoes of the Night"
            error={validationErrors.title}
          />
          
          {renderAlbumSelect()}
          
          <FormImageUpload
            id="song_cover_upload"
            label="Song Cover"
            file={formData.song_cover_upload}
            onChange={handleFileChange}
            error={validationErrors.song_cover_upload}
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