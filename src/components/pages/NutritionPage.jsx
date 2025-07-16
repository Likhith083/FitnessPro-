import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, MessageCircle, Lightbulb, Apple, Beef, Fish, Carrot } from 'lucide-react';

const NutritionPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Hello! I am your AI Nutrition Advisor. I can help you with meal planning, nutrition advice, and fitness-related dietary questions. How can I assist you today?', 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { 
      id: Date.now(), 
      text: input, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: botResponse, 
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('post workout') || input.includes('after workout')) {
      return "Great question! For post-workout nutrition, I recommend a combination of protein and carbohydrates within 30 minutes. Try a protein shake with a banana, or grilled chicken with quinoa. This helps repair muscles and replenish glycogen stores.";
    }
    
    if (input.includes('protein') || input.includes('muscle building')) {
      return "For muscle building, aim for 1.6-2.2g of protein per kg of body weight daily. Good sources include lean meats, fish, eggs, dairy, legumes, and plant-based proteins. Spread protein intake throughout the day for optimal muscle protein synthesis.";
    }
    
    if (input.includes('weight loss') || input.includes('lose weight')) {
      return "For weight loss, focus on a moderate calorie deficit (300-500 calories below maintenance). Prioritize whole foods, lean proteins, vegetables, and complex carbs. Don't forget to stay hydrated and maintain regular exercise!";
    }
    
    if (input.includes('meal plan') || input.includes('diet plan')) {
      return "I'd be happy to help create a meal plan! To get started, could you tell me your current weight, height, activity level, and fitness goals? This will help me provide a personalized nutrition plan.";
    }
    
    if (input.includes('breakfast') || input.includes('morning')) {
      return "A great breakfast for fitness includes protein, complex carbs, and healthy fats. Try Greek yogurt with berries and nuts, or eggs with whole grain toast and avocado. This provides sustained energy for your day.";
    }
    
    if (input.includes('supplements') || input.includes('vitamins')) {
      return "While whole foods should be your primary source of nutrients, some supplements can be beneficial. Consider a multivitamin, vitamin D, and omega-3s. For specific recommendations, consult with a healthcare provider.";
    }
    
    if (input.includes('hydration') || input.includes('water')) {
      return "Stay hydrated! Aim for 8-10 glasses of water daily, more if you're active. Add electrolytes during intense workouts. Monitor your hydration by checking urine color - it should be light yellow.";
    }
    
    return "That's an interesting question! I'd be happy to help with your nutrition goals. Could you provide more specific details about your current diet, fitness routine, and what you're trying to achieve? This will help me give you more targeted advice.";
  };

  const quickQuestions = [
    "What should I eat after a workout?",
    "How much protein do I need?",
    "Help me create a meal plan",
    "What's good for weight loss?",
    "Best breakfast for fitness?",
    "Should I take supplements?"
  ];

  const nutritionTips = [
    {
      icon: <Apple className="text-red-500" size={24} />,
      title: "Fruits & Vegetables",
      description: "Aim for 5-7 servings daily for vitamins and antioxidants"
    },
    {
      icon: <Beef className="text-orange-500" size={24} />,
      title: "Lean Protein",
      description: "Include protein with every meal for muscle maintenance"
    },
    {
      icon: <Fish className="text-blue-500" size={24} />,
      title: "Healthy Fats",
      description: "Omega-3s from fish, nuts, and avocados support recovery"
    },
    {
      icon: <Carrot className="text-green-500" size={24} />,
      title: "Complex Carbs",
      description: "Whole grains provide sustained energy for workouts"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-purple-500 mb-2">Nutrition AI</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get personalized nutrition advice and meal planning support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="card p-6 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Nutrition Advisor</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online • Ready to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map(msg => (
                <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-primary-500 text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-end gap-3 justify-start">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about nutrition..."
                  className="flex-1 input-primary"
                />
                <button 
                  onClick={handleSend} 
                  className="bg-purple-500 text-white rounded-full p-3 hover:bg-purple-600 transition-colors disabled:bg-gray-400"
                  disabled={input.trim() === ''}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-primary-500" />
              Quick Questions
            </h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-warning-500" />
              Nutrition Tips
            </h3>
            <div className="space-y-4">
              {nutritionTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage; 