'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from "@/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserInfo } from '@/app/api/registration/api';

const Page = () => {
  const { user } = useAuth();


  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-col items-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={user?.avatar || ''} alt={user?.username || 'User'} />
            <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold">{user?.username}</CardTitle>
              <p className="text-sm  text-gray-700">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-semibold">Username:</p>
              <p>{user?.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold ">Email:</p>
              <p className='text-gray-700'>{user?.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Joined:</p>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Bio:</p>
              <p>{user?.bio || 'No bio available'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
