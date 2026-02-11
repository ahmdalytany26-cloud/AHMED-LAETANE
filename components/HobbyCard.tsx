
import React from 'react';
import { Hobby } from '../types';

interface HobbyCardProps {
  hobby: Hobby;
}

export const HobbyCard: React.FC<HobbyCardProps> = ({ hobby }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
        {hobby.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{hobby.name}</h3>
      <p className="text-gray-500 text-sm">{hobby.description}</p>
    </div>
  );
};
