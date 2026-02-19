import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Search,
  Filter,
  Calendar,
  Target,
  Code,
  Lightbulb,
  Download,
  Eye,
  TrendingUp,
  Clock,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import { useToast } from '../components/ui/Toast';
import Navigation from '../components/Navigation';
import ideaService from '../services/ideaService';
import { formatDate, capitalizeFirst } from '../utils/helpers';

const SavedIdeasPage = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');
  const [filterSkill, setFilterSkill] = useState('all');

  useEffect(() => {
    // Simulate loading and then load ideas
    const loadTimer = setTimeout(() => {
      try {
        const savedIdeas = ideaService.getSavedIdeas();
        setIdeas(savedIdeas);
        setFilteredIdeas(savedIdeas);
      } catch (err) {
        error('Failed to load saved ideas');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [ideas, searchTerm, filterDomain, filterSkill]);

  const filterIdeas = () => {
    let filtered = ideas;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.problem.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Domain filter
    if (filterDomain !== 'all') {
      filtered = filtered.filter(idea => idea.domain === filterDomain);
    }

    // Skill level filter
    if (filterSkill !== 'all') {
      filtered = filtered.filter(idea => idea.skillLevel === filterSkill);
    }

    setFilteredIdeas(filtered);
  };

  const handleDelete = (ideaId) => {
    if (!confirm('Are you sure you want to delete this idea?')) return;

    try {
      const result = ideaService.deleteIdea(ideaId);
      if (result.success) {
        setIdeas(ideas.filter(idea => idea.id !== ideaId));
        success('Idea deleted successfully');
      } else {
        error(result.error || 'Failed to delete idea');
      }
    } catch (err) {
      error('Failed to delete idea');
    }
  };

  const handleBookmark = (ideaId) => {
    try {
      const result = ideaService.bookmarkIdea(ideaId);
      if (result.success) {
        setIdeas(ideas.map(idea =>
          idea.id === ideaId
            ? { ...idea, bookmarked: result.bookmarked }
            : idea
        ));
        success(result.bookmarked ? 'Idea bookmarked' : 'Bookmark removed');
      } else {
        error(result.error || 'Failed to update bookmark');
      }
    } catch (err) {
      error('Failed to update bookmark');
    }
  };

  const handleOpenProject = (ideaId) => {
    navigate(`/project/${ideaId}`);
  };

  const handleExport = () => {
    const exportData = {
      ideas: filteredIdeas,
      exportDate: new Date().toISOString(),
      totalIdeas: filteredIdeas.length
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `project-ideas-${formatDate(new Date(), 'ISO')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'from-green-400 to-emerald-500';
      case 'intermediate': return 'from-blue-400 to-indigo-500';
      case 'advanced': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSkillLevelIcon = (level) => {
    switch (level) {
      case 'beginner': return <Zap className="w-4 h-4" />;
      case 'intermediate': return <TrendingUp className="w-4 h-4" />;
      case 'advanced': return <Users className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'health': return <Target className="w-5 h-5" />;
      case 'fintech': return <TrendingUp className="w-5 h-5" />;
      case 'education': return <Lightbulb className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const domains = ['all', ...ideaService.getDomains()];
  const skillLevels = ['all', ...ideaService.getSkillLevels()];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Loading size="lg" text="Loading saved ideas..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Your Project Idea Library</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Saved Ideas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage and organize your generated project ideas
          </p>
        </Motion.div>

        {/* Search and Filters */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search ideas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    />
                  </div>
                </div>

                {/* Domain Filter */}
                <div className="lg:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={filterDomain}
                      onChange={(e) => setFilterDomain(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none"
                    >
                      {domains.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain === 'all' ? 'All Domains' : capitalizeFirst(domain)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Skill Level Filter */}
                <div className="lg:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={filterSkill}
                      onChange={(e) => setFilterSkill(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none"
                    >
                      {skillLevels.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill === 'all' ? 'All Levels' : capitalizeFirst(skill)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Export Button */}
                <div className="lg:w-auto">
                  <Button
                    onClick={handleExport}
                    variant="secondary"
                    size="lg"
                    className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 rounded-xl px-6"
                  >
                    <Download className="w-5 h-5" />
                    <span className="ml-2">Export</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Motion.div>

        {/* Results Count */}
        {filteredIdeas.length > 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 shadow-lg">
              <span className="text-sm font-medium text-gray-700">
                Showing <span className="font-bold text-indigo-600">{filteredIdeas.length}</span> of <span className="font-bold text-purple-600">{ideas.length}</span> ideas
              </span>
            </div>
          </Motion.div>
        )}

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              {ideas.length === 0 ? 'No saved ideas yet' : 'No ideas match your filters'}
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              {ideas.length === 0 
                ? 'Generate some project ideas to get started!'
                : 'Try adjusting your search or filters'
              }
            </p>
            {ideas.length === 0 && (
              <Button
                onClick={() => navigate('/generate')}
                variant="primary"
                size="lg"
                className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-xl px-8"
              >
                <Lightbulb className="w-6 h-6" />
                <span className="ml-2">Generate Ideas</span>
              </Button>
            )}
          </Motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea, index) => (
              <Motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl h-full hover:shadow-3xl transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl line-clamp-2 mb-3">
                          {idea.title}
                        </CardTitle>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 bg-gradient-to-r ${getSkillLevelColor(idea.skillLevel)} rounded-full text-white text-sm font-medium flex items-center`}>
                            {getSkillLevelIcon(idea.skillLevel)}
                            <span className="ml-2">{capitalizeFirst(idea.skillLevel)}</span>
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full text-white text-sm font-medium flex items-center">
                            {getDomainIcon(idea.domain)}
                            <span className="ml-2">{capitalizeFirst(idea.domain)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleBookmark(idea.id)}
                          className="text-gray-400 hover:text-indigo-600 transition-colors group-hover:scale-110"
                        >
                          {idea.bookmarked ? (
                            <BookmarkCheck className="w-5 h-5 fill-current text-indigo-600" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(idea.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors group-hover:scale-110"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {idea.problem}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2 text-blue-500" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.techStack.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 rounded-lg text-xs font-mono text-indigo-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {idea.techStack.length > 3 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 rounded-lg text-xs font-mono text-indigo-700">
                            +{idea.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(idea.savedAt || idea.createdAt)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                          {idea.features.length} Features
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                          {idea.roadmap.length} Steps
                        </span>
                      </div>
                    </div>

                    {/* Open Project Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => handleOpenProject(idea.id)}
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="shadow-lg backdrop-blur-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-xl"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="ml-2">Open Project</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedIdeasPage;
