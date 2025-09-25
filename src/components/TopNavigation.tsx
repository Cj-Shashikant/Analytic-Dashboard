import React, { useState } from 'react';
import { Search, Bell, Home, ArrowLeft, Settings, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-red-500" />
          </Button>
        </div>

        {/* Center Section - Search */}
        <div className="hidden sm:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* First group - Notification only (removed leaderboard) */}
          <div className="flex items-center space-x-2 mr-1 sm:mr-3">
            {/* Notification */}
            <Button variant="ghost" size="sm" className="p-2 relative">
              <div className="w-2 h-2 bg-green-500 rounded-full absolute -top-0.5 -right-0.5"></div>
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* Second group - Navigation buttons */}
          <div className="hidden sm:flex items-center space-x-2 mr-3">
            {/* Home */}
            <Button variant="ghost" size="sm" className="p-2">
              <Home className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Back */}
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* Third group - Profile */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="RK" />
              <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">ST</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-sm">
              <div className="font-medium text-gray-900">Shashikant Tripathi</div>
              <div className="text-gray-500 text-xs">Chairman</div>
            </div>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="p-2 ml-1 sm:ml-2">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}