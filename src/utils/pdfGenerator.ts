import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ResumePDFOptions {
  fileName?: string;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

/**
 * Generates and downloads a clean, vector-rendered, 1:1 ATS-compliant PDF
 * of Vishal Kumar Anshu's resume with exact formatting, typography, and links.
 */
export const downloadResumeVectorPDF = (fileName: string = 'Vishal_Kumar_Anshu_Resume.pdf') => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
    const margin = 36; // 0.5 inch margins
    const contentWidth = pageWidth - margin * 2;
    let y = 40;

    // --- Header: Name ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(24, 43, 107); // Dark navy blue from the original PDF
    doc.text('Vishal Kumar Anshu', margin, y);
    y += 18;

    // --- Contact Information (2 columns) ---
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');

    // Left column
    doc.setTextColor(30, 30, 30);
    doc.text('LinkedIn: ', margin, y);
    doc.setTextColor(18, 97, 196);
    doc.textWithLink('linkedin.com/in/vishal-kumar-anshu', margin + 44, y, {
      url: 'https://linkedin.com/in/vishal-kumar-anshu',
    });

    // Right column
    const col2X = pageWidth - margin - 220;
    doc.setTextColor(30, 30, 30);
    doc.text('Email: ', col2X, y);
    doc.setTextColor(18, 97, 196);
    doc.textWithLink('vishalkumaranshu02@gmail.com', col2X + 30, y, {
      url: 'mailto:vishalkumaranshu02@gmail.com',
    });

    y += 13;

    // Line 2
    doc.setTextColor(30, 30, 30);
    doc.text('GitHub: ', margin, y);
    doc.setTextColor(18, 97, 196);
    doc.textWithLink('https://github.com/vishalanshu31-vka', margin + 37, y, {
      url: 'https://github.com/vishalanshu31-vka',
    });

    doc.setTextColor(30, 30, 30);
    doc.text('Mobile: +91 9938235909', col2X, y);

    y += 16;

    // Helper for Section Headers
    const renderSectionHeader = (title: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(24, 43, 107);
      doc.text(title.toUpperCase(), margin, y);
      y += 4;
      doc.setDrawColor(180, 185, 200);
      doc.setLineWidth(0.75);
      doc.line(margin, y, margin + contentWidth, y);
      y += 12;
    };

    // Helper for Multiline Bullet Points
    const renderBullet = (text: string, indent: number = margin + 10) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);

      // Bullet dot
      doc.circle(margin + 4, y - 3, 1.2, 'F');

      const textWidth = contentWidth - 14;
      const lines = doc.splitTextToSize(text, textWidth);
      doc.text(lines, indent, y);
      y += lines.length * 11 + 2;
    };

    // --- SKILLS ---
    renderSectionHeader('SKILLS');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text('Languages: ', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Python, C++, C', margin + 60, y);
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.text('Tools / Platforms: ', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Scikit-learn, Pandas, NumPy, Google Colab, Jupyter Notebook, Node.js', margin + 92, y);
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.text('Soft Skills: ', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Leadership, Analytical Problem-Solving, Team Collaboration, Adaptability', margin + 56, y);
    y += 16;

    // --- PROJECTS ---
    renderSectionHeader('PROJECTS');

    // Project 1
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text('Fake Job Posting Detection', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | Python, Scikit-learn, NLP (TF-IDF)', margin + 130, y);
    doc.setFont('helvetica', 'bold');
    doc.text("Aug'2026", margin + contentWidth, y, { align: 'right' });
    y += 11;

    renderBullet(
      'Built an end-to-end NLP pipeline in Google Colab on a Kaggle fake-job-postings dataset, engineering TF-IDF text features and resolving a mixed-dtype sparse-matrix error via np.float64 casting.'
    );
    renderBullet(
      'Combined TF-IDF vectors with structured features using scipy.sparse.hstack, then trained and tuned Logistic Regression, Naive Bayes, and Decision Tree classifiers with GridSearchCV.'
    );
    renderBullet(
      'Delivered a fully formatted Word report documenting preprocessing steps, model comparison, and evaluation metrics.'
    );
    y += 4;

    // Project 2
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text('AI-Based Hiring Prediction System', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | Python, Scikit-learn, MultiLabelBinarizer', margin + 172, y);
    doc.setFont('helvetica', 'bold');
    doc.text("May' 26", margin + contentWidth, y, { align: 'right' });
    y += 11;

    renderBullet(
      'Identified and removed an undocumented "AI Score" column causing data leakage in a synthetic resume dataset, improving model validity.'
    );
    renderBullet(
      'Engineered multi-hot skill features with MultiLabelBinarizer and benchmarked three classifiers, tuning each with GridSearchCV.'
    );
    renderBullet(
      'Authored an honest evaluation noting caveats around synthetic data limitations and fairness in hiring-prediction models.'
    );
    y += 4;

    // Project 3
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text('Global Pollution Analysis & Energy Recovery', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | Python, Logistic Regression, EDA', margin + 218, y);
    doc.setFont('helvetica', 'bold');
    doc.text("Mar' 26", margin + contentWidth, y, { align: 'right' });
    y += 11;

    renderBullet(
      'Performed EDA and feature engineering (composite pollution index, decade-over-decade trends) across 175 countries (2000–2019).'
    );
    renderBullet(
      'Built a Logistic Regression model achieving 97.5% accuracy in classifying pollution severity (Low / Medium / High).'
    );
    renderBullet(
      'Delivered policy-oriented recommendations identifying priority countries for waste-to-energy investment.'
    );
    y += 6;

    // --- TRAINING ---
    renderSectionHeader('TRAINING');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text('3Skill Training — AI/ML Internship', margin, y);
    
    // PDF badge marker
    doc.setFontSize(8);
    doc.setTextColor(180, 40, 40);
    doc.text(' [Certificate_INTERN261650_Vishal Kumar Anshu.pdf]', margin + 175, y);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text("Aug'26", margin + contentWidth, y, { align: 'right' });
    y += 11;

    renderBullet(
      'Completed a 2-month AI/ML internship with 3Skill Training, emphasizing practical, project-based machine learning application aligned with industry expectations.'
    );
    renderBullet(
      'Achieved a 93% overall performance score (139/150), including 96% on the final exam and 86% on the project evaluation.'
    );
    renderBullet(
      'Earned formal certification (ID: INTERN261650) recognizing successful completion of the program.'
    );
    y += 6;

    // --- CERTIFICATES ---
    renderSectionHeader('CERTIFICATES');

    // Cert 1
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text('Computer Programming (150 Hrs)', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | iamNeo (an NIIT Venture), via LPU', margin + 155, y);
    doc.setFont('helvetica', 'bold');
    doc.text("May' 26", margin + contentWidth, y, { align: 'right' });
    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(180, 40, 40);
    doc.text(' [CSE101_2029_E Certificate_12516593@neocolab.ai.pdf]', margin, y);
    y += 12;

    // Cert 2
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text('Introduction to Artificial Intelligence', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | Infosys Springboard', margin + 170, y);
    doc.setFontSize(8);
    doc.setTextColor(180, 40, 40);
    doc.text(' [Introduction to Artificial Intelligence.pdf]', margin + 270, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text("Mar' 26", margin + contentWidth, y, { align: 'right' });
    y += 12;

    // Cert 3
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text('C++ Essentials 1', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(' | Cisco Networking Academy / C++ Institute', margin + 85, y);
    doc.setFontSize(8);
    doc.setTextColor(180, 40, 40);
    doc.text(' [C++_Essentials_1_certificate.pdf]', margin + 300, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text("Jan' 26", margin + contentWidth, y, { align: 'right' });
    y += 16;

    // --- EDUCATION ---
    renderSectionHeader('EDUCATION');

    // Edu 1: LPU
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 107);
    doc.text('Lovely Professional University', margin, y);
    doc.setTextColor(30, 30, 30);
    doc.text('Phagwara, Punjab', margin + contentWidth, y, { align: 'right' });
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Bachelor of Technology', margin, y);
    doc.text("Aug' 25 - Present", margin + contentWidth, y, { align: 'right' });
    y += 10;
    doc.text('Computer Science and Engineering; CGPA: 9.27', margin, y);
    y += 13;

    // Edu 2: ODM
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 107);
    doc.text('ODM Public School', margin, y);
    doc.setTextColor(30, 30, 30);
    doc.text('BBSR, Odisha', margin + contentWidth, y, { align: 'right' });
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Intermediate', margin, y);
    doc.text("Mar' 22 - May' 24", margin + contentWidth, y, { align: 'right' });
    y += 10;
    doc.text('PCM; Percentage: 76%', margin, y);
    y += 13;

    // Edu 3: DAV
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 107);
    doc.text('D.A.V Public School', margin, y);
    doc.setTextColor(30, 30, 30);
    doc.text('Paradeep, Odisha', margin + contentWidth, y, { align: 'right' });
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Matriculation', margin, y);
    doc.text("Mar' 21 - May' 22", margin + contentWidth, y, { align: 'right' });
    y += 10;
    doc.text('Percentage: 88%', margin, y);

    // Save/Download the PDF directly
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error('Vector PDF generation error:', error);
    return false;
  }
};

/**
 * Fallback HTML Canvas to PDF generator (captures printable DOM directly)
 */
export const downloadResumeFromDOM = async (
  elementId: string = 'resume-printable-area',
  fileName: string = 'Vishal_Kumar_Anshu_Resume.pdf'
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    // If element not in DOM, fall back to vector PDF
    return downloadResumeVectorPDF(fileName);
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('HTML2Canvas export failed, falling back to Vector PDF:', err);
    return downloadResumeVectorPDF(fileName);
  }
};

/**
 * Universal print handler that works reliably even inside iframes
 */
export const printResumeSafely = (elementId: string = 'resume-printable-area') => {
  // First attempt: Check if window.print() can be triggered
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      window.print();
      return;
    }

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';

    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow?.document;
    if (frameDoc) {
      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Vishal Kumar Anshu - Resume</title>
            <style>
              @page { size: A4; margin: 12mm 15mm; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                color: #1a1a1a;
                margin: 0;
                padding: 0;
                background: #fff;
              }
              * { box-sizing: border-box; }
              a { color: #1261c4; text-decoration: underline; }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `);
      frameDoc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch (e) {
          window.print();
        } finally {
          setTimeout(() => {
            document.body.removeChild(printFrame);
          }, 1000);
        }
      }, 300);
    } else {
      window.print();
    }
  } catch (err) {
    console.error('Print iframe error, fallback to direct print:', err);
    window.print();
  }
};
