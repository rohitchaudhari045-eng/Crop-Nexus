import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import {
  HelpCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  ShieldCheck,
  Send,
  Clock
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const { success } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const faqs = [
    {
      q: 'What is the statutory deadline for intimating crop damage?',
      a: 'Under standard Disaster Relief (SDRF/NDRF) guidelines and PM Fasal Bima norms, crop damage caused by localized natural calamities (hailstorm, flood, inundation, unseasonal rain) must be intimated within 72 hours of the event occurrence to facilitate accurate spot verification.'
    },
    {
      q: 'Does an e-Panchanama generated on Crop Nexus constitute a final compensation sanction?',
      a: 'No. Reports compiled within Crop Nexus are designated as Provisional Draft e-Panchanamas. They are structured for digital administrative appraisal, spot measurement, and witness recording. Final financial disbursement orders are issued separately by the Competent Revenue Authority (District Collector / Tehsildar).'
    },
    {
      q: 'What is the minimum damage threshold required for calamity relief?',
      a: 'As per State Disaster Response Fund (SDRF) norms, input subsidy relief is admissible only when the assessed crop damage is equal to or exceeds 33% of the plot holding.'
    },
    {
      q: 'Can I submit crop damage photos without GPS coordinates?',
      a: 'While photos can be uploaded from any smartphone, inspecting agriculture officers will verify and record official latitude and longitude coordinates during the on-site physical field inspection.'
    },
    {
      q: 'How does the Crop Recovery Advisor generate suggestions?',
      a: 'The recovery advisor matches your crop type and reported damage cause against verified agronomic packages of practices (ICAR / KVK). These provide immediate stabilization guidance for surviving root zones and foliage.'
    }
  ];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      success('Inquiry Submitted', 'Your question has been routed to the District Krishi desk.');
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Help, Guidelines & FAQs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-prose mt-1">
          Get assistance on crop damage reporting timelines, inspection protocols, and e-Panchanama compilation procedures.
        </p>
      </div>

      {/* Emergency Helpline Contacts */}
      <section aria-labelledby="helpline-heading">
        <h2 id="helpline-heading" className="sr-only">Direct Emergency Helplines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Kisan Call Centre</h3>
                <p className="text-xs font-mono font-bold text-emerald-800">1800-180-1551</p>
              </div>
            </div>
            <p className="text-xs text-slate-600">Toll-free agricultural guidance (6 AM - 10 PM)</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">72-Hour Help Desk</h3>
                <p className="text-xs font-mono font-bold text-blue-800">1800-233-4000</p>
              </div>
            </div>
            <p className="text-xs text-slate-600">Immediate intimation assistance for weather loss</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Crop Nexus Helpdesk</h3>
                <p className="text-xs font-semibold text-purple-800 truncate">support@cropnexus.agri</p>
              </div>
            </div>
            <p className="text-xs text-slate-600">Platform assistance and API integration queries</p>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileQuestion className="w-5 h-5 text-emerald-800" /> Frequently Asked Questions
        </h2>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed pt-2 border-t border-slate-100 max-w-prose">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Send className="w-5 h-5 text-emerald-800" /> Submit an Assistance Ticket
        </h2>

        <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="Farmer or Officer Name"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900 placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Contact</label>
              <input
                type="tel"
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900 placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Your Question or Issue</label>
            <textarea
              rows={3}
              value={inquiryMsg}
              onChange={(e) => setInquiryMsg(e.target.value)}
              placeholder="State your claim reference number or describe your difficulty with inspection records..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-900 placeholder:text-slate-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSending}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send Support Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpSupportPage;
