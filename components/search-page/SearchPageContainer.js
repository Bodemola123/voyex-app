"use client";

import React from "react";

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

import SearchMain from "../search-page/SearchMain";
import ChatBotContainer from "@/components/search-page/ChatBotContainer";

function SearchPageContainer() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  

  const handleSendMessage = async (message = null) => {
    try {
      const text = message || userInput.trim();
      if (!text) return;
  
      setIsLoading(true);
  
      // User message object
      const userMessage = { text, role: "user", timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput(""); // Reset input field
  
      // Check for a keyword-based hardcoded response
      const hardcodedReply = getHardcodedReply(text);
      if (hardcodedReply) {
        setIsBotTyping(true);
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: hardcodedReply, role: "bot", timestamp: new Date() },
          ]);
          setIsBotTyping(false);
          setIsLoading(false);
        }, 2000);
        return;
      }
  
      // Simulated bot response
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.
            1. Androids and Humans: The novel explores the uneasy coexistence of humans and androids. Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.
            2. Empathy and Identity: To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses.Androids lack empathy, making them vulnerable to detection
            3. Status Symbols: Owning real animals is a status symbol due to mass extinctions. Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.`,
            role: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsBotTyping(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  
  // Function to get a hardcoded reply based on keyword matching
  const getHardcodedReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    const responses = {
      hello: [
        "Hello! I'm your co-voyager, you can call me Voyex. How can I assist you?",
        "Hi there! Need help with something?",
        "Hey! It's great to meet you. What can I do for you today?",
      ],
      help: [
        "I'm here to help! What do you need assistance with?",
        "Sure! Let me know how I can assist you.",
        "Of course! What do you need help with?",
      ],
      price: [
        "Our pricing varies based on features. Would you like more details on pricing plans?",
        "Looking for pricing info? I can guide you on that!",
        "We offer different pricing plans. Which features are you interested in?",
      ],
      support: [
        "You can reach out to our support team at support@voyex.com.",
        "Need assistance? Our support team is always ready to help!",
        "If you need support, feel free to contact us anytime!",
      ],
      step: [
        "Based on your inputs, we have created this custom pipeline that will help you generate content around your product and also use it for marketing.",
      ],
      steps: [
        "Based on your inputs, we have created this custom pipeline that will help you generate content around your product and also use it for marketing.",
      ],
      "focus in marketing": [
        "What type of marketing are you focusing on? Are you aiming for brand awareness, user acquisition, engagement, or something else?",
      ],
      "social media marketing": [
        "What is your focus in social media content creation? Are you aiming to educate, entertain, inspire, or promote products/services?",
      ],
      "brand awareness": [
        "Brand awareness is about making your brand recognizable and memorable. Are you looking for organic strategies, paid campaigns, or influencer partnerships?",
        "To improve brand awareness, focus on consistent messaging, engaging storytelling, and leveraging multiple platforms. Need a strategy recommendation?",
        "Building brand awareness requires consistency! Social media, SEO, and partnerships can help. Which area do you need guidance in?",
      ],
      engagement: [
        "Engagement is key to building a strong community! Are you looking to increase likes, comments, shares, or overall interactions?",
        "Boosting engagement requires high-quality content, interactive elements, and audience involvement. Want suggestions on content types?",
        "Engagement grows when you create meaningful interactions. Live Q&As, polls, and community discussions work well! Want help setting up an engagement plan?",
      ],
      "user acquisition": [
        "User acquisition involves attracting new customers through various channels like social media ads, SEO, and partnerships. Are you targeting a specific platform?",
        "Are you focusing on paid ads, organic growth, or referral programs for user acquisition?",
        "Acquiring users is just the first step! Retaining them is equally important. Do you need insights on customer retention as well?",
      ],
      educate: [
        "If you're aiming to educate through your content, focus on delivering valuable and insightful information. Tutorials, how-to guides, and informative articles are great ways to educate your audience. Need help creating educational content?",
        "Educating your audience builds trust and authority. Are you focusing on educational videos, blog posts, or social media infographics to share knowledge?",
        "To educate, consistency and quality are key! Do you need suggestions on educational content formats or tools?",
      ],
      entertain: [
        "If you're aiming to entertain your audience, focus on fun, lighthearted, and engaging content. Memes, challenges, and entertaining videos are great options. Want suggestions for interactive content?",
        "Entertainment drives strong engagement! Are you creating comedy sketches, trending challenges, or fun polls to keep your audience entertained?",
        "To entertain, try mixing humor, creativity, and interactivity. Need help with entertaining content ideas?",
      ],
      inspire: [
        "If your focus is to inspire, create content that resonates emotionally with your audience. Share stories, quotes, and motivational messages. Would you like help crafting inspiring content?",
        "Inspiring content connects deeply with your audience. Are you sharing real-life success stories, motivational posts, or uplifting videos?",
        "Inspiration is about making your audience feel empowered and motivated. Do you need help with inspiring content creation?",
      ],
      promote: [
        "If you're focused on promotion, make sure your content is driving action. Showcase your products or services, and highlight their benefits. Need help with promotional campaigns?",
        "Promotional content needs to be clear and persuasive. Are you planning sales announcements, product launches, or special offers for your audience?",
        "To promote effectively, focus on strong calls-to-action and compelling visuals. Do you need assistance with promotional content strategies?",
      ],
      business: [
        "What area of business are you focusing on? Is it product-based, service-based, digital, or something else?"
      ],
      brainstorming: [
        "What kind of ideas are you brainstorming? Are they for business, creative projects, academic work, or something else?"
      ],
      "managing my task": [
        "What type of task management are you looking for? Do you need project planning, daily to-do lists, collaboration tools, or something else?"
      ],
      "design skills": [
        "What aspect of design are you focusing on? Are you interested in graphic design, motion graphics, or something else?"
      ],
      "automate my workflow": [
        "What kind of automation do you need? Are you looking to automate marketing, scheduling, data entry, or something else?"
      ],
      "analyzing my data":[
        "What type of data analysis are you working on? Are you dealing with business analytics, research data, machine learning, or something else?"
      ],
      "improve my writing skills":[
        "What area of writing do you want to improve? Are you focused on creative writing, technical writing, copywriting, or something else?"
      ],
      "tool for team collaboration":[
        "What kind of collaboration do you need? Are you looking for project management, document sharing, team communication, or something else?"
      ],
      "create an online course":[
        "What part of course creation do you need help with? Are you working on content creation, course hosting, student engagement, or something else?"
      ],
      "product-based": [
        "Product-based businesses require strong supply chain management and branding. Are you looking for manufacturing, e-commerce, or retail strategies?",
        "Selling physical products? Consider logistics, distribution channels, and branding. Need guidance on any of these?",
        "For a product-based business, sourcing and marketing are key. Would you like insights on production or customer acquisition?",
      ],
      "course hosting":[
        "When it comes to course hosting, there are several great platforms available, like Teachable, Thinkific, and Udemy. Would you like to know more about which platform could suit your needs?",
        "For hosting your online course, choosing the right platform is key! Some platforms allow full control over branding and content, while others offer built-in audiences. Are you leaning towards any particular platform?",
        "Course hosting involves setting up a platform where your students can access content. Some platforms also allow you to create quizzes, track progress, and manage payments. Do you need recommendations on platforms?",
      ],
      "student engagement": [
        "Engaging students is critical for the success of any online course. Gamification, interactive content, and live sessions can really boost engagement. Would you like tips on improving student interaction?",
        "To improve student engagement, try incorporating regular quizzes, community discussion boards, and live Q&A sessions. Are you looking for engagement tools or strategies?",
        "Engagement is all about keeping your students motivated. Are you considering adding interactive elements like challenges, progress tracking, or personalized feedback to your course?",
      ],
      "service-based": [
        "A service-based business thrives on customer relationships and expertise. Are you offering consulting, freelancing, or local services?",
        "Services require strong client acquisition and retention. Do you need help with marketing, pricing, or customer engagement?",
        "Scaling a service-based business means optimizing workflow and client communication. Which area do you need advice on?",
      ],
      "digital": [
        "Digital businesses can include online courses, SaaS, or digital products. Are you interested in content creation, software development, or another area?",
        "Running a digital business? Monetization models like subscriptions and one-time sales matter. Do you need help choosing one?",
        "Digital products scale differently from physical ones. Would you like help with marketing or platform selection?",
      ],
      "academic work": [
        "Academic work often involves research and structuring ideas. Are you working on an essay, thesis, or publication?",
        "Need help with academic projects? I can assist with research tools, writing strategies, and citation management.",
        "Writing academically requires clarity and structure. Do you need help with formatting, argumentation, or research?",
      ],
      "project planning": [
        "Project planning needs clear goals and timelines. Are you managing a personal project, a team project, or something else?",
        "Effective project planning involves scheduling, task delegation, and progress tracking. Need recommendations on tools?",
        "Want to optimize project planning? Do you need a methodology like Agile, Kanban, or Waterfall?",
      ],
      "daily to-do lists": [
        "A structured daily plan boosts productivity. Are you looking for digital planners, bullet journals, or habit trackers?",
        "Managing daily tasks? Tools like Todoist and Notion can help. Would you like recommendations?",
        "Prioritization is key in daily planning. Would you like guidance on productivity techniques like Eisenhower Matrix?",
      ],
      "team communication": [
        "Effective communication improves teamwork. Are you using Slack, Microsoft Teams, or Discord?",
        "Remote teams thrive with strong communication. Would you like guidance on async vs. real-time messaging?",
        "Need better team collaboration? Would you like help choosing a messaging platform?",
      ],
      "content creation": [
        "Creating course content? Are you focusing on video, text, or interactive materials?",
        "Content drives engagement! Would you like tips on structuring lessons effectively?",
        "Need tools for course content? I can suggest platforms like Teachable or Thinkific.",
      ],
      "collaboration tools": [
        "Collaboration tools help teams stay aligned. Are you looking for document sharing, real-time editing, or communication apps?",
        "Managing teamwork? Platforms like Slack, Trello, and Asana can help. Need help choosing one?",
        "Effective collaboration requires clear workflows. Do you need guidance on task assignments or progress tracking?",
      ],
      "document sharing": [
        "Seamless document sharing is crucial. Are you using Google Drive, OneDrive, or Dropbox?",
        "Need secure file sharing? Would you like help with cloud storage or collaborative editing?",
        "Managing shared documents efficiently boosts teamwork. Need best practices?",
      ],
      "graphic design": [
        "Graphic design requires creativity and the right tools. Do you need help with Adobe tools, Figma, or Canva?",
        "Looking to improve graphic design? Would you like tutorials on typography, composition, or branding?",
        "Graphic design involves layout, colors, and branding. Need help selecting the right software?",
      ],
      "motion graphics": [
        "Motion graphics bring visuals to life! Are you working with After Effects, Blender, or another tool?",
        "Video content thrives with animations. Do you need help with transitions, effects, or motion branding?",
        "Want to learn motion design? Would you like beginner-friendly tools or advanced animation techniques?",
      ],
      "marketing": [
        "Marketing automation saves time and scales outreach. Are you looking into email marketing, social media, or CRM automation?",
        "Automating marketing can improve efficiency. Do you need recommendations for tools like HubSpot or Mailchimp?",
        "Streamlining marketing with automation boosts engagement. Do you need guidance on audience segmentation?",
      ],
      "schedule": [
        "Automating scheduling helps with time management. Do you need tools like Calendly, Google Calendar, or Zapier?",
        "Efficient scheduling keeps workflows smooth. Would you like help with appointment setting or reminders?",
        "Need to automate scheduling? AI-powered calendars can help. Want suggestions?",
      ],
      "data entry": [
        "Data entry can be automated with AI. Are you working with spreadsheets, CRM systems, or databases?",
        "Cut down manual work with automation! Do you need help setting up scripts or integrating AI tools?",
        "Looking for automation in data handling? I can suggest RPA tools like UiPath or Power Automate.",
      ],
      "business analytics": [
        "Business analytics drives decisions with data. Do you need insights on dashboards, forecasting, or reporting?",
        "Analyzing business trends? Tools like Tableau, Power BI, and Google Analytics can help. Need recommendations?",
        "Data-driven decisions improve performance. Would you like help setting up key performance indicators (KPIs)?",
      ],
      "research data": [
        "Research data management is key. Are you looking at qualitative, quantitative, or mixed-method research?",
        "Need help organizing research data? Do you need tools like Zotero, Mendeley, or EndNote?",
        "Processing large research datasets? Would you like insights on analysis techniques?",
      ],
      "machine learning": [
        "Machine learning involves data training. Are you focusing on supervised learning, unsupervised learning, or reinforcement learning?",
        "ML models need structured data. Are you working with Python libraries like TensorFlow or scikit-learn?",
        "Want to apply machine learning? I can guide you on datasets, algorithms, or AI frameworks.",
      ],
      "creative writing": [
        "Creative writing requires inspiration and structure. Are you working on fiction, poetry, or storytelling?",
        "Storytelling is an art! Would you like help with character development, plot, or world-building?",
        "Want to refine your writing style? Tools like Grammarly and Hemingway Editor can assist. Need recommendations?",
      ],
      "technical writing": [
        "Technical writing needs clarity. Are you working on documentation, manuals, or tutorials?",
        "Clear documentation is essential! Do you need help structuring technical content?",
        "Writing for tech audiences? Would you like to refine your approach with AI writing assistants?",
      ],
      "copywriting": [
        "Copywriting is persuasive writing. Are you working on ads, landing pages, or email campaigns?",
        "Strong copy converts! Do you need guidance on hooks, CTAs, or brand voice?",
        "Want your copy to sell? I can help with techniques for storytelling and conversion optimization.",
      ],
      "project management": [
        "Managing a project? Are you looking for Agile, Scrum, or traditional methods?",
        "Project success depends on tools and workflows. Do you need software like Jira, Trello, or ClickUp?",
        "Staying organized in projects is key. Do you need task tracking or deadline management tips?",
      ],
      "online course creation": [
        "Creating an online course involves content, platform, and engagement strategies. Need help getting started?",
        "From outline to launch, online course creation takes planning. Are you focused on content or delivery tools?",
        "Building an engaging online course? I can help with structure, hosting platforms, or marketing strategies.",
      ]
    };
  
    // **Priority Keywords**
    const priorityKeywords = [
      "social media marketing",
      "brand awareness",
      "engagement",
      "user acquisition",
      "educate",
      "entertain",
      "inspire",
      "promote"
    ];
  
    // Check for priority keywords first
    for (const keyword of priorityKeywords) {
      if (lowerCaseMessage.includes(keyword)) {
        return responses[keyword][Math.floor(Math.random() * responses[keyword].length)];
      }
    }
  
    // **General Matching with Word Boundaries**
    const matchedKeyword = Object.keys(responses).find((keyword) => 
      new RegExp(`\\b${keyword}\\b`).test(lowerCaseMessage)
    );
  
    if (matchedKeyword) {
      const replies = responses[matchedKeyword];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  
    return null; // No match found
  };
  
 
  

  const handleNewConversation = () => {
    setMessages([]);
    // setChat(null);
  };
  return !showChat ? (
    <SearchMain
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      setShowChat={setShowChat}
      handleSendMessage={handleSendMessage}
    />
  ) : (
    <ChatBotContainer
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      handleSendMessage={handleSendMessage}
      handleNewConversation={handleNewConversation}
      setShowChat={setShowChat}
      isLoading={isLoading}
      isBotTyping={isBotTyping}
      setIsBotTyping={setIsBotTyping}  
    />
  );
}

export default SearchPageContainer;
