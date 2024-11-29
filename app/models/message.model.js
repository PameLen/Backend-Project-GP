import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flat",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },

  flats: [
    {
      flat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flat",
        required: true,
      },
      //añadir city o direccipn
    },
  ],
});

export const Message = mongoose.model("Message", messageSchema);
