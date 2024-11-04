# IBM - AI For New Students
## Initial description
- Essentially, the project is about creating a front-end user interface, *with auth**, that receives user input and outputs a message* to the user.

## Requirements
### Gathering techniques
- Informal requirements gathering - guerilla testing
- Personal experiences
- Student forums - studentroom, reddit, etc.
- Research papers - more technical
- User story driven

### Actors description
- These are the actors used for user stories:
  - **Prospective students**, these students have not completed in-person registration yet but have received an offer to study at the University of Nottingham.
  - **Home students**, these students have already completed in-person registration and are currently studying at the university. 
  - **International students**, these students are similar to the home students but use-cases may differ as they may not be used to UK-based education.
  - **Student**, this actor covers all of the above.
  
### Student needs
- Students need several prerequisites before coming to university:
  - Equipment, dependent on course
  - Online/In-Person registration, some students require visa verification or EUSS submission.
  - Accommodation, recommendations dependent on location, *with permission*
  - Course material, scrape web to find open-source resources in GitHub repositories or other documentation.
  - Valid NottinghamHub account to access their financial and course information.
- Students may need to search for:
  - Recommendations regarding on welcome events occurring around campus, either Jubilee or University Park.
  - Information about various societies based on their preferences, e.g. sport or creative hobbies.
  - Information surrounding well-being, contacts to mental-health officers in the University, one being Claire Kent.
  - Information about subject-specific activities, e.g. Hackathons, Career Fairs or Demonstrations.
  - Information about coursework protocols, such as support plans or ECs.
  
### User story list
- **SINCE THE PROJECT DOES NOT USE PERSONAL DATA, ALL DATA USED WILL BE PUBLIC DOMAIN!**

| ID  | Topic   | As a/an | I want to                                                                | so that                                                                                   | Priority |
|-----|---------|---------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------|
| 1.0 | Website | Student | be able to access the website through entering an URL through my browser | I can use the chatbot to help me with integrating with university life.                   | High     |
| 1.1 | Website | Student | be able to access the website through scanning a QR code on my phone     | I can have an easier to access the website without having to copy and paste a link.       | Low      |
| 1.2 | Website | Student | be able to enter prompts to the chatbot about general university queries | I can receive helpful tips about university life and have a overall good user experience. | Medium   |

nf: intuitive interface for input, not cluttered and complicated, accessible to all people, high-contrast colours, hint text, clear names [ibm accessibility](https://www.ibm.com/able/toolkit/design/ux/)
## Technology stack
### Front-end stack
- `Next.js`, react framework that aims to build on React functionality on server-side responsibilities. Useful for client-server architectures, usually used in websites.
- `HTML/CSS`, building the structure and style of website.

### Back-end stack
- `Node.js`, used for authentication and data-processing with input sanitation.
- `Python`, used for ML and NLP.
- `Database - IBM Db2 or Firebase` (?), used for storing chat history, as both a 'cache' to optimise queries and also for the user to look back upon.

### Language-specific libraries
- `Jest.js`, testing framework for JavaScript, used in TDD and integration testing.
- [Watson Natural Language Processing Library](https://github.com/ibm-ecosystem-engineering/Watson-NLP)

### IBM-specific
- The project utilises IBM's technologies such as:
  - `IBM Cloud`, deploys runners to host various services like a WatsonX instance. Can integrate nicely with Docker using `dockerfile`.
  - `IBM WatsonX`
    - [REST API documentation](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-api.html?context=wx)
    - [Prompt Declaration Language (PDL)](https://github.com/IBM/prompt-declaration-language)
  - `IBM Cognos Analytics`, AI Model designed to take in data source and analyse it, producing tangible results
    - [Getting started with IBM Cognos Analytics](https://www.ibm.com/docs/en/cognos-analytics/11.1.0?topic=started-getting-cognos-analytics)
  - `IBM Carbon React`, paired with Native React but uses components for design
    - [Carbon react source code](https://github.com/carbon-design-system/carbon)
    - [Carbon react documentation](https://carbondesignsystem.com/developing/react-tutorial/overview/)

## Notes
- Auth is still TBD in terms of implementation since the topic has not been discussed with the IBM sponsor yet.
- With regard to visual input, the design will be determined during the sprint but it should be digestible to the average new university student, ideally not stimulating and delivers information in an efficient matter.
- Also need to clarify whether the chatbot is for all universities or specialised for the **University of Nottingham**.
- [Trello link](https://trello.com/b/udjBpvNW/ibm-ai-for-new-students)