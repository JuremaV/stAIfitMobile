import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (newMessages = []) => {
    const userMessage = newMessages[0];
    setMessages((prevMessages) => GiftedChat.append(prevMessages, userMessage));

    // Process user message to get bot response
    const botMessage = generateResponse(userMessage.text);
    setMessages((prevMessages) => GiftedChat.append(prevMessages, botMessage));
  };

  const generateResponse = (userText) => {
    let responseText;

    if (userText.toLowerCase().includes("weight loss")) {
      responseText = "For weight loss, I recommend a high-protein, low-calorie diet. Here’s an example: Breakfast: Eggs and vegetables, Lunch: Grilled chicken salad, Dinner: Fish and steamed broccoli.";
    } else if (userText.toLowerCase().includes("muscle gain")) {
      responseText = "For muscle gain, aim for a high-protein diet with moderate carbs. Example: Breakfast: Oatmeal with protein powder, Lunch: Chicken and rice, Dinner: Steak and sweet potatoes.";
    } else if (userText.toLowerCase().includes("maintenance")) {
      responseText = "To maintain your weight, have a balanced diet. Example: Breakfast: Greek yogurt with fruits, Lunch: Turkey sandwich, Dinner: Pasta with vegetables.";
    } else {
      responseText = "I'm here to help! Try asking about diet plans for weight loss, muscle gain, or maintenance.";
    }

    return {
      _id: Math.random().toString(36).substring(7),
      text: responseText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "stAIfit Bot",
      },
    };
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chatbot;
