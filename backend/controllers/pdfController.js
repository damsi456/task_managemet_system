const Task = require('../models/Task');
const PDFDocument = require('pdfkit');

exports.generateTaskReport = async (req, res) => {
  try {
    const tasks = await Task.find();

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=task-report.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Task Report', { align: 'center' });
    doc.moveDown();

    tasks.forEach((task, index) => {
      doc
        .fontSize(14)
        .text(`Task ${index + 1}`, { underline: true });

      doc
        .fontSize(12)
        .text(`Title: ${task.title}`)
        .text(`Description: ${task.description || 'N/A'}`)
        .text(`Assigned To: ${task.assignedTo}`)
        .text(`Deadline: ${new Date(task.deadline).toDateString()}`)
        .text(`Status: ${task.status}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
