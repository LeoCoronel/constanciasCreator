import jsPDF from 'jspdf';

// Utility to convert an image URL to base64
function getBase64ImageFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = url;
  });
}

export async function generarPDF(data: any) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  
  let logoBase64: string | null = null;
  try {
    logoBase64 = await getBase64ImageFromURL('/logo.jpg');
  } catch (error) {
    console.error('Error loading logo:', error);
  }

  const [year, month, day] = data.fecha.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  for (let page = 1; page <= 3; page++) {
    if (page > 1) {
      doc.addPage();
    }

    if (logoBase64) {
      doc.addImage(logoBase64, 'JPEG', width / 2 - 15, 10, 30, 30);
    }

    // Header Texts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('ASOCIACIÓN DE BOMBEROS VOLUNTARIOS DE JOSÉ C. PAZ', width / 2, 45, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('PERSONERÍA JURÍDICA N° 32092', width / 2, 50, { align: 'center' });
    doc.text('PROVINCIA DE BUENOS AIRES - REPÚBLICA ARGENTINA', width / 2, 54, { align: 'center' });
    doc.text('I.N.O.B.V. N° 234', width / 2, 58, { align: 'center' });
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text('Cuartel Central - Comandante Donato De Salvis', width / 2, 65, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('Pasaje San Agustín 703 (1665) José Clemente Paz - Bs. As.', width / 2, 69, { align: 'center' });
    doc.text('Tel.: 02320-422222 / 02320-436736 E-mail: bomberosjosecpaz@yahoo.com.ar', width / 2, 73, { align: 'center' });

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CONSTANCIA DE SINIESTRO', width / 2, 85, { align: 'center' });
    doc.line(width / 2 - 35, 86, width / 2 + 35, 86); // underline

    // Body Fields
    doc.setFontSize(10);
    let y = 100;
    const col1 = 20;
    const col2 = 140; // For DNI, Partido, etc.

    doc.setFont('helvetica', 'bold');
    doc.text(`SOLICITANTE: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.solicitante.toUpperCase()}`, col1 + 30, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`DNI: `, col2, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.dni}`, col2 + 10, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`DOMICILIO DEL HECHO: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.domicilio.toUpperCase()}`, col1 + 45, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`LOCALIDAD: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.localidad.toUpperCase()}`, col1 + 25, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`PARTIDO: `, col2, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.partido.toUpperCase()}`, col2 + 18, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`MOTIVO: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.motivo.toUpperCase()}`, col1 + 18, y);
    
    if (data.tipo === 'auto' && data.dominio) {
      doc.setFont('helvetica', 'bold');
      doc.text(`DOMINIO: `, col2, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${data.dominio.toUpperCase()}`, col2 + 18, y);
    }

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`PERDIDAS: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.perdidas}`, col1 + 22, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`PARA SER PRESENTADO: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.presentado.toUpperCase()}`, col1 + 45, y);

    if (data.tipo === 'auto' && data.poliza) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text(`NÚMERO DE POLIZA: `, col1, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${data.poliza}`, col1 + 40, y);
    }

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`PARTE N°: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.parte}`, col1 + 20, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`FECHA: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formattedDate}`, col1 + 15, y);

    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`HORA: `, col1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.hora} HS.`, col1 + 15, y);

    // Footer text
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introText = "Se deja constancia que los datos que se consignan precedentemente surgen del parte profesional del cual doy fe; teniendo validez únicamente, con titulo de propiedad o boleto de compra-venta, para el caso de siniestro sobre bienes muebles y/o inmuebles registrables.";
    const textLines = doc.splitTextToSize(introText, width - 40);
    doc.text(textLines, col1, y);

    // Current Date logic for footer
    y += textLines.length * 5 + 5;
    const currentDate = new Date();
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const footerDate = `JOSÉ C. PAZ, ${currentDate.getDate()} DE ${months[currentDate.getMonth()]} DE ${currentDate.getFullYear()}.`;
    
    doc.setFont('helvetica', 'bold');
    doc.text(footerDate, col1, y);

    if (page === 1) {
      // Signatures ONLY on the first page
      y += 40;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      
      const sigLine1 = `RETIRO:....................................................................... DNI:..............................................`;
      const sigLine2 = `FIRMA:.......................................................................... FECHA:..........................................`;
      
      doc.text(sigLine1, col1, y);
      y += 10;
      doc.text(sigLine2, col1, y);
    }
  }

  // Save the PDF
  const filename = `Constancia_${data.solicitante.replace(/\s+/g, '_')}_${formattedDate.replace(/\//g, '-')}.pdf`;
  doc.save(filename);
}
