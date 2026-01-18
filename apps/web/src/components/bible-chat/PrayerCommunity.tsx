import { useState, useEffect } from 'react';

interface PrayerRequest {
  id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  createdAt: string;
  prayedFor: number;
  isAnswered: boolean;
  answeredAt?: string;
  category: 'healing' | 'guidance' | 'provision' | 'protection' | 'thanksgiving' | 'other';
  comments?: PrayerComment[];
}

interface PrayerComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PrayerCommunityProps {
  className?: string;
}

const categories = {
  healing: { label: 'Healing', emoji: '🏥', color: 'bg-red-100 text-red-700 border-red-200' },
  guidance: { label: 'Guidance', emoji: '🧭', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  provision: { label: 'Provision', emoji: '💰', color: 'bg-green-100 text-green-700 border-green-200' },
  protection: { label: 'Protection', emoji: '🛡️', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  thanksgiving: { label: 'Thanksgiving', emoji: '🙏', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  other: { label: 'Other', emoji: '💬', color: 'bg-gray-100 text-gray-700 border-gray-200' }
};

export default function PrayerCommunity({ className = '' }: PrayerCommunityProps) {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    content: '',
    isAnonymous: false,
    category: 'other' as PrayerRequest['category']
  });

  // Comment form
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadRequests();
    loadUserName();
  }, []);

  const loadRequests = () => {
    const saved = localStorage.getItem('prayer_requests');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sort by date descending
      parsed.sort((a: PrayerRequest, b: PrayerRequest) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRequests(parsed);
    }
  };

  const loadUserName = () => {
    const name = localStorage.getItem('user_name') || 'Friend';
    setUserName(name);
  };

  const handleSubmitRequest = () => {
    if (!formData.content.trim()) {
      alert('Please enter your prayer request.');
      return;
    }

    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      content: formData.content.trim(),
      author: formData.isAnonymous ? 'Anonymous' : userName,
      isAnonymous: formData.isAnonymous,
      createdAt: new Date().toISOString(),
      prayedFor: 0,
      isAnswered: false,
      category: formData.category,
      comments: []
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem('prayer_requests', JSON.stringify(updatedRequests));

    // Reset form
    setFormData({
      content: '',
      isAnonymous: false,
      category: 'other'
    });
    setShowNewRequest(false);
  };

  const handlePrayFor = (requestId: string) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId
        ? { ...req, prayedFor: req.prayedFor + 1 }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('prayer_requests', JSON.stringify(updatedRequests));
  };

  const handleMarkAnswered = (requestId: string) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId
        ? {
            ...req,
            isAnswered: !req.isAnswered,
            answeredAt: !req.isAnswered ? new Date().toISOString() : undefined
          }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('prayer_requests', JSON.stringify(updatedRequests));
  };

  const handleAddComment = (requestId: string) => {
    if (!commentText.trim()) return;

    const newComment: PrayerComment = {
      id: Date.now().toString(),
      content: commentText.trim(),
      author: userName,
      createdAt: new Date().toISOString()
    };

    const updatedRequests = requests.map(req =>
      req.id === requestId
        ? {
            ...req,
            comments: [...(req.comments || []), newComment]
          }
        : req
    );

    setRequests(updatedRequests);
    localStorage.setItem('prayer_requests', JSON.stringify(updatedRequests));
    setCommentText('');
  };

  const handleDeleteRequest = (requestId: string) => {
    if (confirm('Are you sure you want to delete this prayer request?')) {
      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);
      localStorage.setItem('prayer_requests', JSON.stringify(updatedRequests));
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(null);
      }
    }
  };

  const filteredRequests = selectedCategory
    ? requests.filter(req => req.category === selectedCategory)
    : requests;

  // New request form
  if (showNewRequest) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
          <button
            onClick={() => setShowNewRequest(false)}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Community</span>
          </button>
          <h2 className="text-2xl font-bold font-playfair">Share a Prayer Request</h2>
          <p className="text-purple-100 text-sm mt-1">Let others pray for you</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-geist">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(categories) as [PrayerRequest['category'], typeof categories[keyof typeof categories]][]).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: key })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.category === key
                      ? `${value.color} border-current`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{value.emoji}</span>
                  <span className="text-xs font-medium block mt-1">{value.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              Your Prayer Request
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share what's on your heart... How can we pray for you?"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-geist resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Your request will be visible to the community</p>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Post anonymously
            </label>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmitRequest}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
          >
            Share Prayer Request
          </button>
        </div>
      </div>
    );
  }

  // Single request detail view
  if (selectedRequest) {
    const category = categories[selectedRequest.category];
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
          <button
            onClick={() => setSelectedRequest(null)}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Requests</span>
          </button>
          <h2 className="text-xl font-bold font-playfair">Prayer Request</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Request */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {selectedRequest.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{selectedRequest.author}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${category.color}`}>
                    {category.emoji} {category.label}
                  </span>
                  {selectedRequest.isAnswered && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                      ✓ Answered
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(selectedRequest.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-gray-700 leading-relaxed font-geist font-light">
                  {selectedRequest.content}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePrayFor(selectedRequest.id)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>🙏</span>
              I'm Praying ({selectedRequest.prayedFor})
            </button>
            <button
              onClick={() => handleMarkAnswered(selectedRequest.id)}
              className={`px-4 py-3 rounded-xl font-semibold font-geist transition-all ${
                selectedRequest.isAnswered
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {selectedRequest.isAnswered ? 'Unmark' : '✓ Answered'}
            </button>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 font-geist">
              Words of Encouragement ({selectedRequest.comments?.length || 0})
            </h3>
            {selectedRequest.comments && selectedRequest.comments.length > 0 ? (
              <div className="space-y-3 mb-4">
                {selectedRequest.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-geist font-light">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4 text-center py-4">
                No comments yet. Be the first to share words of encouragement!
              </p>
            )}

            {/* Add Comment */}
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share a word of encouragement..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-sm font-geist"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(selectedRequest.id);
                  }
                }}
              />
              <button
                onClick={() => handleAddComment(selectedRequest.id)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                Post
              </button>
            </div>
          </div>

          {/* Delete */}
          {!selectedRequest.isAnonymous && selectedRequest.author === userName && (
            <button
              onClick={() => handleDeleteRequest(selectedRequest.id)}
              className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-200"
            >
              Delete My Request
            </button>
          )}
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🙏</span>
            <div>
              <h2 className="text-2xl font-bold font-playfair">Prayer Community</h2>
              <p className="text-purple-100 text-sm">Pray for one another</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{requests.length}</div>
            <div className="text-xs text-purple-100">Requests</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {requests.reduce((sum, req) => sum + req.prayedFor, 0)}
            </div>
            <div className="text-xs text-purple-100">Prayers</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {requests.filter(req => req.isAnswered).length}
            </div>
            <div className="text-xs text-purple-100">Answered</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-b border-gray-200 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all font-medium text-sm whitespace-nowrap"
        >
          <span>✨</span> New Request
        </button>
        {(Object.entries(categories) as [PrayerRequest['category'], typeof categories[keyof typeof categories]][]).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              selectedCategory === key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{value.emoji}</span>
            {value.label}
          </button>
        ))}
      </div>

      {/* Requests */}
      {filteredRequests.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prayer Requests</h3>
          <p className="text-gray-600 text-sm font-geist font-light mb-6">
            Be the first to share a prayer request with the community.
          </p>
          <button
            onClick={() => setShowNewRequest(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
          >
            Share a Request
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
          {filteredRequests.map((request) => {
            const category = categories[request.category];
            return (
              <button
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {request.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-gray-900 truncate font-geist group-hover:text-purple-700">
                        {request.author}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${category.color}`}>
                        {category.emoji} {category.label}
                      </span>
                      {request.isAnswered && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                          ✓ Answered
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 font-geist font-light">
                      {request.content}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        🙏 {request.prayedFor} praying
                      </span>
                      {request.comments && request.comments.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{request.comments.length} comments</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
