import { NextApiRequest, NextApiResponse } from "next";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { Formidable } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data: any = await new Promise((resolve, reject) => {
      const form = new Formidable();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    const file = data.files.file;
    const pdfExtract = new PDFExtract();
    const options: PDFExtractOptions = {
      normalizeWhitespace: true,
    };
    console.log("filepath", file[0].filepath, file[0])
    const result = await pdfExtract.extract(file[0].filepath, options);

    console.log("result", result)

    const document: string[] = [];
    result.pages.map((item) => {
      item.content.map((subItem) => {
        document.push(subItem.str);
      });
    });

    const content = document.join("");
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error });
  }
}
