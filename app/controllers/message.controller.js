import { Message } from "../models/message.model";

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ flatId: req.params.id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      flatId: req.params.id,
      senderId: req.params.senderId,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllMessages, getUserMessages, addMessage };
