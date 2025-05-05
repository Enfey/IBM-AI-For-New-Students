/**
 * Data for the About Us section, formatted for use in an InfoSection component.
 */
export const aboutData = {
    title: "About Us",
    introduction: "We are Team 32, a dedicated group of developers and AI enthusiasts working together to create innovative solutions for real-world problems. Our team is composed of talented individuals with diverse skill sets, united by a passion for technology and a commitment to excellence.",
    subsections: [
      {
        title: "Our Team",
        items: [
          { label: "Team Leader", content: "Roberto Da Silva" },
          { label: "Group Admin", content: "Oliver Fines" },
          { label: "Git Lead", content: "Zefei Xie" },
          { label: "Core Members", content: "Connor Saxton, Trey Kilian Alcantara, Felix Riley-Kay, Jeshuran Jebanesan, Parth Amreliya" }
        ]
      }
    ]
  };

/**
 *  * Data for the Project section, formatted for use in an InfoSection component.
 */
export const projectData = {
    title: "About Our Project",
    introduction: "AI for New Students is an intelligent chatbot designed to help freshmen quickly adapt to campus life. Developed by Team 32, this project leverages cutting-edge technologies to provide a seamless and personalized experience for new students.",
    subsections: [
      {
        title: "Key Features",
        items: [
          "RAG: Provides the university related information for the chatbot.",
          "Map Embedding: Google Maps API is used to provide the location-based information for the chatbot.",
          "Translation: The chatbot can translate text from one language to another.",
          "Firebase: The chatbot is integrated with Firebase for user authentication and database storage."
        ]
      },
      {
        title: "Technology Stack",
        items: [
          "AI Platform: Watsonx Assistant API.",
          "Milvus: For building the knowledge base for the chatbot.",
          "FastAPI: To deploy the RAG extension on Azure cloud container."
        ]
      }
    ],
    conclusion: "Our goal is to make the transition to university life as smooth as possible for new students, empowering them with the information and support they need to thrive."
  };