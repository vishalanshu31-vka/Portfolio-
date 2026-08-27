import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Award,
  Terminal,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Github,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import {
  downloadResumeVectorPDF,
  downloadResumeFromDOM,
  printResumeSafely,
} from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'dark'>('pdf');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    soundEffects.playClick();
    setIsExporting(true);
    try {
      // First attempt high-fidelity vector PDF generation
      const success = downloadResumeVectorPDF('Vishal_Kumar_Anshu_Resume.pdf');
      if (success) {
        setDownloadSuccess(true);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ef4444', '#ffffff', '#3b82f6'],
          });
        } catch (e) {}
        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        // Fallback to DOM canvas export
        await downloadResumeFromDOM('resume-printable-area', 'Vishal_Kumar_Anshu_Resume.pdf');
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
      // Emergency fallback
      downloadResumeVectorPDF('Vishal_Kumar_Anshu_Resume.pdf');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    soundEffects.playClick();
    printResumeSafely('resume-printable-area');
  };

  const handleCopyText = () => {
    soundEffects.playClick();
    const resumeText = `
Vishal Kumar Anshu
LinkedIn: ${portfolioData.socials.linkedin}
Email: ${portfolioData.socials.email}
GitHub: ${portfolioData.socials.github}
Mobile: +91 9938235909

SKILLS
Languages: Python, C++, C
Tools / Platforms: Scikit-learn, Pandas, NumPy, Google Colab, Jupyter Notebook, Node.js
Soft Skills: Leadership, Analytical Problem-Solving, Team Collaboration, Adaptability

PROJECTS
Fake Job Posting Detection | Python, Scikit-learn, NLP (TF-IDF) (Aug' 2026)
• Built an end-to-end NLP pipeline in Google Colab on a Kaggle fake-job-postings dataset, engineering TF-IDF text features and resolving a mixed-dtype sparse-matrix error via np.float64 casting.
• Combined TF-IDF vectors with structured features using scipy.sparse.hstack, then trained and tuned Logistic Regression, Naive Bayes, and Decision Tree classifiers with GridSearchCV.
• Delivered a fully formatted Word report documenting preprocessing steps, model comparison, and evaluation metrics.

AI-Based Hiring Prediction System | Python, Scikit-learn, MultiLabelBinarizer (May' 26)
• Identified and removed an undocumented “AI Score” column causing data leakage in a synthetic resume dataset, improving model validity.
• Engineered multi-hot skill features with MultiLabelBinarizer and benchmarked three classifiers, tuning each with GridSearchCV.
• Authored an honest evaluation noting caveats around synthetic data limitations and fairness in hiring-prediction models.

Global Pollution Analysis & Energy Recovery | Python, Logistic Regression, EDA (Mar' 26)
• Performed EDA and feature engineering (composite pollution index, decade-over-decade trends) across 175 countries (2000–2019).
• Built a Logistic Regression model achieving 97.5% accuracy in classifying pollution severity (Low / Medium / High).
• Delivered policy-oriented recommendations identifying priority countries for waste-to-energy investment.

TRAINING
3Skill Training — AI/ML Internship [Certificate_INTERN261650_Vishal Kumar Anshu.pdf] (Aug' 26)
• Completed a 2-month AI/ML internship with 3Skill Training, emphasizing practical, project-based machine learning application aligned with industry expectations.
• Achieved a 93% overall performance score (139/150), including 96% on the final exam and 86% on the project evaluation.
• Earned formal certification (ID: INTERN261650) recognizing successful completion of the program.

CERTIFICATES
• Computer Programming (150 Hrs) | iamNeo (an NIIT Venture), via LPU [CSE101_2029_E Certificate_12516593@neocolab.ai.pdf] (May' 26)
• Introduction to Artificial Intelligence | Infosys Springboard [Introduction to Artificial Intelligence.pdf] (Mar' 26)
• C++ Essentials 1 | Cisco Networking Academy / C++ Institute [C++_Essentials_1_certificate.pdf] (Jan' 26)
• Building AI Agents with MongoDB | MongoDB, Inc. via Credly (Aug' 26) [Credly ID: 97e2cc7d-3cd0-4bc3-9656-699fa0a6ca18]
• Building RAG Apps Using MongoDB | MongoDB, Inc. via Credly (Aug' 26) [Credly ID: ce00f04b-9c2e-48b4-b220-55ad4f4c0a42]
• Building AI-Powered Search with MongoDB Vector Search | MongoDB, Inc. (Aug' 26)
• AI and Innovation: How MongoDB Enables a Resilient AI Strategy | MongoDB (Aug' 26)
• MongoDB Basics for Students | MongoDB, Inc. (Aug' 26)

EDUCATION
• Lovely Professional University, Phagwara, Punjab (B.Tech CSE, Aug' 25 – Present, CGPA: 9.27)
• ODM Public School, BBSR, Odisha (Intermediate PCM: 76%, Mar' 22 – May' 24)
• D.A.V Public School, Paradeep, Odisha (Matriculation: 88%, Mar' 21 – May' 22)
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col bg-black border border-white/15 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Top Control HUD Header */}
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0a0a0f] gap-3">
            {/* Title & Document Badge */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600/20 border border-red-600/50 text-red-500 rounded">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight flex items-center gap-2">
                  CURRICULUM VITAE // VISHAL KUMAR ANSHU
                </h3>
                <p className="font-mono text-[11px] text-red-400 font-bold uppercase tracking-wider">
                  OFFICIAL RESUME • VERIFIED CREDENTIALS (2026)
                </p>
              </div>
            </div>

            {/* Middle Mode Switcher Tabs */}
            <div className="flex items-center bg-white/5 p-1 border border-white/10 rounded font-mono text-xs">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('pdf');
                }}
                className={`px-3 py-1.5 rounded transition-all font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF DOCUMENT VIEW</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('dark');
                }}
                className={`px-3 py-1.5 rounded transition-all font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'dark'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CYBER HUD VIEW</span>
              </button>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center space-x-2">
              {viewMode === 'pdf' && (
                <div className="hidden sm:flex items-center space-x-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-white/70 font-mono text-xs">
                  <button
                    onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
                    disabled={zoomLevel <= 70}
                    className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-[11px] font-bold">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                    disabled={zoomLevel >= 130}
                    className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="p-1 hover:text-white ml-1 border-l border-white/10 pl-1.5 text-[10px] cursor-pointer"
                    title="Reset Zoom"
                  >
                    RESET
                  </button>
                </div>
              )}

              <button
                onClick={handleCopyText}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer uppercase tracking-wider"
                title="Copy resume text to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer uppercase tracking-wider disabled:opacity-50"
                title="Download official PDF file"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>EXPORTING...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                    <span>DOWNLOADED!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-all border border-white/15 cursor-pointer uppercase tracking-wider"
                title="Print or Save via Browser Dialog"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                }}
                className="p-1.5 rounded bg-white/5 hover:bg-red-950/60 text-white/60 hover:text-white border border-white/10 hover:border-red-600/50 transition-colors cursor-pointer"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Scrollable View Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#0e0e14] flex justify-center items-start">
            {viewMode === 'pdf' ? (
              /* ======================================================== */
              /* AUTHENTIC 1:1 PDF DOCUMENT VIEW (EXACT REPLICA OF RESUME) */
              /* ======================================================== */
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-150 w-full max-w-3xl"
              >
                <div
                  id="resume-printable-area"
                  className="bg-white text-slate-900 shadow-2xl p-6 sm:p-10 md:p-12 mx-auto rounded-sm selection:bg-blue-100 selection:text-blue-900 border border-slate-200"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                  }}
                >
                  {/* --- Header --- */}
                  <div className="mb-4">
                    <h1
                      className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-950"
                      style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
                      Vishal Kumar Anshu
                    </h1>

                    <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-800">
                      <div>
                        <span className="font-semibold text-slate-900">LinkedIn: </span>
                        <a
                          href="https://linkedin.com/in/vishal-kumar-anshu"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          linkedin.com/in/vishal-kumar-anshu
                        </a>
                      </div>
                      <div className="sm:text-right">
                        <span className="font-semibold text-slate-900">Email: </span>
                        <a
                          href="mailto:vishalkumaranshu02@gmail.com"
                          className="text-blue-700 hover:underline"
                        >
                          vishalkumaranshu02@gmail.com
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">GitHub: </span>
                        <a
                          href="https://github.com/vishalanshu31-vka"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          https://github.com/vishalanshu31-vka
                        </a>
                      </div>
                      <div className="sm:text-right">
                        <span className="font-semibold text-slate-900">Mobile: </span>
                        <a href="tel:+919938235909" className="text-slate-800">
                          +91 9938235909
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 1: SKILLS --- */}
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                      SKILLS
                    </h2>
                    <div className="text-[12.5px] leading-relaxed text-slate-800 space-y-0.5">
                      <div>
                        <span className="font-bold text-slate-900">Languages: </span>
                        <span>Python, C++, C</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">Tools / Platforms: </span>
                        <span>Scikit-learn, Pandas, NumPy, Google Colab, Jupyter Notebook, Node.js</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">Soft Skills: </span>
                        <span>Leadership, Analytical Problem-Solving, Team Collaboration, Adaptability</span>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 2: PROJECTS --- */}
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2">
                      PROJECTS
                    </h2>
                    <div className="space-y-3 text-[12.5px] text-slate-800">
                      {/* Project 1 */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>Fake Job Posting Detection</span>
                            <span className="font-normal text-slate-700"> | Python, Scikit-learn, NLP (TF-IDF)</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            Aug'2026
                          </span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5 mt-0.5 text-slate-700 leading-snug">
                          <li>
                            Developed an end-to-end NLP classifier on 17,880 Kaggle job listings to detect fraudulent postings amidst severe 4.84% class imbalance.
                          </li>
                          <li>
                            Engineered a custom 5-stage text-cleaning pipeline and 5,000 unigram/bigram TF-IDF feature matrix; conducted empirical vectorization experiments (TF-IDF vs. CountVectorizer).
                          </li>
                          <li>
                            Tuned Logistic Regression via 5-fold cross-validated GridSearchCV, raising fraud-class F1 from 0.75 to 0.82 (Precision: 0.78, Recall: 0.86); extracted signed coefficients for interpretability and serialized the pipeline with Joblib.
                          </li>
                        </ul>
                      </div>

                      {/* Project 2 */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>AI-Based Hiring Prediction System</span>
                            <span className="font-normal text-slate-700"> | Python, Scikit-learn, MultiLabelBinarizer</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            May' 26
                          </span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5 mt-0.5 text-slate-700 leading-snug">
                          <li>
                            Identified and removed an undocumented “AI Score” column causing data leakage in a
                            synthetic resume dataset, improving model validity.
                          </li>
                          <li>
                            Engineered multi-hot skill features with MultiLabelBinarizer and benchmarked three
                            classifiers, tuning each with GridSearchCV.
                          </li>
                          <li>
                            Authored an honest evaluation noting caveats around synthetic data limitations and fairness
                            in hiring-prediction models.
                          </li>
                        </ul>
                      </div>

                      {/* Project 3 */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>Global Pollution Analysis & Energy Recovery</span>
                            <span className="font-normal text-slate-700"> | Python, Scikit-learn, Logistic Regression, EDA</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            Mar' 26
                          </span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5 mt-0.5 text-slate-700 leading-snug">
                          <li>
                            Conducted 20-year longitudinal EDA across 175 countries (2000–2019) on 13 environmental indicators with median imputation & MinMaxScaler normalization.
                          </li>
                          <li>
                            Engineered composite pollution indices and developed a multinomial Logistic Regression model achieving 97.5% accuracy (Macro F1: 0.97, Precision: 0.98) for 3-tier severity screening.
                          </li>
                          <li>
                            Modeled linear energy recovery dynamics and delivered prioritized national intervention roadmaps (Mauritania, Bangladesh, Pakistan) with a 5-pillar strategic policy framework.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 3: TRAINING --- */}
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2">
                      TRAINING
                    </h2>
                    <div className="text-[12.5px] text-slate-800">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 font-bold text-slate-900">
                        <div className="flex items-center flex-wrap gap-1.5">
                          <span>3Skill Training — AI/ML Internship</span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-normal text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                            Certificate_INTERN261650_Vishal Kumar Anshu.pdf
                          </span>
                        </div>
                        <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                          Aug'26
                        </span>
                      </div>
                      <ul className="list-disc ml-4 space-y-0.5 mt-0.5 text-slate-700 leading-snug">
                        <li>
                          Completed a 2-month AI/ML internship with 3Skill Training, emphasizing practical,
                          project-based machine learning application aligned with industry expectations.
                        </li>
                        <li>
                          Achieved a 93% overall performance score (139/150), including 96% on the final exam and 86%
                          on the project evaluation.
                        </li>
                        <li>
                          Earned formal certification (ID: INTERN261650) recognizing successful completion of the
                          program.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* --- Section 4: CERTIFICATES --- */}
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2">
                      CERTIFICATES & SPECIALIZATIONS
                    </h2>
                    <div className="space-y-2 text-[12.5px] text-slate-800">
                      {/* MongoDB AI Certificates */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>MongoDB AI & Vector Specializations (5 Verified Badges)</span>
                            <span className="font-normal text-slate-700"> | MongoDB, Inc. via Credly</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            Aug' 26
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-700 mt-0.5 leading-snug">
                          Building AI Agents with MongoDB • Building RAG Apps Using MongoDB • Building AI-Powered Search with MongoDB Vector Search • Resilient AI Strategy • MongoDB Basics
                        </p>
                      </div>

                      {/* Certificate: iamNeo */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>Computer Programming (150 Hrs)</span>
                            <span className="font-normal text-slate-700"> | iamNeo (an NIIT Venture), via LPU</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            May' 26
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          <span className="font-mono text-slate-700">Cert ID: 18dh7Ai0d17A60DJ3BK1 (NeoColab LPU CSE101)</span>
                        </div>
                      </div>

                      {/* Certificate: Infosys */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>Introduction to Artificial Intelligence</span>
                            <span className="font-normal text-slate-700"> | Infosys Springboard</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            Mar' 26
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span className="font-mono text-slate-700">Verified via Infosys Wingspan</span>
                        </div>
                      </div>

                      {/* Certificate: Cisco */}
                      <div>
                        <div className="flex items-baseline justify-between gap-2 font-bold text-slate-900">
                          <div>
                            <span>C++ Essentials 1</span>
                            <span className="font-normal text-slate-700"> | Cisco Networking Academy / C++ Institute</span>
                          </div>
                          <span className="text-[12px] font-normal text-slate-700 whitespace-nowrap">
                            Jan' 26
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- Section 5: EDUCATION --- */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2">
                      EDUCATION
                    </h2>
                    <div className="space-y-2 text-[12.5px] text-slate-800">
                      {/* LPU */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                        <div>
                          <div className="font-bold text-blue-950">Lovely Professional University</div>
                          <div className="text-slate-700">Bachelor of Technology</div>
                          <div className="text-slate-800">Computer Science and Engineering; <span className="font-semibold">CGPA: 9.27</span></div>
                        </div>
                        <div className="sm:text-right text-slate-700">
                          <div>Phagwara, Punjab</div>
                          <div className="font-medium">Aug' 25 – Present</div>
                        </div>
                      </div>

                      {/* ODM Public School */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 pt-1 border-t border-slate-100">
                        <div>
                          <div className="font-bold text-slate-900">ODM Public School</div>
                          <div className="text-slate-700">Intermediate</div>
                          <div className="text-slate-800">PCM; <span className="font-semibold">Percentage: 76%</span></div>
                        </div>
                        <div className="sm:text-right text-slate-700">
                          <div>BBSR, Odisha</div>
                          <div>Mar' 22 – May' 24</div>
                        </div>
                      </div>

                      {/* D.A.V Public School */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 pt-1 border-t border-slate-100">
                        <div>
                          <div className="font-bold text-slate-900">D.A.V Public School</div>
                          <div className="text-slate-700">Matriculation</div>
                          <div className="text-slate-800"><span className="font-semibold">Percentage: 88%</span></div>
                        </div>
                        <div className="sm:text-right text-slate-700">
                          <div>Paradeep, Odisha</div>
                          <div>Mar' 21 – May' 22</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* CYBER HUD VIEW (HIGH TECH DARK TELEMETRY VERSION)         */
              /* ======================================================== */
              <div className="w-full max-w-4xl space-y-6 font-sans text-sm text-white/80 p-2 sm:p-4">
                {/* Header Card */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      {portfolioData.personal.name}
                    </h1>
                    <p className="font-mono text-red-500 text-xs sm:text-sm mt-1 font-bold">
                      {portfolioData.personal.title}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {portfolioData.personal.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href={`mailto:${portfolioData.socials.email}`}
                      className="px-3 py-1.5 rounded bg-black border border-white/10 text-white/80 hover:text-red-400 hover:border-red-600/50 flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-red-500" />
                      {portfolioData.socials.email}
                    </a>
                    <a
                      href={portfolioData.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded bg-black border border-white/10 text-white/80 hover:text-red-400 hover:border-red-600/50 flex items-center gap-1.5"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-red-500" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={portfolioData.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded bg-black border border-white/10 text-white/80 hover:text-red-400 hover:border-red-600/50 flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5 text-red-500" />
                      GitHub Repo
                    </a>
                    <a
                      href="tel:+919938235909"
                      className="px-3 py-1.5 rounded bg-black border border-white/10 text-white/80 hover:text-red-400 hover:border-red-600/50 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-500" />
                      +91 9938235909
                    </a>
                  </div>
                </div>

                {/* Technical Skills Radar */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500 flex items-center gap-2">
                    <Award className="w-4 h-4" /> 01 // TECHNICAL SKILLS & PLATFORMS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-black border border-white/10 rounded">
                      <span className="font-mono font-bold text-red-400 block mb-1 text-[11px] uppercase">
                        Languages
                      </span>
                      <p className="text-white font-medium">Python, C++, C</p>
                    </div>
                    <div className="p-3 bg-black border border-white/10 rounded">
                      <span className="font-mono font-bold text-red-400 block mb-1 text-[11px] uppercase">
                        Tools & Platforms
                      </span>
                      <p className="text-white font-medium">
                        Scikit-learn, Pandas, NumPy, Google Colab, Jupyter Notebook, Node.js
                      </p>
                    </div>
                    <div className="p-3 bg-black border border-white/10 rounded">
                      <span className="font-mono font-bold text-red-400 block mb-1 text-[11px] uppercase">
                        Soft Skills
                      </span>
                      <p className="text-white font-medium">
                        Leadership, Analytical Problem-Solving, Team Collaboration, Adaptability
                      </p>
                    </div>
                  </div>
                </div>

                {/* Machine Learning & NLP Projects */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> 02 // KEY MACHINE LEARNING PROJECTS
                  </h4>
                  <div className="space-y-3">
                    {portfolioData.projects.map((proj) => (
                      <div key={proj.id} className="p-4 bg-black border border-white/10 rounded-lg space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-white text-sm">
                            {proj.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 border border-red-600/40 text-red-400 uppercase font-bold">
                            {proj.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Training & Certifications */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500 flex items-center gap-2">
                    <Award className="w-4 h-4" /> 03 // PROFESSIONAL TRAINING & CREDENTIALS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {portfolioData.certifications.map((cert) => (
                      <div key={cert.id} className="p-3.5 bg-black border border-white/10 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{cert.title}</span>
                          <span className="font-mono text-[10px] text-red-400">{cert.issueDate}</span>
                        </div>
                        <div className="text-[11px] text-white/60">{cert.organization}</div>
                        <p className="text-xs text-white/70 leading-normal">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-500 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> 04 // ACADEMIC RECORD
                  </h4>
                  <div className="p-4 bg-black border border-white/10 rounded-lg space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-white text-sm">
                        {portfolioData.education.degree}
                      </div>
                      <div className="font-mono text-xs text-red-400 font-bold">
                        {portfolioData.education.duration}
                      </div>
                    </div>
                    <div className="text-xs text-white/60">
                      {portfolioData.education.university} •{' '}
                      <span className="text-white font-bold">CGPA: {portfolioData.education.currentCGPA}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#0a0a0f] flex flex-wrap items-center justify-between text-xs font-mono text-white/50 gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>DOCUMENT: <strong className="text-white">Vishal_Kumar_Anshu_Resume.pdf</strong> (ATS VERIFIED)</span>
            </span>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>DOWNLOAD PDF</span>
              </button>
              <button
                onClick={handlePrint}
                className="text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer font-bold px-2 py-1"
              >
                PRINT / DIALOG
              </button>
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
