import { jsPDF } from 'jspdf';
// MACHI: Local asset import correct-ah irukanum
import signatureImg from '../assets/signature.png'; 

export const generateGreenHeroCertificate = (userName, activityType) => {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // --- BACKGROUND DESIGN ---
    doc.setDrawColor(22, 163, 74); 
    doc.setLineWidth(5);
    doc.rect(5, 5, 287, 200); 
    
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(1);
    doc.rect(10, 10, 277, 190);

    // --- HEADER ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(22, 163, 74);
    doc.text("GREEN HERO", 148.5, 50, { align: 'center', charSpace: 1 });

    doc.setFontSize(20);
    doc.setTextColor(100);
    doc.text("CERTIFICATE OF APPRECIATION", 148.5, 65, { align: 'center' });

    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("This certificate is proudly presented to", 148.5, 90, { align: 'center' });

    // User Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(34, 197, 94);
    doc.text(userName ? userName.toUpperCase() : "ECO FRIEND", 148.5, 110, { align: 'center' });

    // Body Text
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.setTextColor(60);
    const recognitionText = activityType === 'pickup' 
      ? "for their outstanding contribution to the environment through our Waste Pickup Service. By diverting waste from landfills, you've helped save our planet."
      : "for choosing a sustainable lifestyle by purchasing recycled products from Waste to Worth. Every eco-friendly choice makes a difference!";
    
    doc.text(recognitionText, 148.5, 130, { align: 'center', maxWidth: 220 });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(22, 163, 74);
    doc.text("WASTE TO WORTH (W2W) SUSTAINABILITY INITIATIVE", 148.5, 160, { align: 'center' });

    // --- DIGITAL SIGNATURE & SEAL SECTION ---

    // 1. Digital Signature Image
    try {
        // MACHI: Signature-ah konjam yerakkittaen (155 to 165)
        // Y-axis value increase panna image kīzha varum
        doc.addImage(signatureImg, 'PNG', 220, 165, 40, 20); 
    } catch (e) {
        console.warn("Signature image does not exist. check the path!");
    }

    // 2. Signature Line & Founder Info
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    // Line-ah konjam yerakkittaen (180 to 182)
    doc.line(220, 182, 260, 182); 
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    // Name (186 to 188)
    doc.text("THULASI RAJAN M", 240, 188, { align: 'center' }); 
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100);
    // Title (191 to 193)
    doc.text("Founder & CEO, W2W", 240, 193, { align: 'center' });

    // 3. Verification QR (Mock)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Verified_Green_Hero_${userName}`;
    doc.addImage(qrUrl, 'PNG', 25, 165, 20, 20);
    doc.setFontSize(7);
    doc.text("Verify Authenticity", 35, 190, { align: 'center' });

    // 4. Issued Date
    doc.setFontSize(10);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 148.5, 190, { align: 'center' });

    doc.save(`W2W_Green_Hero_${userName ? userName.replace(/\s+/g, '_') : 'User'}.pdf`);
    
  } catch (err) {
    console.error("Certificate generation error machi:", err);
  }
};