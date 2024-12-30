
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const type = formData.get('type') as string;
    const details = formData.get('details') as string;

    // Mock successful upload response
    const uploadedFiles = files.map((file, index) => ({
      id: `file-${index}`,
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    return NextResponse.json({ 
      success: true,
      files: uploadedFiles,
      type,
      details: JSON.parse(details)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
