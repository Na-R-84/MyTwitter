import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    numLikes: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);
