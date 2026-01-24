import { Navbar } from "../../../components/NavTools";
import { DarkModeToggle } from "../../../components/ViewMode.tsx";
import { PopUp } from "./PopUp.tsx";
import catpfp from "../../../assets/catpfp.jpg";

const DevList = ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"];
const TechList = ["Git", "Linux/WSL", "React", "TailWindCSS",  "Django", "AWS (S3, EC2, DynamoDB)", "Oracle DB", "PostgreSQL"];

export default function Project() {
  return (
    <main className="overflow-hidden h-screen bg-linear-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <div className="hidden md:block"><DarkModeToggle className="absolute top-4 right-4"/></div>
      <div className="md:shadow-xl md:dark:border-2 md:dark:border-white md:w-8/10 mx-4 rounded-xl md:p-6">
        <header className="flex justify-between items-center text-slate-900 dark:text-white text-xl dark:border-b-2 md:h-8 sticky bg-transparent">
          <Navbar />
          <div className="md:hidden"><DarkModeToggle/></div>
        </header>

        <article className="h-[90vh] md:h-[80vh] text-slate-900 dark:text-white md:mx-5 overflow-y-auto no-scrollbar cursor-default">
            <section className="flex mt-2 items-center justify-center">
                <div className="flex-col p-5 md:px-3 md:py-3 text-white bg-cyan-700 shadow-xl dark:bg-emerald-600 rounded-lg text-sm md:text-base">
                    <p>Currently accepting offers via my work email!</p>
                    <p>I do data analysis, data preprocessing, web development, and API development :)</p>
                </div>
            </section>

            <section className="block:md md:columns-2 pt-8 pb-5 md:pl-5 text-slate-900 dark:text-white">
              <h1 className="text-left font-bold text-2xl md:text-3xl">TECHNOLOGIES</h1>
                <div className="flex flex-wrap mb-5">
                    {TechList.map(skill => {
                      return (
                        <div className="m-1 p-2 text-center rounded-lg shadow-xl dark:border-1 dark:border-white hover:scale-[90%]">
                          {skill}
                        </div>
                      )
                    })}
                </div>
                <h1 className="text-left font-bold text-2xl md:text-3xl">LANGUAGES</h1>
                <div className="flex flex-wrap mb-5">
                    {DevList.map(skill => {
                      return (
                        <div className="m-1 p-2 text-center rounded-lg shadow-xl dark:border-1 dark:border-white hover:scale-[90%]">
                          {skill}
                        </div>
                      )
                    })}
                </div>
            </section>
            <hr className="border-transparent dark:border-1 dark:border-white text-slate-900 dark:text-white md:m-5"></hr>
            <section>
                <h1 className="mt-8 md:px-5 font-bold text-3xl">
                    DATA SCIENCE
                </h1>
                <div className="mt-2 md:px-5 grid md:grid-cols-2 gap-10">
                  <div>
                    <PopUp 
                      title="Applying Graph Neutral Network to Cardiovascular Data" 
                      content="This project processes, analyzes, and models ECG data by combining data cleaning, visualization, feature engineering, and graph-based deep learning. The workflow begins by loading a heart-disease dataset, assigning diagnostic labels based on AHA codes, and generating demographic and abnormal-reading visualizations across sex and age groups. The script then cleans the dataset, expands multi-code AHA diagnoses into separate fields, removes modifiers, attaches textual diagnostic descriptions, and exports the fully prepared metadata to a new CSV file. Next, it reads raw ECG signals from HDF5 files, denoises them using FFT, and extracts frequency-domain features, statistical signal descriptors, and patient metadata to build node feature vectors. Each ECG is then transformed into a graph in which 12 ECG leads plus one metadata node form a fully connected network. A multi-label GATv2 model is trained using PyTorch Geometric to predict cardiac conditions based on these graphs, with performance evaluated through F1 score, precision, recall, and accuracy. After training, the model’s internal graph embeddings are extracted and used to train a second-stage GCN classifier for binary tasks such as abnormality or myocardial infarction detection. Finally, the script visualizes training histories for both models and evaluates the performance of the downstream GCN classifier." 
                      tags={["Python", "PyTorch", "Pandas", "Numpy", "Matplotlib"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/GNN-Heart-Conditions"
                    />
                  </div>
                  <div>
                    <PopUp 
                      title="Applying Random Forest Classifier to COVID-19 Comorbidities Mortality Rate" 
                      content="This project analyzes CDC reported COVID-19 mortality data by building a model that predicts the likelihood of death based on underlying medical conditions and age groups in the United States. The script begins by loading a national dataset from a CSV file and filtering it so that only rows representing the United States are included. It then removes unnecessary columns, excludes age groups that are not meaningful for analysis, and drops any rows that contain missing values. After preparing the dataset, the script defines two feature columns, which are the medical condition and the age group, and a target variable that represents the number of reported COVID-19 deaths. It then calculates what percentage each condition contributes to total deaths and assigns each condition to a category labeled Low, Medium, or High based on that percentage. These categories become the classification targets for the model. The data is split into training and testing sets, and categorical features are encoded using one hot encoding so that they can be processed by the machine learning model. A Random Forest classifier is then trained on the encoded training data and used to make predictions on the test set. Visualizations are generated to show how different medical conditions and different age groups contributed to COVID-19 deaths, using percentage based bar charts. The script finishes by printing the accuracy of the model and the full classification report, which summarizes how well the classifier performed." 
                      tags={["Python", "Sklearn", "Pandas", "Seaborn", "Matplotlib"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/COVID-19-Data-Project/blob/main/COVID-19%20Data%20Set%20Data%20Mining%20Project.py"/>
                  </div>
                </div>
            </section>
            <hr className="border-transparent dark:border-1 dark:border-white text-slate-900 dark:text-white my-10 md:m-5"></hr>
            <section>
                <h1 className="mt-8 md:px-5 font-bold text-3xl">
                    CLOUD COMPUTING
                </h1>
                <div className="mt-2 md:px-5 grid md:grid-cols-2 gap-10">
                  <div>
                    <PopUp 
                      title="Creating AWS S3 Buckets and Uploading Files" 
                      content="This demo automates the process of uploading files to an Amazon S3 bucket using Python and the Boto3 SDK. The script retrieves a secure local directory path from an environment variable, scans all files within it, and uploads each one into a user-defined folder inside an S3 bucket. To ensure the uploaded content is accessible as intended, the script modifies the bucket’s public access block settings and applies a public-read ACL." 
                      tags={["Python", "AWS", "Boto3", "S3"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/AWSDemo"
                    />
                  </div>
                  <div>
                    <PopUp 
                      title="Initiating an AWS EC2 Instance and Attaching Volumes" 
                      content="This Python script automates the provisioning and configuration of an Amazon EC2 environment using Boto3. It generates a new key pair and stores it locally, creates a security group with HTTP (port 80) and SSH (port 22) access, and launches a t2.micro EC2 instance using a specified AMI. After the instance begins running, the script allocates a separate 30-GB EBS volume in the same availability zone and attaches it to the instance as an additional storage device. The workflow handles instance creation, network permissions, key management, and volume attachment in a fully automated sequence." 
                      tags={["Python", "AWS", "Boto3", "EC2", "Cloud Watch"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/AWSDemo"
                    />
                  </div>
                  <div>
                    <PopUp 
                      title="Configuring routes in AWS Virtual Private Cloud" 
                      content="This Python script programmatically builds a complete AWS network environment using Boto3. It creates a new VPC with a /16 CIDR block, attaches an Internet Gateway, and sets up a public route table with open outbound internet access. Within the VPC, it provisions a public subnet and a private subnet, and associates the public subnet with the internet-routed table. Two security groups are created: one allowing inbound HTTP traffic from the internet for public resources, and another allowing unrestricted internal traffic within the VPC. Using this configuration, the script launches two EC2 instances: one in the public subnet with a public IP address, and one in the private subnet without internet exposure. Both are deployed using the same key pair, and each instance is attached to the appropriate security group. The script fully automates the creation of VPC components, routing, security controls, and EC2 deployment." 
                      tags={["Python", "AWS", "Boto3", "EC2", "VPC"]} image={catpfp} link="https://github.com/OliverVillalta/AWSDemo"/>
                  </div>
                  <div>
                    <PopUp 
                      title="Creating Tables and Querying with AWS DynamoDB" 
                      content="This project automates the creation and use of a DynamoDB table designed to store student information. The script begins by creating a table named StudentInfo with a primary key of StudentID and additional attributes for first name, last name, and major. It also provisions three Global Secondary Indexes: one for first names, one for last names, and one for majors- to enable efficient lookup beyond the primary key. After the table is created and becomes active, the script inserts a predefined list of student records into the database. It then performs several read operations, including queries that retrieve students by first name, major, and student ID, as well as scans that return all students whose first name, last name, or major begins with a specified letter. Each result is printed to the console, demonstrating different ways to interact with and filter data in DynamoDB." 
                      tags={["Python", "AWS", "Boto3", "EC2", "DynamoDB"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/AWSDemo"
                    />
                  </div>
                </div>
            </section>
            <hr className="border-transparent dark:border-1 dark:border-white text-slate-900 dark:text-white my-10 md:m-5"></hr>
            <section>
                <h1 className="mt-8 md:px-5 font-bold text-3xl">
                  WEB DEVELOPMENT
                </h1>
                <div className="mt-2 md:px-5 grid md:grid-cols-2 gap-10">
                  <div>
                    <PopUp 
                      title="Portfolio Site" 
                      content="Developed a web application using React and Tailwind CSS, focusing on responsive design patterns and good practices. Built cloud infrastructure on AWS, deploying the application on an EC2 instance and utilizing NGINX to handle reverse proxy." 
                      tags={["React", "TypeScript", "TailWindCSS", "Vite", "Python", "AWS"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta"
                    />
                  </div>
                  <div>
                    <PopUp 
                      title="Hospital Website" 
                      content="Designed a comprehensive relational database using OracleDB to manage critical healthcare operations, including patient records, pharmacy inventory, staffing, and billing. Developed automated backend logic using PL/SQL triggers and procedures to ensure data integrity and streamline complex transactional workflows. Built a responsive full-stack interface with PHP and Bootstrap, enabling seamless communication between the front-end and the Oracle database via an Apache server environment." 
                      tags={["Php", "XAMPP", "BootStrap", "OracleDB", "JavaScript", "CSS"]} 
                      image={catpfp} 
                      link="https://github.com/OliverVillalta/Adv_DBS_Project"
                    />
                  </div>
                </div>
            </section>
        </article>
      </div>
    </main>
  );
};

