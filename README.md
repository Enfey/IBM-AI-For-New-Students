# AI for New Students


## Project Overview
**AI for New Students** is an intelligent chatbot project designed for freshmen to help them quickly adjust to campus life. Developed by Team 32, the project uses Watsonx Assistant Api to build a dialogue-based AI assistant that answers common questions and provides personalized recommendations.
Project Goals and Vision

### Mascot and Main Page
<div>
    <img src="./docs/mascot/duck.png" alt="Design Prototype" height="400">
    <img src="./docs/design-prototypes/iPhone 13 & 14 - Speech Bubbles.png" alt="Design Prototype" height="400">
</div>


## Project Goals and Vision
The vision of this project is to create an intuitive AI assistant that empowers students to independently navigate university life. By reducing reliance on human support staff, it provides students with timely, accessible, and personalized guidance. In the future, this system aims to expand to support multiple campuses and deliver cross-cultural assistance.


## Team members
- **Team Leader**: Roberto Da Silva
- **Group Admin**: Oliver Fines
- **Git Lead**: Zefei Xie
- **Core Members**: Connor Saxton, Trey Kilian Alcantara, Felix Riley-Kay, Jeshuran Jebanesan, Parth Amreliya


## Directory Structure
```plaintext
AI-for-New-Students/
│
├── src/               # Source code files
├── tests/             # Test files
├── docs/              # Project documentation
├── config/            # Configuration files
├── scripts/           # Possible scripts
└── data/              # Dataset (if any)
```

## **Tech Stack**
- **Frontend**: Carbon React, Next.js, Node.js 
- **Backend**: IBM Watsonx Assistant API
- **Testing**: Lighthouse, Jest unit testing 
- **Project Management**: Agile / Scrum, Kanban Board (via [Trello](https://trello.com/b/udjBpvNW/ibm-ai-for-new-students))  



## **Installation and Setup**
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://projects.cs.nott.ac.uk/comp2002/2024-2025/team32_project.git
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Build the project:**
   ```bash
   yarn build
   ```

4. **Start the local server:**
   ```bash
   yarn dev
   ```

5. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```


## **How to Use**
1. **Ask Questions**: Users can ask questions like "Where is the library?" or "How do I book a sports facility?".
2. **Get Personalized Recommendations**: The chatbot provides customized suggestions based on the student’s interests and behavior.


## **Key Features**
- **Personalized Recommendations**: Tailored suggestions based on user input.
- **Location searching**: The students can get detailed location searching assistance in our website.
- **Campus Introduction**: provide a brief introduction of the campus.  
- **IT service**: Provide service help to the students' IT issues.
- **Clear Design**: Easy-to-use interface for smooth interaction.


## **Progress**
| **Phase**                 | **Description**                              | **Completion Date** | **Status**  |
|---------------------------|----------------------------------------------|---------------------|-------------|
| **Project Initiation**    | Define goals, roles, and scope               | 2024-09-28          | ✅ Complete  |
| **Requirement Analysis**  | Document requirements and use cases          | 2024-11-04          | ✅ Complete  |
| **System Design**         | Create prototype with IBM styles             | 2024-11-11          | ✅ Complete  |
| **Watsonx Assistant API** | Link the assistant instance to our page (v1) | 2024-12-06          | ✅ Complete |
| **Initial Page Setup**    | Create the intial page with Carbon React     | 2024-12-13          | ✅ Complete |
| **Conversation Training** | Train the model on the IBM website           | --------            | 🚀 In Progress|
| **Live2d model creating** | Create a live2d mascot to attract students   | --------            | 🚀 In Progress|
| **Testing & QA**          | Conduct testing and bug fixes                | --------            | 🔄 Upcoming  |



## **Usage Scenarios**
- **Freshman Onboarding**: New students can ask questions about facilities, schedules, and orientation activities.
- **Campus Navigation**: Students can request navigation assistance for campus buildings.
- **Event Recommendations**: Students can receive personalized event and activity suggestions.


## **Testing**
We employ **Lighthouse** and **Jest unit testing** to ensure high code quality. Tests are located in the `tests/` directory.


## **Project Management**
We follow the **Agile/Scrum** methodology and manage our tasks using a **Kanban board** on Trello. Key development phases include:
1. **Sprint Planning**
2. **Daily Standups**
3. **Backlog Grooming**
4. **Sprint Reviews**


## **Contact and Support**
If you have questions or need support, please contact:
- **Team Leader**: Roberto Da Silva
- **Git Lead**: Zefei Xie 


## **Acknowledgements**
We would like to thank IBM for providing support and access to the Watsonx  Assistant API, as well as all team members for their hard work and dedication.


