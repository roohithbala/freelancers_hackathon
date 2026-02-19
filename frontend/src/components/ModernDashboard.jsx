import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  Home,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Rocket,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Star,
  Plus,
  Search,
  Bell,
  ChevronRight,
  BarChart3,
  FolderOpen,
  Calendar,
  Archive
} from 'lucide-react';

const ModernDashboard = ({ onLogout, onOpenGenerator }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'archive', label: 'Archive', icon: <Archive className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const recentProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'In Progress', progress: 75, lastModified: '2 hours ago' },
    { id: 2, name: 'Mobile Banking App', status: 'Completed', progress: 100, lastModified: '1 day ago' },
    { id: 3, name: 'Healthcare System', status: 'In Progress', progress: 45, lastModified: '3 days ago' },
    { id: 4, name: 'Social Media Dashboard', status: 'Planning', progress: 20, lastModified: '1 week ago' },
  ];

  const stats = [
    { label: 'Total Projects', value: '24', change: '+12%', icon: <FileText className="w-6 h-6" />, color: 'blue' },
    { label: 'Completed', value: '18', change: '+8%', icon: <Star className="w-6 h-6" />, color: 'green' },
    { label: 'In Progress', value: '6', change: '+3%', icon: <Clock className="w-6 h-6" />, color: 'yellow' },
    { label: 'Team Members', value: '12', change: '+2', icon: <Users className="w-6 h-6" />, color: 'purple' },
  ];

  const quickActions = [
    { id: 1, label: 'New Project', icon: <Plus className="w-5 h-5" />, color: 'blue', action: onOpenGenerator },
    { id: 2, label: 'Import Blueprint', icon: <FolderOpen className="w-5 h-5" />, color: 'green' },
    { id: 3, label: 'View Templates', icon: <FileText className="w-5 h-5" />, color: 'purple' },
    { id: 4, label: 'Team Settings', icon: <Users className="w-5 h-5" />, color: 'orange' },
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colors[color] || colors.blue;
  };

  const getBgColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/30',
      green: 'bg-green-500/10 border-green-500/30',
      yellow: 'bg-yellow-500/10 border-yellow-500/30',
      purple: 'bg-purple-500/10 border-purple-500/30',
      orange: 'bg-orange-500/10 border-orange-500/30',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Sidebar */}
      <Motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700 fixed h-full z-30"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AI Architect</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30'
                    : 'hover:bg-slate-700/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </Motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Navigation */}
        <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-20">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-2xl font-bold capitalize">{activeSection}</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                <span className="text-sm">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeSection === 'overview' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${getBgColorClass(stat.color)} rounded-xl flex items-center justify-center`}>
                        {stat.icon}
                      </div>
                      <span className="text-sm text-green-400">{stat.change}</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`bg-gradient-to-r ${getColorClass(action.color)} p-4 rounded-xl hover:scale-105 transition-transform flex items-center space-x-3`}
                    >
                      {action.icon}
                      <span className="font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Projects</h2>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
                  {recentProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors ${
                        index !== recentProjects.length - 1 ? 'border-b border-slate-700' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <div className="font-medium mb-1">{project.name}</div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{project.status}</span>
                          <span>•</span>
                          <span>{project.lastModified}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          )}

          {activeSection === 'projects' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Projects Section</h2>
              <p className="text-gray-400">Manage all your projects here</p>
            </Motion.div>
          )}

          {activeSection === 'analytics' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Analytics Section</h2>
              <p className="text-gray-400">View detailed analytics and insights</p>
            </Motion.div>
          )}

          {activeSection === 'settings' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Settings Section</h2>
              <p className="text-gray-400">Configure your account and preferences</p>
            </Motion.div>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onOpenGenerator}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-20"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ModernDashboard;
