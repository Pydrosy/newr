
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ChatMessage } from '@/types';
import Avatar from '@/components/common/Avatar';

const TherapistHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [patients, setPatients] = useState<User[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<{ patient: User, message: ChatMessage }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      // Mock patients
      setPatients([
        {
          id: 'patient-1',
          name: 'Emily Chen',
          email: 'emily@example.com',
          userType: 'patient',
          profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
        },
        {
          id: 'patient-2',
          name: 'Michael Brown',
          email: 'michael@example.com',
          userType: 'patient',
          profileImage: 'https://randomuser.me/api/portraits/men/54.jpg'
        },
        {
          id: 'patient-3',
          name: 'Jessica Taylor',
          email: 'jessica@example.com',
          userType: 'patient',
          profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
        }
      ]);
      
      // Mock appointments
      setUpcomingAppointments([
        {
          id: 'apt-1',
          patientId: 'patient-1',
          patientName: 'Emily Chen',
          patientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
          date: new Date(Date.now() + 3600000), // 1 hour from now
          duration: 60,
          type: 'video'
        },
        {
          id: 'apt-2',
          patientId: 'patient-2',
          patientName: 'Michael Brown',
          patientImage: 'https://randomuser.me/api/portraits/men/54.jpg',
          date: new Date(Date.now() + 86400000), // 24 hours from now
          duration: 45,
          type: 'chat'
        }
      ]);
      
      // Mock recent messages
      setRecentMessages([
        {
          patient: {
            id: 'patient-1',
            name: 'Emily Chen',
            email: 'emily@example.com',
            userType: 'patient',
            profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
          },
          message: {
            id: 'msg-1',
            senderId: 'patient-1',
            receiverId: currentUser?.id || '',
            content: "Thank you for yesterday's session, it really helped with my anxiety.",
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            read: false
          }
        },
        {
          patient: {
            id: 'patient-3',
            name: 'Jessica Taylor',
            email: 'jessica@example.com',
            userType: 'patient',
            profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
          },
          message: {
            id: 'msg-2',
            senderId: 'patient-3',
            receiverId: currentUser?.id || '',
            content: "I've been practicing the mindfulness exercises. When can we schedule our next session?",
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            read: true
          }
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [currentUser?.id]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${formatTime(date)}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${formatTime(date)}`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    }
  };

  if (loading) {
    return (
      <AppLayout title="Dashboard">
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-16 h-16 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <section>
          <Card className="bg-gradient-to-br from-thrive-purple to-thrive-dark-purple text-white">
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-2">
                Welcome, Dr. {currentUser?.name?.split(' ')[1]}
              </h1>
              <p className="mb-4">
                You have {upcomingAppointments.length} appointments scheduled today
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/profile')}
                className="w-full"
              >
                View Your Schedule
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Appointments */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        src={apt.patientImage}
                        name={apt.patientName}
                        size="md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{apt.patientName}</h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(apt.date)} • {apt.duration} min • {apt.type === 'video' ? 'Video Call' : 'Chat Session'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/chat/${apt.patientId}`)}
                      >
                        {apt.type === 'video' ? 'Join Call' : 'Chat'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          )}
        </section>

        {/* Recent Messages */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/chat')}
            >
              View All
            </button>
          </div>
          
          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((item) => {
                const timeAgo = new Date(item.message.timestamp);
                const minutesAgo = Math.floor((Date.now() - timeAgo.getTime()) / 60000);
                let timeDisplay = '';
                
                if (minutesAgo < 60) {
                  timeDisplay = `${minutesAgo}m ago`;
                } else if (minutesAgo < 1440) {
                  timeDisplay = `${Math.floor(minutesAgo / 60)}h ago`;
                } else {
                  timeDisplay = `${Math.floor(minutesAgo / 1440)}d ago`;
                }
                
                return (
                  <Card 
                    key={item.message.id}
                    className={item.message.read ? '' : 'border-l-4 border-thrive-purple'}
                  >
                    <CardContent 
                      className="p-4 cursor-pointer"
                      onClick={() => navigate(`/chat/${item.patient.id}`)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar 
                          src={item.patient.profileImage}
                          name={item.patient.name}
                          size="sm"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.patient.name}</h3>
                            <span className="text-xs text-gray-500">{timeDisplay}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 pl-11">
                        {item.message.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No recent messages</p>
            </div>
          )}
        </section>

        {/* Your Patients */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Your Patients</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => { /* View all patients */ }}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {patients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={patient.profileImage}
                      name={patient.name}
                      size="md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-xs text-gray-500">
                        Patient since {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date())}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/chat/${patient.id}`)}
                    >
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default TherapistHomeScreen;
