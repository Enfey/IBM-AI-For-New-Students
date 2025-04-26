# AI for New Students


## Project Overview
**AI for New Students** is an intelligent chatbot project designed for freshmen to help them quickly adjust to campus life. Developed by Team 32, the project used Watsonx Assistant API to build a dialogue-based AI assistant that answers common questions and provides personalized recommendations.
Project Goals and Vision



## Website

The website was deployed using [Vercel](https://vercel.com/), here is the link: [https://team32-project-sandy.vercel.app/](https://team32-project-sandy.vercel.app/) 



## Mascot and Main Page

### Mascot

<div>
    <img src="./docs/mascot/duck.png" alt="Design Prototype" height="400">
</div>


### Some front-end design (mobile)

> [!Note]
>
> You can see more information at this [folder](docs/design-final/mobile).



<div>
    <img src="docs/design-final/mobile/Screenshot 2025-04-26 124400.png" alt="Design Prototype" height="400">
    <img src="docs/design-final/mobile/Screenshot 2025-04-26 124441.png" alt="Design Prototype" height="400">
    <img src="docs/design-final/mobile/Screenshot 2025-04-26 124617.png" alt="Design Prototype" height="400">
    <img src="docs/design-final/mobile/Screenshot 2025-04-26 124630.png" alt="Design Prototype" height="400">
</div>    




### Some front-end design (PC)

> [!Note]
>
> You can see more information at this [folder](docs/design-final/pc).



<div>
    <img src="docs/design-final/pc/Screenshot 2025-04-26 123737.png" alt="Design Prototype" height="400">
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
├── scripts/           # Webhook scripts
└── data/              # Dataset for RAG training
```



## **Tech Stack**

- **Frontend**: Carbon React, Next.js, Live2d
- **Backend**: IBM Watsonx Assistant API, IBM Watson.ai, OpenAI API, Google Map API, Milvus, Langchain, Firebase, FastAPI 
- **Testing**: Lighthouse, Jest unit testing, User Testing 
- **Project Management**: Agile / Scrum, Kanban Board (via [Trello](https://trello.com/b/udjBpvNW/ibm-ai-for-new-students))  



## **Installation and Setup** locally
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://projects.cs.nott.ac.uk/comp2002/2024-2025/team32_project.git
   ```

2. **Install dependencies:** (either yarn or npm)
   
   ```bash
   yarn install
   ```
   
3. **Build the project:**
   ```bash
   next build
   ```

4. **Start the local server:**
   
   ```bash
   next start
   ```
   
5. **Access the application:**
   Open your browser and navigate to:
   
   ```
   http://localhost:3000
   ```



Additionally, you need to config your API variable follow the format of the env.example file. You have to include all your information for the Watsonx Assistant, Firebase instance, Google map API and the Deepseek API for translation.

> [!IMPORTANT]
>
> Please note that you have to deploy the FastAPI (the package inside of the script) to enable the RAG, and change the Link inside of the Watsonx Assistant.



## **How to Use**

1. **Ask Questions**: Users can ask questions like "Where is the library?" or "How can I pay the tuition fee?".
2. **Get Personalized Recommendations**: The chatbot provides customized suggestions based on the student’s interests and behavior.
3. **Create new Session:** Users can create a new session which is a similar idea to the chat history to restart their conversation.
4. **Feedback/Introduction Page:** Users can see the latest announcement on the website with all possible ways to contact us. Additionally, a designed product page is accessible in the side menu bar.



## Key Features

1. ***Conversation flow***: Powered by Wasonx assistant, the app provides different action routes for users like location searching and so on.

2. ***Log in/out***: Utilizing firebase, we built a safe login/logout authentication.

3. ***RAG***: Using milvus and langchain, we built a RAG extension, and it is deployed on Azure with the help of Docker container technique.

4. ***Google Map embedded***: With the help of Google Map API, we successfully embed a dynamic map in our website for location searching use case.

5. ***Setting***: We allow users to change the theme of the app, more features might be developed in the future.

6. ***History***: The app use automatically record the history using sessionID as the primary key.

   > [!Warning]
   >
   > We currently can not recall the history but only recording them, since we only have access to the lite plan of the watsonx assistant.

7. ***Live2d***: We made our own live2d using Cubism, then with the help of oh-my-live2d (a open project on github the it is implemented on our website)

8. ***Other Pages***: Other pages like Contact Us, Announcement, About, Resources were added to provide a better user experience, also benefitting our future updating.



## **Key Topics**

- **Personalized Recommendations**: Tailored suggestions using RAG.
- **Location searching**: The students can get detailed location searching assistance in our website.
- **Campus Introduction**: provide a brief introduction of the campus.  
- **IT service**: Provide service help to the students' IT issues.



## **Progress**

| **Phase**                 | **Description**                              | **Completion Date** | **Status**  |
|---------------------------|----------------------------------------------|---------------------|-------------|
| **Project Initiation**    | Define goals, roles, and scope               | 2024-09-28          | ✅ Complete  |
| **Requirement Analysis**  | Document requirements and use cases          | 2024-11-04          | ✅ Complete  |
| **System Design**         | Create prototype with IBM styles             | 2024-11-11          | ✅ Complete  |
| **Watsonx Assistant API** | Link the assistant instance to our page (v1) | 2024-12-06        | ✅ Complete |
| **Initial Page Setup**    | Create the intial page with Carbon React     | 2024-12-13          | ✅ Complete |
| **Conversation Training** | Train the model on the IBM website           | 2025-1-13 | ✅ Complete |
| **Live2d model creating** | Create a live2d mascot to attract students   | 2025-2-13  | ✅ Complete |
| **RAG building** | Using RAG as a complement for the main conversation flow | 2025-2-23  | ✅ Complete |
| **Front-end enhancement** | Enhance the front-end side using carbon react components | 2025-3-20 | ✅ Complete |
| **Deployment** | Deploy the RAG on Azure and deploy the website on Vercel | 2025-3-20 | ✅ Complete |
| **New possible features** | Gather idea of new possible features | 2025-4-07 | ✅ Complete |
| **Testing & QA** | Conduct testing and bug fixes | 2025-4-30 | ✅ Complete |



## **Usage Scenarios** (Main Use cases)

> [!TIP]
>
> We currently only focused on a few use case and let the OpenAI model with RAG to deal the other users' question.

- **Freshman Onboarding**: New students can ask questions about facilities, schedules, and orientation activities.
- **Campus Navigation**: Students can request navigation assistance for campus buildings.
- **Event Recommendations**: Students can receive personalized event and activity suggestions.
- **Campus related problem**: Students can ask some additional questions like EC problem and tuition problem...



## **Testing**

We employ **User Testing**, **Lighthouse** and **Jest unit testing** to ensure high code quality. Tests are located in the `tests/` directory.



## **Project Management**

We follow the **Agile/Scrum** methodology and manage our tasks using our [Trello Board](https://trello.com/b/udjBpvNW/ibm-ai-for-new-students). Key development phases include:
1. **Sprint Planning**
2. **Daily Standups**
3. **Backlog Grooming**
4. **Sprint Reviews**



## **Contact and Support**

If you have questions or need support, please contact:
- **Team Leader**: Roberto Da Silva
- **Git Lead**: Zefei Xie 



## **Acknowledgements**

We would like to thank IBM for providing support and access to the Watsonx  Assistant API, as well as all team members for their hard work and dedication. In addition, thank you to all the users who participated in our user test!

