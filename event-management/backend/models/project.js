import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, default: 'Pending' },
});

export default mongoose.model('Project', projectSchema);
