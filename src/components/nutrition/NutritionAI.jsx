import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ChefHat, Apple, Beef, Fish, Leaf, Coffee, Wine } from 'lucide-react';

const NutritionAI = ({ chatMessages, setChatMessages, chatInput, setChatInput, chatEndRef }) => {
  const [isTyping, setIsTyping] = useState(false);

  // Nutrition knowledge base
  const nutritionResponses = {
    'protein': {
      keywords: ['protein', 'muscle', 'meat', 'chicken', 'fish', 'eggs', 'beans'],
      responses: [
        "Protein is essential for muscle building and repair. Aim for 0.8-1.2g per pound of body weight. Good sources include lean meats, fish, eggs, dairy, legumes, and plant-based proteins.",
        "For muscle growth, consume protein within 30 minutes after your workout. Whey protein, chicken breast, and Greek yogurt are excellent post-workout options.",
        "Complete proteins contain all essential amino acids. Animal sources are complete, while plant sources like quinoa, soy, and hemp seeds are also complete proteins."
      ]
    },
    'carbs': {
      keywords: ['carbohydrates', 'carbs', 'energy', 'bread', 'rice', 'pasta', 'fruit'],
      responses: [
        "Carbohydrates are your body's primary energy source. Complex carbs like whole grains, fruits, and vegetables provide sustained energy for workouts.",
        "Timing matters! Eat carbs 2-3 hours before exercise for energy, and within 30 minutes after for recovery. Simple carbs post-workout help replenish glycogen.",
        "Focus on complex carbohydrates like oats, sweet potatoes, quinoa, and brown rice. These provide fiber and sustained energy release."
      ]
    },
    'fats': {
      keywords: ['fats', 'fat', 'healthy fats', 'omega', 'avocado', 'nuts', 'olive oil'],
      responses: [
        "Healthy fats are crucial for hormone production and nutrient absorption. Include avocados, nuts, olive oil, and fatty fish in your diet.",
        "Omega-3 fatty acids support recovery and reduce inflammation. Eat fatty fish like salmon 2-3 times per week or consider fish oil supplements.",
        "Aim for 20-35% of your daily calories from healthy fats. Avoid trans fats and limit saturated fats from processed foods."
      ]
    },
    'meal timing': {
      keywords: ['meal timing', 'when to eat', 'pre workout', 'post workout', 'breakfast', 'dinner'],
      responses: [
        "Eat a balanced meal 2-3 hours before exercise. Post-workout, consume protein and carbs within 30 minutes for optimal recovery.",
        "Don't skip breakfast! It kickstarts your metabolism and provides energy for the day. Include protein, complex carbs, and healthy fats.",
        "Space meals 3-4 hours apart to maintain stable blood sugar and energy levels throughout the day."
      ]
    },
    'hydration': {
      keywords: ['water', 'hydration', 'drink', 'dehydrated', 'fluids'],
      responses: [
        "Stay hydrated! Drink 8-12 cups of water daily, more if you're active. Dehydration can significantly impact workout performance.",
        "Drink 16-20 oz of water 2-3 hours before exercise, and 8-10 oz every 15-20 minutes during intense workouts.",
        "Monitor hydration by checking urine color - pale yellow is ideal. Dark urine indicates you need more water."
      ]
    },
    'supplements': {
      keywords: ['supplements', 'vitamins', 'creatine', 'bcaa', 'protein powder'],
      responses: [
        "Focus on whole foods first, then consider supplements. Protein powder, creatine, and vitamin D are well-researched and beneficial.",
        "Creatine monohydrate is one of the most effective supplements for strength and power. Take 3-5g daily.",
        "Consult with a healthcare provider before starting any supplement regimen, especially if you have medical conditions."
      ]
    },
    'weight loss': {
      keywords: ['weight loss', 'lose weight', 'calorie deficit', 'diet'],
      responses: [
        "Weight loss requires a calorie deficit. Track your food intake and aim for a 300-500 calorie daily deficit for sustainable loss.",
        "Focus on nutrient-dense foods that keep you full longer. Protein and fiber help control hunger and maintain muscle mass.",
        "Combine diet with regular exercise for best results. Strength training helps preserve muscle while losing fat."
      ]
    },
    'muscle gain': {
      keywords: ['muscle gain', 'bulk', 'muscle building', 'hypertrophy'],
      responses: [
        "To build muscle, eat in a slight calorie surplus (200-300 calories above maintenance) with adequate protein (1.6-2.2g per kg body weight).",
        "Progressive overload in your workouts combined with proper nutrition is key for muscle growth. Focus on compound movements.",
        "Eat protein with every meal and consider casein protein before bed for overnight muscle protein synthesis."
      ]
    }
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let response = '';
    
    // Check for specific nutrition topics
    for (const [topic, data] of Object.entries(nutritionResponses)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
        response = randomResponse;
        break;
      }
    }

    // Default responses for general questions
    if (!response) {
      const defaultResponses = [
        "Great question! For personalized nutrition advice, consider your goals, activity level, and dietary preferences. What specific aspect of nutrition would you like to know more about?",
        "Nutrition is highly individual. I'd be happy to help you with specific questions about protein, carbs, fats, meal timing, or supplements. What's your main concern?",
        "That's an interesting nutrition question! To give you the best advice, could you tell me more about your fitness goals and current eating habits?",
        "I'm here to help with your nutrition questions! Whether it's about meal planning, supplements, or specific nutrients, just ask and I'll provide evidence-based guidance."
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    return response;
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;

    const userMessage = chatInput.trim();
    const newMessages = [...chatMessages, { id: Date.now(), text: userMessage, sender: 'user' }];
    setChatMessages(newMessages);
    setChatInput('');

    // Simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay for more natural feel
  };

  const quickQuestions = [
    "What should I eat before a workout?",
    "How much protein do I need?",
    "Best post-workout meal?",
    "How to stay hydrated?",
    "Supplements for beginners?",
    "Meal timing tips?"
  ];

  const handleQuickQuestion = (question) => {
    setChatInput(question);
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Nutrition AI</h1>
      <p className="text-gray-400 mb-8">Get personalized nutrition advice and meal planning tips.</p>
      
      <div className="bg-gray-800 rounded-2xl flex flex-col flex-grow border border-gray-700 shadow-2xl">
        {/* Quick Questions */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full hover:bg-gray-600 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot size={20} />
                </div>
              )}
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-cyan-500 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot size={20} />
              </div>
              <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
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

        {/* Input Area */}
        <div className="mt-4 flex items-center gap-2 border-t border-gray-700 p-4">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about nutrition, meal planning, or supplements..."
            className="w-full bg-gray-700 rounded-full py-3 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button 
            onClick={handleSendMessage} 
            className="bg-purple-500 text-white rounded-full p-3 hover:bg-purple-600 transition-colors disabled:bg-gray-600"
            disabled={!chatInput.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionAI; 