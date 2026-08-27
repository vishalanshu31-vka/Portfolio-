import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Trophy,
  Check,
  Copy,
  Printer,
  FileCheck2,
  Terminal,
  FileText,
  User,
  Sparkles,
  QrCode,
  Layers,
} from 'lucide-react';
import { CertificateItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [viewMode, setViewMode] = useState<'document' | 'cyber'>('document');
  const [copied, setCopied] = useState<boolean>(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  // Determine credential styling flavor
  const isMongo = certificate.organization.includes('MongoDB');
  const is3Skill = certificate.organization.includes('3Skill');
  const isIamNeo = certificate.organization.includes('iamNeo');
  const isInfosys = certificate.organization.includes('Infosys');
  const isCisco = certificate.organization.includes('Cisco');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col bg-black border border-white/15 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header Controls HUD */}
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0a0a0f] gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600/20 border border-red-600/50 text-red-500 rounded">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight flex items-center gap-2">
                  VERIFIED CREDENTIAL // {certificate.badgeCode}
                </h3>
                <p className="font-mono text-[11px] text-red-400 font-bold uppercase tracking-wider">
                  ISSUER: {certificate.organization} • {certificate.issueDate}
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/5 p-1 border border-white/10 rounded font-mono text-xs">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('document');
                }}
                className={`px-3 py-1.5 rounded transition-all font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'document'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL CERTIFICATE</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('cyber');
                }}
                className={`px-3 py-1.5 rounded transition-all font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'cyber'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>TELEMETRY VIEW</span>
              </button>
            </div>

            {/* Right Tools */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyId}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer uppercase tracking-wider"
                title="Copy Credential ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED ID' : 'COPY ID'}</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                }}
                className="p-1.5 rounded bg-white/5 hover:bg-red-950/60 text-white/60 hover:text-white border border-white/10 hover:border-red-600/50 transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#0b0b10] flex justify-center items-start">
            {viewMode === 'document' ? (
              /* ================================================================= */
              /* AUTHENTIC OFFICIAL CERTIFICATE RENDERING (1:1 ACCURATE REPLICAS)   */
              /* ================================================================= */
              <div className="w-full max-w-3xl space-y-6">
                {/* 1. MONGODB PROOF OF COMPLETION & SKILL BADGES */}
                {isMongo && (
                  <div className="bg-white text-slate-900 border-4 border-[#00684A]/30 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
                    {/* Top Leaf Accent */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-2xl sm:text-3xl font-serif text-[#00684A] font-light block">
                          Proof of Completion
                        </span>
                        <p className="text-xs text-slate-500 font-sans mt-3">Congratulations to</p>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans mt-0.5">
                          Vishal Anshu
                        </h2>
                        <p className="text-xs text-slate-500 font-sans mt-4">For successfully completing</p>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-0.5 max-w-md">
                          {certificate.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-4 font-mono font-medium">
                          On {certificate.issueDate}
                        </p>
                      </div>

                      {/* MongoDB Skill Badge Graphic */}
                      <div className="w-48 sm:w-56 bg-[#001e2b] text-white rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between border-2 border-[#00ed64]/40 shadow-xl shrink-0">
                        <div className="w-full flex items-center justify-between text-xs font-mono text-[#00ed64]">
                          <span className="font-bold tracking-wider">MongoDB Skill</span>
                          <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                        </div>

                        <div className="my-4 w-full bg-[#c5fcb4] text-[#001e2b] rounded-xl p-3 sm:p-4 text-center shadow-inner flex flex-col items-center justify-center">
                          <p className="font-bold text-xs sm:text-sm leading-tight uppercase font-display">
                            {certificate.title.replace('Building ', '').replace('with MongoDB', '')}
                          </p>
                          <div className="w-10 h-10 rounded-full bg-[#00ed64] text-[#001e2b] flex items-center justify-center mt-3 shadow-md">
                            <Trophy className="w-5 h-5 text-emerald-950" />
                          </div>
                        </div>

                        <span className="text-[10px] text-white/60 font-mono">VERIFIED CREDLY BADGE</span>
                      </div>
                    </div>

                    {/* Bottom Signature & Verification Bar */}
                    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <div className="font-serif italic text-lg text-slate-800 font-bold border-b border-slate-400 pb-0.5 inline-block">
                          Raghu Viswanathan
                        </div>
                        <div className="text-[11px] text-slate-600 font-sans font-medium">Raghu Viswanathan</div>
                        <div className="text-[10px] text-slate-500 font-sans">
                          VP, Education, Academia, and Documentation
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans">MongoDB, Inc.</div>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-[#00684A] font-bold text-lg">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#00ed64] inline-block" />
                          <span>MongoDB</span>
                        </div>
                        {certificate.credentialUrl && (
                          <a
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-blue-600 hover:underline font-mono mt-1 break-all max-w-xs block text-right"
                          >
                            {certificate.credentialUrl}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. 3SKILL TRAINING INTERNSHIP & PERFORMANCE REPORT */}
                {is3Skill && (
                  <div className="space-y-4">
                    {/* Main Certificate Card */}
                    <div className="bg-white text-slate-900 border-4 border-indigo-900/20 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow">
                            3S
                          </div>
                          <div>
                            <div className="font-black text-sm tracking-tight text-indigo-950 uppercase font-display">
                              3 SKILL
                            </div>
                            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                              LEARN•GROW•SUCCEED
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="px-2.5 py-1 bg-green-50 border border-green-300 text-green-800 text-[10px] font-mono font-bold uppercase rounded">
                            VERIFIED INTERNSHIP
                          </span>
                        </div>
                      </div>

                      <div className="my-6">
                        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 uppercase font-display tracking-tight">
                          Internship Completion Certificate
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 font-mono uppercase">Awarded to</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">
                          Vishal Kumar Anshu
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed max-w-2xl font-sans">
                          This certificate confirms the successful completion of <strong>2 Month Internship in AIML</strong> at 3Skill Training. The program emphasized practical skills, project-based learning, and professional development aligned with industry expectations.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Final Exam</span>
                          <span className="text-base font-black text-indigo-950">96 / 100</span>
                          <span className="text-[10px] text-green-600 block font-bold">96%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Project Mark</span>
                          <span className="text-base font-black text-indigo-950">43 / 50</span>
                          <span className="text-[10px] text-green-600 block font-bold">86%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Total Score</span>
                          <span className="text-base font-black text-indigo-950">139 / 150</span>
                          <span className="text-[10px] text-green-600 block font-bold">93% Overall</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Evaluation ID</span>
                          <span className="text-xs font-bold text-indigo-950 block mt-1">ID-INTERN261650</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-6">
                          <div>
                            <div className="font-serif italic font-bold text-slate-900 text-sm">Satyajit Swain</div>
                            <div className="text-[10px] text-slate-500">Founder & CEO</div>
                          </div>
                          <div>
                            <div className="font-serif italic font-bold text-slate-900 text-sm">Adil Quadri</div>
                            <div className="text-[10px] text-slate-500">Co-Founder & COO</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                          <span className="font-bold text-slate-700">DPIIT #startupindia</span>
                          <span>•</span>
                          <span className="font-bold text-slate-700">ISO 9001:2015</span>
                          <span>•</span>
                          <span className="font-bold text-slate-700">MSME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. IAMNEO / LPU COMPUTER PROGRAMMING 150 HRS */}
                {isIamNeo && (
                  <div className="bg-white text-slate-900 border-4 border-red-900/20 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black tracking-tight text-red-600 font-mono">neo</span>
                        <span className="text-xs font-mono text-slate-500">colab</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 uppercase">iamneo</div>
                        <div className="text-[9px] text-slate-500">An NIIT Venture</div>
                      </div>
                    </div>

                    <div className="text-center my-6">
                      <h2 className="text-xl sm:text-2xl font-serif uppercase tracking-widest text-slate-900 font-bold border-b border-slate-300 pb-2 inline-block">
                        CERTIFICATE OF APPRECIATION
                      </h2>
                      <p className="text-xs text-slate-500 mt-4">This certificate is proudly presented to</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-red-950 mt-1 font-sans">
                        Vishal Kumar Anshu
                      </h3>
                      <p className="text-xs text-slate-600 mt-2">for successfully completing the</p>
                      <h4 className="text-base sm:text-lg font-bold text-red-700 font-sans mt-0.5">
                        Computer Programming (150 Hours)
                      </h4>
                      <p className="text-xs text-slate-700 max-w-xl mx-auto mt-2 leading-relaxed">
                        demonstrating strong commitment, consistency, and excellence throughout the course with a duration of 150 Hours.
                      </p>
                      <p className="text-xs font-mono text-slate-800 font-semibold mt-3">
                        Course Duration: 18-Jan-2026 to 20-May-2026
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="text-[11px] text-slate-500 uppercase">ISSUE DATE</div>
                        <div className="font-bold text-slate-900">21-May-2026</div>
                      </div>

                      <div className="text-center">
                        <div className="font-serif italic font-bold text-slate-900">Senthikumar TP</div>
                        <div className="text-[10px] text-slate-500">SENTHIKUMAR TP</div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase">Certificate No.</div>
                        <div className="font-bold text-slate-900 text-xs">18dh7Ai0d17A60DJ3BK1</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. INFOSYS SPRINGBOARD INTRODUCTION TO ARTIFICIAL INTELLIGENCE */}
                {isInfosys && (
                  <div className="bg-white text-slate-900 border-4 border-blue-900/20 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xl font-black text-blue-600 tracking-tight">Infosys</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                          Navigate your next
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-900 font-mono">
                          Infosys | Springboard
                        </span>
                      </div>
                    </div>

                    <div className="my-6">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-display tracking-tight">
                        COURSE COMPLETION CERTIFICATE
                      </h2>
                      <p className="text-xs text-slate-500 mt-3 font-mono">The certificate is awarded to</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mt-1">
                        Vishal Kumar Anshu
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 font-mono">for successfully completing the course</p>
                      <h4 className="text-lg font-bold text-blue-700 mt-0.5">
                        Introduction to Artificial Intelligence
                      </h4>
                      <p className="text-xs text-slate-500 mt-3 font-mono">
                        on March 26, 2026
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded text-xs text-blue-900 font-serif italic">
                      "Congratulations! You make us proud!"
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500">Issued on: Thursday, March 26, 2026</div>
                        <a
                          href="https://verify.onwingspan.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-blue-600 hover:underline"
                        >
                          Verify: https://verify.onwingspan.com
                        </a>
                      </div>

                      <div className="text-right">
                        <div className="font-serif italic font-bold text-slate-900">Satheesha B.N.</div>
                        <div className="text-[10px] font-bold text-slate-800">Satheesha B. Nanjappa</div>
                        <div className="text-[9px] text-slate-500">
                          Senior Vice President & Head Education, Infosys Limited
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CISCO NETWORKING ACADEMY C++ ESSENTIALS 1 */}
                {isCisco && (
                  <div className="bg-white text-slate-900 border-4 border-sky-900/20 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-sky-800 text-sm tracking-tighter">
                          ||| Cisco | Networking Academy
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900 text-sm">C++ Institute</div>
                        <div className="text-[9px] text-slate-500">Open Education & Development Group</div>
                      </div>
                    </div>

                    <div className="text-center my-6">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                        This certificate is awarded to
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mt-1 font-display">
                        Vishal Kumar Anshu
                      </h2>
                      <p className="text-xs text-slate-600 mt-2">for successfully completing</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mt-0.5">
                        C++ Essentials 1
                      </h3>
                      <p className="text-xs text-slate-600 mt-2">
                        offered by Networking Academy through the Cisco Networking Academy program.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="font-serif italic font-bold text-slate-900 text-sm">Lynn Bloomer</div>
                        <div className="text-[11px] font-bold text-slate-800">Lynn Bloomer</div>
                        <div className="text-[10px] text-slate-500">Director, Cisco Networking Academy</div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900">25 Jan 2026</div>
                        <div className="text-[10px] text-slate-500 uppercase">Completion Date</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ================================================================= */
              /* CYBER HUD TELEMETRY VIEW (DETAILED METADATA & VALIDATION SPECS)   */
              /* ================================================================= */
              <div className="w-full max-w-3xl space-y-6 font-mono text-xs text-white/80">
                {/* Status HUD Header */}
                <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-red-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> VERIFICATION NODE ACTIVE
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/40 text-[10px] font-bold uppercase">
                      STATUS: 100% AUTHENTICATED
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                    {certificate.title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                    {certificate.description}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      ISSUING ORGANIZATION
                    </span>
                    <span className="text-white font-bold text-sm block">
                      {certificate.organization}
                    </span>
                  </div>

                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      DATE OF ISSUANCE
                    </span>
                    <span className="text-white font-bold text-sm block">
                      {certificate.issueDate}
                    </span>
                  </div>

                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      UNIQUE CREDENTIAL ID
                    </span>
                    <span className="text-red-400 font-bold text-xs break-all block">
                      {certificate.credentialId}
                    </span>
                  </div>

                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      VERIFICATION HUB / PLATFORM
                    </span>
                    <span className="text-white font-bold text-xs block">
                      {certificate.verifyPlatform || 'Official Digital Repository'}
                    </span>
                  </div>
                </div>

                {/* Performance metrics if available */}
                {certificate.performanceMetrics && certificate.performanceMetrics.length > 0 && (
                  <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
                    <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500">
                      OFFICIAL EVALUATION METRICS
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {certificate.performanceMetrics.map((m, idx) => (
                        <div key={idx} className="p-3 bg-black border border-white/10 rounded text-center">
                          <span className="text-[10px] text-white/40 block uppercase">{m.label}</span>
                          <span className="text-sm font-bold text-white mt-0.5 block">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validated Skills */}
                <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500">
                    VALIDATED TECHNICAL SKILLS & COMPETENCIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skillsGained.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-black border border-white/10 text-white/90 text-xs rounded flex items-center gap-1.5 uppercase tracking-wider"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signatories & Authority */}
                {certificate.signatories && certificate.signatories.length > 0 && (
                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-1.5">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      AUTHORIZED SIGNATORIES
                    </span>
                    <div className="space-y-1">
                      {certificate.signatories.map((sig, sIdx) => (
                        <div key={sIdx} className="text-white text-xs flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>{sig}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 py-3.5 border-t border-white/10 bg-[#0a0a0f] flex flex-wrap items-center justify-between text-xs font-mono text-white/50 gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              VERIFIED CREDENTIAL: {certificate.badgeCode}
            </span>

            <div className="flex items-center space-x-2">
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold transition-all shadow-md uppercase tracking-wider"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OFFICIAL VERIFY LINK</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer uppercase tracking-wider font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
