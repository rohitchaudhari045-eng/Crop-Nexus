import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationsApi } from '@/services/apiService';
import { NotificationItem } from '@/types';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDateTime } from '@/utils/formatters';
import {
  Bell,
  CheckCircle2,
  ExternalLink,
  CloudRain,
  ShieldCheck,
  Activity,
  FileText
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await notificationsApi.getAll();
      setNotifications(data);
    };
    fetchNotifs();
  }, []);

  const handleMarkAll = async () => {
    await notificationsApi.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkOne = async (id: string) => {
    await notificationsApi.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'weather') return n.type === 'weather_alert';
    if (filter === 'claims') return n.type === 'claim_update' || n.type === 'inspection';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'weather_alert':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'inspection':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'recovery':
        return <Activity className="w-5 h-5 text-amber-600" />;
      case 'claim_update':
      default:
        return <FileText className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Notification Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Alerts & System Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time notifications regarding field visits, draft panchanamas, and weather advisories.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={handleMarkAll} leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-700" />}>
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'unread', label: 'Unread Only' },
          { id: 'claims', label: 'Claims & Inspections' },
          { id: 'weather', label: 'Weather Warnings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
              filter === tab.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="You are completely caught up with your agricultural alerts."
        />
      ) : (
        <div className="space-y-3">
          <h2 className="sr-only">Notification Feed</h2>
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkOne(item.id)}
              className={`p-4 rounded-2xl border transition-all duration-150 flex items-start gap-4 cursor-pointer ${
                item.read ? 'bg-white border-slate-200/80 shadow-xs' : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className={`font-bold text-sm ${item.read ? 'text-slate-900' : 'text-emerald-950 font-extrabold'}`}>
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatDateTime(item.createdAt)}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed">{item.message}</p>

                {item.actionUrl && (
                  <div className="pt-2">
                    <Link
                      to={item.actionUrl}
                      className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 text-xs"
                    >
                      View Associated Record <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
