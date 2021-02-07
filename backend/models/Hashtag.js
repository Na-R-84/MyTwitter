import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Hashtag ||
  mongoose.model('Hashtag', hashtagSchema);
