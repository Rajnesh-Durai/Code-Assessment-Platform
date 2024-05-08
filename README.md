## Overview

The Assessment Portal is a comprehensive online coding assessment platform designed to elevate programming skills. Developed with cutting-edge technologies like React, .NET Core, SQL Server, and Azure, this platform integrates various services such as a self-hosted Judge0 API for code compilation, Phi-2 for code validation, Azure Blob for image storage, TensorFlow.js for object detection, chatbot for user assistance and emailjs for automatic email triggering upon completion of assessment.
## Architecture Diagram
![Architecture Diagram drawio](https://github.com/kanini/ht23-team19-repo/assets/127297740/6ce9b9fe-a5c4-4a77-9f84-8b1c24ae1deb)


## Flow Diagram
![Architecture Diagram](https://github.com/kanini/ht23-team19-repo/assets/127297563/7b911978-5158-4c07-ab97-8404940e58d8)

## Features

### 1. Monaco Editor Integration

A feature-rich code editor powered by Monaco Editor, enabling users to write, test, and submit code solutions seamlessly.

### 2. Judge0 API (Self-hosted)

The platform utilizes a self-hosted Judge0 API for managing code compilation and execution, providing real-time feedback on code performance and correctness.

### 3. Phi-2 Validation

Phi-2, a sophisticated validation system, ensures code security and adherence to ethical coding practices. It verifies code submissions after compilation.

### 4. Chatbot Integration

A conversational assistant is integrated to provide users with immediate assistance, guidance during assessments, and answers to common queries.

### 5. Results Storage (SQL Server)

Assessment results, user details, and code metrics are stored in a SQL Server database for robust analysis, reporting, and tracking of user progress.

### 6. Azure Blob Storage

Azure Blob Storage is employed for efficiently storing images related to assessments, ensuring a secure and scalable solution.

### 7. TensorFlow.js for Object Detection

TensorFlow.js is harnessed for real-time object detection in images, enhancing assessment security by identifying any potential irregularities.

### 8. Video Monitoring

Ensuring a fair and secure assessment environment with real-time video monitoring, further enhancing the integrity of the evaluation process.

### 9. Email js

Implementing Email.js enables automatic email triggering upon completion of assessments, streamlining communication and notification processes seamlessly.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [.NET Core](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Azure Blob Storage Account](https://azure.microsoft.com/en-us/services/storage/blobs/)
- [TensorFlow.js](https://www.tensorflow.org/js)
## Usage

1. **User Registration:**
    - Register or log in to the portal.

2. **Assessment Initiation:**
    - Initiate a coding assessment from the dashboard.

3. **Code Writing and Testing:**
    - Utilize the Monaco Editor to write and test code solutions.

4. **Code Submission:**
    - Submit code solutions for compilation and validation.

5. **Chatbot Interaction:**
    - Interact with the chatbot for immediate assistance.

6. **Results Monitoring:**
    - Monitor assessment results on the dashboard.
## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Judge0 API](https://github.com/judge0/api)
- [Phi-2](https://huggingface.co/microsoft/phi-2)
- [TensorFlow.js](https://www.tensorflow.org/js)
