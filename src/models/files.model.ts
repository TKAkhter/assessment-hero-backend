import mongoose, { Document, Schema } from 'mongoose';

interface IFile extends Document {
  name: string;
  tags: string[];
  filePath: string;
  createdAt: Date;
}

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  tags: { type: [String], default: [] },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model<IFile>('File', fileSchema);

export default File;