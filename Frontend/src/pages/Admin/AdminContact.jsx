import React, { useState, useEffect } from 'react';
import { Trash2, MailOpen, Mail, User, Phone, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { CONTACT_API } from '../../utils/api';

export default function AdminContact() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(CONTACT_API);
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch contact leads', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'new' : 'read';
    
    try {
      await axiosInstance.put(`${CONTACT_API}/${id}/status`, { status: newStatus });
      setLeads(prevLeads => prevLeads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;
    
    try {
      await axiosInstance.delete(`${CONTACT_API}/${id}`);
      setLeads(prevLeads => prevLeads.filter(lead => lead._id !== id));
    } catch (error) {
      console.error('Failed to delete lead', error);
      alert('Failed to delete lead');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
          <p className="text-gray-500 mt-1">Manage inquiries submitted through the public Contact Us page.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold shadow-sm border border-blue-100 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {leads.filter(l => l.status === 'new').length} New Messages
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          <MailOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium">No contact leads found.</p>
          <p className="text-sm mt-1">When customers submit the contact form, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {leads.map((lead) => (
            <div 
              key={lead._id} 
              className={`bg-white rounded-xl shadow-sm border ${lead.status === 'new' ? 'border-l-4 border-l-blue-600 border-t-gray-200 border-r-gray-200 border-b-gray-200' : 'border-gray-200'} overflow-hidden transition-all hover:shadow-md`}
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${lead.status === 'new' ? 'bg-blue-600 shadow-md' : 'bg-gray-400'}`}>
                    {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                      {lead.firstName} {lead.lastName}
                      {lead.status === 'new' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">New</span>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">{lead.email}</a></span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">{lead.phone}</a></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <div className="text-right mr-4 text-xs text-gray-500 hidden md:block">
                    <div className="flex items-center justify-end gap-1.5 mb-1"><Calendar className="w-3 h-3" /> {formatDate(lead.createdAt)}</div>
                    <div className="flex items-center justify-end gap-1.5"><Clock className="w-3 h-3" /> {formatTime(lead.createdAt)}</div>
                  </div>
                  
                  <button 
                    onClick={() => handleToggleStatus(lead._id, lead.status)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                    title={lead.status === 'new' ? "Mark as Read" : "Mark as Unread"}
                  >
                    {lead.status === 'new' ? (
                      <><CheckCircle className="w-4 h-4" /> Mark Read</>
                    ) : (
                      <><Mail className="w-4 h-4" /> Mark Unread</>
                    )}
                  </button>
                  <button 
                    onClick={() => handleDelete(lead._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
              
              {/* Message Body */}
              <div className="p-5">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 relative">
                  <div className="absolute top-0 left-4 -mt-2.5 bg-gray-50 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</div>
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {lead.message}
                  </p>
                </div>
                
                {/* Mobile Date display */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 md:hidden">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(lead.createdAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatTime(lead.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
