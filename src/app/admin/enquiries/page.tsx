"use client";

import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

export default function EnquiriesPage() {
  const [enquiries] = useState([
    { id: "ENQ-001", parent: "Sarah Connor", childAge: "5", grade: "Kindergarten", status: "New", date: "Oct 24, 2026", type: "Admission" },
    { id: "ENQ-002", parent: "Michael Smith", childAge: "12", grade: "Grade 7", status: "Contacted", date: "Oct 23, 2026", type: "Campus Tour" },
    { id: "ENQ-003", parent: "David & Emma Reed", childAge: "15", grade: "Grade 10", status: "Tour Scheduled", date: "Oct 21, 2026", type: "Admission" },
    { id: "ENQ-004", parent: "Lisa Wong", childAge: "8", grade: "Grade 3", status: "Enrolled", date: "Oct 15, 2026", type: "Admission" },
    { id: "ENQ-005", parent: "James T. Kirk", childAge: "16", grade: "Grade 11", status: "New", date: "Oct 25, 2026", type: "Contact Form" },
  ]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'New': return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">New</span>;
      case 'Contacted': return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Contacted</span>;
      case 'Tour Scheduled': return <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Tour Scheduled</span>;
      case 'Enrolled': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Enrolled</span>;
      default: return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">{status}</span>;
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Enquiries CRM</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          Export Data
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by parent name or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Parent Name</th>
                <th className="px-6 py-4">Requested Grade</th>
                <th className="px-6 py-4">Enquiry Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-slate-800">{enq.id}</td>
                  <td className="px-6 py-4">{enq.parent}</td>
                  <td className="px-6 py-4">{enq.grade} <span className="text-xs text-slate-400 ml-1">(Age {enq.childAge})</span></td>
                  <td className="px-6 py-4">{enq.type}</td>
                  <td className="px-6 py-4">{enq.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(enq.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500 bg-slate-50">
          <span>Showing 1 to 5 of 24 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}
