import { useState, useEffect, useCallback } from 'react';
import { BarChart3, Users, PhoneCall, Search, ArrowLeft, ArrowRight, LogOut, Mail, BookOpen, Calendar, MessageSquare, X, Download, Trash2, TrendingUp, Clock, Globe, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';

function getToken() {
  return localStorage.getItem('accessToken');
}

async function api(path, options = {}) {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin?expired=1';
    return;
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl border border-blue-border/40 p-5 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs text-[#64748B] uppercase tracking-wider mb-1">{label}</p>
          <p className="font-heading font-bold text-3xl text-[#0F172A]">{value}</p>
          {sub && <p className="font-body text-xs text-[#94A3B8] mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon size={20} className="text-white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-blue-border/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-primary flex items-center justify-center">
              <BarChart3 size={18} className="text-white" strokeWidth={1.5} />
            </div>
            <h1 className="font-heading font-bold text-lg text-[#0F172A]">Admin Dashboard</h1>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-body font-medium text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <LogOut size={15} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <X size={16} className="text-red-500 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-blue-border/40 p-1 w-fit shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'leads', label: 'New Leads', icon: Users },
            { id: 'contacted', label: 'Contacted', icon: PhoneCall },
          ].map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setError(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-primary text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-blue-light'
              }`}>
              <tab.icon size={15} strokeWidth={1.5} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && <OverviewTab onError={setError} />}
        {activeTab === 'leads' && <LeadsTab onError={setError} />}
        {activeTab === 'contacted' && <ContactedTab onError={setError} />}
      </div>
    </div>
  );
}

function OverviewTab({ onError }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, contactedRes] = await Promise.all([
        api('/api/leads?limit=1&contacted=false'),
        api('/api/contacted?limit=1'),
      ]);
      if (!leadsRes) return;
      const totalLeads = leadsRes?.pagination?.total || 0;
      const totalContacted = contactedRes?.pagination?.total || 0;
      setStats({ totalLeads, totalContacted, conversionRate: totalLeads > 0 ? Math.round((totalContacted / totalLeads) * 100) : 0 });
    } catch (err) {
      onError(`Failed to load stats: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-blue-border/40 p-12 text-center shadow-sm">
        <div className="inline-block w-6 h-6 border-2 border-blue-primary border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-body text-sm text-[#64748B]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Leads" value={stats.totalLeads} sub="All time submissions" color="bg-blue-primary" />
        <StatCard icon={PhoneCall} label="Contacted" value={stats.totalContacted} sub="Followed up" color="bg-emerald-500" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value={`${stats.conversionRate}%`} sub="Contacted / Total" color="bg-violet-500" />
        <StatCard icon={Clock} label="Pending" value={stats.totalLeads - stats.totalContacted} sub="Awaiting follow-up" color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-blue-border/40 p-6 shadow-sm">
        <h2 className="font-heading font-bold text-lg text-[#0F172A] mb-2">Quick Actions</h2>
        <p className="font-body text-sm text-[#64748B] mb-5">Manage your leads and follow-ups from one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'View New Leads', desc: `${stats.totalLeads - stats.totalContacted} pending`, color: 'bg-blue-light text-blue-primary', href: '#leads' },
            { icon: PhoneCall, label: 'Follow Up', desc: `${stats.totalContacted} contacted`, color: 'bg-emerald-50 text-emerald-600', href: '#contacted' },
            { icon: Download, label: 'Export Data', desc: 'Download all leads as CSV', color: 'bg-violet-50 text-violet-600', href: '#export' },
          ].map((item, i) => (
            <div key={i} className={`${item.color} rounded-xl p-4 cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-current/20`}>
              <div className="flex items-center gap-3 mb-2">
                <item.icon size={18} strokeWidth={1.5} />
                <span className="font-body font-semibold text-sm">{item.label}</span>
              </div>
              <p className="font-body text-xs opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadsTab({ onError }) {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ course: '', search: '' });
  const [modalLead, setModalLead] = useState(null);
  const [conversationNotes, setConversationNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    onError('');
    try {
      const params = new URLSearchParams({ page, limit: '20', contacted: 'false' });
      if (filter.course) params.append('course', filter.course);
      if (filter.search) params.append('search', filter.search);
      const data = await api(`/api/leads?${params}`);
      if (data.success) {
        setLeads(data.data);
        setPagination(data.pagination);
      } else {
        onError(data.error || 'Server returned an error');
      }
    } catch (err) {
      onError(`API Error: ${err.message}. Make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  }, [filter, onError]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const openModal = (lead) => {
    setModalLead(lead);
    setConversationNotes('');
    setSaveError('');
    setDeleteConfirm(null);
  };

  const closeModal = () => {
    setModalLead(null);
    setConversationNotes('');
    setSaveError('');
    setDeleteConfirm(null);
  };

  const handleSaveContacted = async () => {
    const notes = conversationNotes.trim();
    if (notes.length < 100) {
      setSaveError(`Conversation notes must be at least 100 characters (${notes.length}/100).`);
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const data = await api('/api/contacted', {
        method: 'POST',
        body: JSON.stringify({ originalLeadId: modalLead._id, conversationNotes: notes }),
      });
      if (data.success) {
        closeModal();
        fetchLeads(pagination.page);
      } else {
        setSaveError(data.error || 'Failed to save');
      }
    } catch (err) {
      setSaveError(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (leadId) => {
    setDeleting(true);
    try {
      await api(`/api/leads/${leadId}`, { method: 'DELETE' });
      closeModal();
      fetchLeads(pagination.page);
    } catch (err) {
      setSaveError(`Delete failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Source', 'Date'];
    const rows = leads.map(l => [l.name, l.email, l.phone || '', l.interestedCourse, l.source || 'website', new Date(l.createdAt).toLocaleDateString()]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const totalLeads = pagination.total;

  return (
    <>
      {!loading && leads.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Leads" value={totalLeads} color="bg-blue-primary" />
          <StatCard icon={PhoneCall} label="Pending" value={totalLeads} color="bg-amber-500" />
          <StatCard icon={BookOpen} label="Courses" value={new Set(leads.map(l => l.interestedCourse)).size} color="bg-violet-500" />
          <StatCard icon={Globe} label="Sources" value={new Set(leads.map(l => l.source || 'website')).size} color="bg-cyan-500" />
        </div>
      )}

      <div className="bg-white rounded-xl border border-blue-border/40 p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" strokeWidth={1.5} />
            <input type="text" value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-9 pr-3 py-2.5 border border-blue-border rounded-lg text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all"
            />
          </div>
          <div className="w-full sm:w-44">
            <select value={filter.course}
              onChange={(e) => setFilter({ ...filter, course: e.target.value })}
              className="w-full px-3 py-2.5 border border-blue-border rounded-lg text-sm font-body text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all bg-white appearance-none cursor-pointer">
              <option value="">All Courses</option>
              {['B.Tech / Engineering','MBBS / Medicine','MBA / Business','B.A. / Arts & Humanities','B.Sc. / Science','LLB / Law','BCA / Computer Applications','Other / Not Sure Yet'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => fetchLeads(1)}
              className="px-5 py-2.5 bg-blue-primary text-white font-body font-semibold text-sm rounded-lg hover:bg-blue-dark transition-all shadow-sm flex items-center gap-2">
              <Filter size={14} strokeWidth={1.5} />
              Search
            </button>
            <button onClick={handleExport} disabled={leads.length === 0}
              className="px-4 py-2.5 border border-blue-border text-[#64748B] font-body font-semibold text-sm rounded-lg hover:bg-blue-light hover:text-blue-primary transition-all disabled:opacity-40 flex items-center gap-2">
              <Download size={14} strokeWidth={1.5} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-border/40 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-6 h-6 border-2 border-blue-primary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="font-body text-sm text-[#64748B]">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-light flex items-center justify-center mx-auto mb-3">
              <Users size={20} className="text-blue-primary" strokeWidth={1.5} />
            </div>
            <p className="font-body text-sm text-[#64748B]">No new leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-border/40 bg-[#F8FAFC]">
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Course</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3.5 text-center font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-border/20">
                {leads.map((lead) => (
                  <tr key={lead._id}
                    className="hover:bg-blue-light/50 transition-colors cursor-pointer"
                    onClick={() => openModal(lead)}>
                    <td className="px-4 py-3.5">
                      <span className="font-body font-medium text-[#0F172A]">{lead.name}</span>
                    </td>
                    <td className="px-4 py-3.5 font-body text-[#64748B] hidden sm:table-cell">{lead.email}</td>
                    <td className="px-4 py-3.5 font-body text-[#64748B] hidden md:table-cell">{lead.phone || '—'}</td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="font-body text-xs text-blue-primary bg-blue-light px-2.5 py-1 rounded-full">{lead.interestedCourse}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="font-body text-xs text-[#64748B] flex items-center gap-1">
                        <Globe size={11} strokeWidth={1.5} />
                        {lead.source || 'website'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-body text-xs text-[#64748B] hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} strokeWidth={1.5} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-blue-border/20 bg-[#F8FAFC]">
            <span className="font-body text-xs text-[#64748B]">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => fetchLeads(pagination.page - 1)} disabled={pagination.page <= 1}
                className="p-2 rounded-lg text-[#64748B] hover:bg-blue-light hover:text-blue-primary disabled:opacity-30 transition-all">
                <ArrowLeft size={15} strokeWidth={1.5} />
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter(p => Math.abs(p - pagination.page) <= 2 || p === 1 || p === pagination.pages)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-[#94A3B8] text-xs">...</span>}
                    <button onClick={() => fetchLeads(p)}
                      className={`min-w-[32px] h-8 rounded-lg text-xs font-body font-semibold transition-all ${
                        p === pagination.page ? 'bg-blue-primary text-white shadow-sm' : 'text-[#64748B] hover:bg-blue-light'
                      }`}>{p}</button>
                  </span>
                ))}
              <button onClick={() => fetchLeads(pagination.page + 1)} disabled={pagination.page >= pagination.pages}
                className="p-2 rounded-lg text-[#64748B] hover:bg-blue-light hover:text-blue-primary disabled:opacity-30 transition-all">
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      {modalLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-blue-border/40" onClick={e => e.stopPropagation()}>
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-light flex items-center justify-center">
                    <Users size={16} className="text-blue-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-[#0F172A]">Lead Details</h2>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#64748B] hover:text-[#0F172A] transition-all">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-3 mb-6 pb-5 border-b border-blue-border/20">
                {[
                  { icon: Users, label: 'Name', value: modalLead.name },
                  { icon: Mail, label: 'Email', value: modalLead.email },
                  { icon: PhoneCall, label: 'Phone', value: modalLead.phone || 'Not provided' },
                  { icon: BookOpen, label: 'Course', value: modalLead.interestedCourse },
                  { icon: Globe, label: 'Source', value: modalLead.source || 'Website chatbot' },
                  { icon: Calendar, label: 'Date', value: new Date(modalLead.createdAt).toLocaleString() },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-light flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={13} className="text-blue-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-body text-xs text-[#64748B] uppercase tracking-wider">{item.label}</p>
                      <p className="font-body text-sm text-[#0F172A] font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 font-body text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  <MessageSquare size={13} strokeWidth={1.5} className="text-blue-primary" />
                  Conversation Notes <span className="text-red-400 normal-case">*</span>
                </label>
                <textarea value={conversationNotes} onChange={e => setConversationNotes(e.target.value)}
                  placeholder="Describe your conversation with this lead..."
                  className="w-full px-3 py-2.5 border border-blue-border rounded-lg text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all min-h-[110px] resize-y"
                  maxLength={5000} />
                <div className="flex justify-between mt-1.5">
                  <span className={`text-xs font-body ${conversationNotes.length >= 100 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {conversationNotes.length}/100 minimum
                  </span>
                  <span className="text-xs font-body text-[#94A3B8]">{conversationNotes.length}/5000</span>
                </div>
              </div>

              {saveError && (
                <div className="text-red-600 font-body text-sm mb-3 bg-red-50 px-3 py-2.5 rounded-lg border border-red-200 flex items-center gap-2">
                  <X size={14} className="text-red-500 shrink-0" />
                  {saveError}
                </div>
              )}
            </div>

            <div className="px-6 pb-6 space-y-2">
              <button onClick={handleSaveContacted} disabled={saving}
                className="w-full bg-blue-primary text-white font-body font-semibold py-3 rounded-xl hover:bg-blue-dark transition-all disabled:opacity-50 shadow-sm flex items-center justify-center gap-2">
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <><PhoneCall size={16} strokeWidth={1.5} /> Save &amp; Move to Contacted</>
                )}
              </button>

              {deleteConfirm === modalLead._id ? (
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(modalLead._id)} disabled={deleting}
                    className="flex-1 bg-red-600 text-white font-body font-semibold py-2.5 rounded-xl hover:bg-red-700 transition-all text-sm disabled:opacity-50">
                    {deleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button onClick={() => setDeleteConfirm(null)}
                    className="flex-1 border border-blue-border text-[#64748B] font-body font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(modalLead._id)}
                  className="w-full border border-red-200 text-red-500 font-body font-medium py-2.5 rounded-xl hover:bg-red-50 transition-all text-sm flex items-center justify-center gap-2">
                  <Trash2 size={14} strokeWidth={1.5} />
                  Delete Lead
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactedTab({ onError }) {
  const [contacted, setContacted] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ course: '', search: '' });
  const [expandedId, setExpandedId] = useState(null);

  const fetchContacted = useCallback(async (page = 1) => {
    setLoading(true);
    onError('');
    try {
      const params = new URLSearchParams({ page, limit: '20' });
      if (filter.course) params.append('course', filter.course);
      if (filter.search) params.append('search', filter.search);
      const data = await api(`/api/contacted?${params}`);
      if (data.success) {
        setContacted(data.data);
        setPagination(data.pagination);
      } else {
        onError(data.error || 'Server error');
      }
    } catch (err) {
      onError(`API Error: ${err.message}. Make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  }, [filter, onError]);

  useEffect(() => { fetchContacted(); }, [fetchContacted]);

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Conversation Notes', 'Date'];
    const rows = contacted.map(l => [l.name, l.email, l.phone || '', l.interestedCourse, l.conversationNotes || '', new Date(l.createdAt).toLocaleDateString()]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `contacted-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-blue-border/40 p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" strokeWidth={1.5} />
            <input type="text" value={filter.search} onChange={e => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2.5 border border-blue-border rounded-lg text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all" />
          </div>
          <div className="w-full sm:w-44">
            <select value={filter.course} onChange={e => setFilter({ ...filter, course: e.target.value })}
              className="w-full px-3 py-2.5 border border-blue-border rounded-lg text-sm font-body text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all bg-white appearance-none cursor-pointer">
              <option value="">All Courses</option>
              {['B.Tech / Engineering','MBBS / Medicine','MBA / Business','B.A. / Arts & Humanities','B.Sc. / Science','LLB / Law','BCA / Computer Applications','Other / Not Sure Yet'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => fetchContacted(1)}
              className="px-5 py-2.5 bg-blue-primary text-white font-body font-semibold text-sm rounded-lg hover:bg-blue-dark transition-all shadow-sm flex items-center gap-2">
              <Filter size={14} strokeWidth={1.5} />
              Search
            </button>
            <button onClick={handleExport} disabled={contacted.length === 0}
              className="px-4 py-2.5 border border-blue-border text-[#64748B] font-body font-semibold text-sm rounded-lg hover:bg-blue-light hover:text-blue-primary transition-all disabled:opacity-40 flex items-center gap-2">
              <Download size={14} strokeWidth={1.5} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-border/40 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-6 h-6 border-2 border-blue-primary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="font-body text-sm text-[#64748B]">Loading contacted leads...</p>
          </div>
        ) : contacted.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-light flex items-center justify-center mx-auto mb-3">
              <PhoneCall size={20} className="text-blue-primary" strokeWidth={1.5} />
            </div>
            <p className="font-body text-sm text-[#64748B]">No contacted leads yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-border/40 bg-[#F8FAFC]">
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Course</th>
                  <th className="px-4 py-3.5 text-left font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Contacted On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-border/20">
                {contacted.map(item => (
                  <tr key={item._id}
                    className="hover:bg-blue-light/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}>
                    <td className="px-4 py-3.5">
                      <span className="font-body font-medium text-[#0F172A]">{item.name}</span>
                    </td>
                    <td className="px-4 py-3.5 font-body text-[#64748B] hidden sm:table-cell">{item.email}</td>
                    <td className="px-4 py-3.5 font-body text-[#64748B] hidden md:table-cell">{item.phone || '—'}</td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="font-body text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">{item.interestedCourse}</span>
                    </td>
                    <td className="px-4 py-3.5 font-body text-xs text-[#64748B] hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} strokeWidth={1.5} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {expandedId && (() => {
          const item = contacted.find(c => c._id === expandedId);
          if (!item) return null;
          return (
            <div className="border-t border-blue-border/20 bg-[#F8FAFC] px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MessageSquare size={13} className="text-emerald-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-body text-xs font-semibold text-[#64748B] uppercase tracking-wider">Conversation Notes</h3>
              </div>
              <p className="font-body text-sm text-[#0F172A] leading-relaxed whitespace-pre-wrap pl-9">{item.conversationNotes}</p>
              <p className="font-body text-xs text-[#94A3B8] mt-3 pl-9">Contacted on {new Date(item.createdAt).toLocaleString()}</p>
            </div>
          );
        })()}

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-blue-border/20 bg-[#F8FAFC]">
            <span className="font-body text-xs text-[#64748B]">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => fetchContacted(pagination.page - 1)} disabled={pagination.page <= 1}
                className="p-2 rounded-lg text-[#64748B] hover:bg-blue-light hover:text-blue-primary disabled:opacity-30 transition-all">
                <ArrowLeft size={15} strokeWidth={1.5} />
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter(p => Math.abs(p - pagination.page) <= 2 || p === 1 || p === pagination.pages)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-[#94A3B8] text-xs">...</span>}
                    <button onClick={() => fetchContacted(p)}
                      className={`min-w-[32px] h-8 rounded-lg text-xs font-body font-semibold transition-all ${
                        p === pagination.page ? 'bg-blue-primary text-white shadow-sm' : 'text-[#64748B] hover:bg-blue-light'
                      }`}>{p}</button>
                  </span>
                ))}
              <button onClick={() => fetchContacted(pagination.page + 1)} disabled={pagination.page >= pagination.pages}
                className="p-2 rounded-lg text-[#64748B] hover:bg-blue-light hover:text-blue-primary disabled:opacity-30 transition-all">
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
