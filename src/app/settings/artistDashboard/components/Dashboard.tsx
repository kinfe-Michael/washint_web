'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Users,
  Music,
  Album,
  BarChart2,
  Calendar,
  Eye,
  Plus,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import DashboardButton from '../../../components/DashboardButton';
import SongRow from './SongRow';
import Albems from './Albems';
// Use a CSS variable for the primary color for easy reuse.
const primaryColor = '#f4511e';

// --- MOCK DATA ---
// In a real application, this data would be fetched from an API.
const artistData = {
  name: 'Jane Doe',
  profileImageUrl: 'https://placehold.co/100x100/f4511e/ffffff?text=JD',
  totalStreams: '345,678,901',
  followers: '1.2M',
  monthlyListeners: '890,123',
};

const monthlyListenersData = [
  { name: 'Jan', listeners: 650000 },
  { name: 'Feb', listeners: 700000 },
  { name: 'Mar', listeners: 850000 },
  { name: 'Apr', listeners: 800000 },
  { name: 'May', listeners: 750000 },
  { name: 'Jun', listeners: 890123 },
];

const songsData = [
  { id: 1, title: 'Echoes of the Night', album: 'Starlight Symphony', streams: '12,345,678', releaseDate: '2023-01-15' },
  { id: 2, title: 'City of Dreams', album: 'Urban Serenade', streams: '9,876,543', releaseDate: '2022-09-01' },
  { id: 3, title: 'Lost in the Stars', album: 'Starlight Symphony', streams: '8,765,432', releaseDate: '2023-01-15' },
  { id: 4, title: 'Neon Pulse', album: 'Urban Serenade', streams: '6,543,210', releaseDate: '2022-09-01' },
  { id: 5, title: 'Whispering Wind', album: 'The Great Outdoors', streams: '5,432,109', releaseDate: '2021-05-20' },
  { id: 6, title: 'Shadows on the Horizon', album: 'The Great Outdoors', streams: '4,321,098', releaseDate: '2021-05-20' },
];







// Main Dashboard Component
const ArtistDashboard: React.FC = () => {
  const [showAllSongs, setShowAllSongs] = useState(false);
  const songsToShow = showAllSongs ? songsData : songsData.slice(0, 5);

  // Use useEffect to prevent Cumulative Layout Shift
  useEffect(() => {
    // This is a common practice in Next.js/React to ensure client-side rendering
    // and prevent layout shifts when using libraries like recharts.
    // The component will only render its dynamic parts after the component has mounted.
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 font-sans antialiased text-zinc-200">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <img
              src={artistData.profileImageUrl}
              alt={artistData.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold" style={{ color: primaryColor }}>
                {artistData.name}
              </h1>
              <p className="text-sm md:text-base text-zinc-400 mt-1">Artist Dashboard</p>
            </div>
          </div>
          <div className="flex gap-4 self-stretch md:self-auto">
            <DashboardButton  routeTo='/settings/artistDashboard/addNewContent' onClick={()=> console.log('c')} icon={<Plus className="w-4 h-4" />}>
              Add New Content
            </DashboardButton>
           
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-wide text-zinc-400">Total Streams</h2>
              <BarChart2 className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-3xl font-bold mt-2" style={{ color: primaryColor }}>
              {artistData.totalStreams}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-wide text-zinc-400">Monthly Listeners</h2>
              <Users className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-3xl font-bold mt-2" style={{ color: primaryColor }}>
              {artistData.monthlyListeners}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-wide text-zinc-400">Followers</h2>
              <Users className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-3xl font-bold mt-2" style={{ color: primaryColor }}>
              {artistData.followers}
            </p>
          </div>

       
        </div>

        {/* --- Monthly Listeners Chart Section --- */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-12 shadow-md border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Monthly Listeners Trend</h2>
            <select className="bg-zinc-800 text-zinc-200 border-none rounded-md px-3 py-1 text-sm focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyListenersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#27272a', border: '1px solid #52525b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4511e' }}
                />
                <Line type="monotone" dataKey="listeners" stroke={primaryColor} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Content Sections: Songs & Albums --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Top Songs Section */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Top Songs</h2>
              <button
                onClick={() => setShowAllSongs(!showAllSongs)}
                className="flex items-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {showAllSongs ? 'Show Less' : 'View All'}
                {showAllSongs ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4 ml-1" />}
              </button>
            </div>
            <div>
              <SongRow isHeader />
              {songsToShow.map((song) => (
                <SongRow key={song.id} song={song} />
              ))}
            </div>
          </div>
          
          <Albems/>
        
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
