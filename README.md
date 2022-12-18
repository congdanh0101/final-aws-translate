# Cloud Computing - AWS Translate
### Bùi Công Danh - 19110008
### Ngô Hoàng Duy - 19145166

* [Instruction video](https://youtu.be/m7r4jm9pEsM)
* [Report](https://drive.google.com/drive/folders/15DkKBYTFSoplGHj4sH5EAQHydczxH9pb?usp=share_link)

## Table of contents
* [Overview](#overview)
* [Technologies](#technologies)
* [Setup AWS](#setup-aws)
* [Configuration Service](#configuration-service)
* [Connect EC2](#connect-ec2)
* [Package Installation](#package-installation)
* [Execute](#execute)

## Overview
This project is used Amazon Web Service to create a website application. Main function of app is AWS Translate and optional function is AWS Polly
	
## Technologies
Project is created with:
* [NodeJS](https://nodejs.org/en)
* [npm](https://www.npmjs.com)
* [ExpressJS Framework](https://expressjs.com)
* HTML, CSS, Javascript
* [AWS Translate](https://us-east-1.console.aws.amazon.com/translate/home)
* [AWS Polly](https://us-east-1.console.aws.amazon.com/polly/home)
* [AWS S3 Bucket](https://s3.console.aws.amazon.com/s3/buckets)
* [AWS EC2](https://us-east-1.console.aws.amazon.com/ec2/home)
* [AWS IAM](https://us-east-1.console.aws.amazon.com/iam/home)
	
## Setup AWS
* ### Create EC2 Instance
Step 1: Launch Instance
 ![image](https://user-images.githubusercontent.com/84666420/208288290-c78ec1aa-0352-4f24-95ea-0416493caa0b.png)
 
Step 2: Fill EC2 Instance's name and choose type of OS Virtual Machine (i had chosen this first one what was recommended by AWS free tier eligible)
![image](https://user-images.githubusercontent.com/84666420/208288398-cb6ec144-52f7-4e0a-9eb0-3ab340bfbcb9.png)

Step 3: Choose Instace type (i had chosen micro type cuz it's free)
![image](https://user-images.githubusercontent.com/84666420/208288489-a59536ce-e1b5-48f0-91aa-8e53d563d3bd.png)

Step 4: Create Keypair 
![image](https://user-images.githubusercontent.com/84666420/208288496-06a13383-dc05-40ec-962a-9c044c9354b0.png)

Step 4: Fill information for keypair you want to create (**!IMPORTANT: SAVE YOUR KEYPAIR AND NEVER FORGET IT**)
![image](https://user-images.githubusercontent.com/84666420/208288520-d92ee3b0-b449-422d-99d3-2698269a8a66.png)

Step 5: Configure Network setting (you can skip this step and you modify it later)
![image](https://user-images.githubusercontent.com/84666420/208288599-e901b594-eaf3-4e79-b5e0-a5a053f09915.png)

Step 6: After filling all of setting, click **"Launch Instance"**

* ### Create IAM User
Step 1: Add users
![image](https://user-images.githubusercontent.com/84666420/208295554-8c5c4092-908e-4c0b-a789-9ff9be316ad6.png)

Step 2: Enter name of user
![image](https://user-images.githubusercontent.com/84666420/208295593-b9c4ed4e-8d60-4c23-a82c-9c16b4ede594.png)

Step 3: Next all of step after seeing **CREATE USER**
![image](https://user-images.githubusercontent.com/84666420/208295815-de2a9bd0-b9c5-4539-876b-7aac5f731203.png)

Step 4: Click **CREAT USER**
![image](https://user-images.githubusercontent.com/84666420/208295828-deae405e-c689-4dc3-862d-f8a55c94cdbc.png)

Step 5: Create successfully, you need to save (store) your **access_key_id** and **secret_access_key_id**
![image](https://user-images.githubusercontent.com/84666420/208295869-5bc0fa00-153f-441f-9362-622f371efe39.png)

* ### Grant Permission for IAM User

Step 1: Choose user you wanna grant permission
![image](https://user-images.githubusercontent.com/84666420/208295921-8e2847d4-613f-4e2d-8739-811c35ad340d.png)

Step 2: Click **Add Permission**
![image](https://user-images.githubusercontent.com/84666420/208295945-6c2efbeb-8774-488b-a018-04ef3a6862de.png)

Step 3: Choose **Attach existing policies directly**
![image](https://user-images.githubusercontent.com/84666420/208295962-bf509b41-a328-4278-9a39-aa6a5d6f710e.png)

Step 4: Search policies and add it (Example: TranslateFullAccess)
![image](https://user-images.githubusercontent.com/84666420/208295996-c2e310f6-5de7-49f9-9120-2085dd8a76ac.png)

Step 5: After adding, click **Next Review**

Step 6: Review your policies then click **Add Permission**
![image](https://user-images.githubusercontent.com/84666420/208296045-0daf3d82-e7ae-4f3c-a22f-eec096341bbd.png)

* ### Create S3 Bucket

Step 1: Create bucket 
![image](https://user-images.githubusercontent.com/84666420/208296173-aebb921e-1745-4424-b301-d606f96f5952.png)

Step 2: Enter name of bucket (**!IMPORTANT**)
![image](https://user-images.githubusercontent.com/84666420/208296203-afb8ac7b-dcd2-4417-8bc3-757785745b1e.png)

Step 3: Choose Object Ownership
![image](https://user-images.githubusercontent.com/84666420/208296225-bb24cd6a-af4f-43fa-8d60-4fe6e69de337.png)

Step 4: Unblock public access
![image](https://user-images.githubusercontent.com/84666420/208296262-a21e8c02-6196-4476-aa38-4eb25dc1dba1.png)

Step 5: The rest of setting are default and click **CREATE BUCKET**
![image](https://user-images.githubusercontent.com/84666420/208296304-7369ce99-90eb-40f8-a5c3-fc8f70e52bd7.png)

## Configuration Service

* ### Config Security Group EC2

Step 1: Open EC2 Instance view and choose your instance you want to config
![image](https://user-images.githubusercontent.com/84666420/208296430-3e7d062d-50c1-498b-b0bd-91ead1bcd66a.png)

Step 2: Choose **Security** tab
![image](https://user-images.githubusercontent.com/84666420/208296460-6b02f45e-10ce-497c-b226-45772e27dace.png)

Step 3: Click name of security group to open
![image](https://user-images.githubusercontent.com/84666420/208296471-3eae2b97-69bb-442f-b6b5-bdb9d0cbfe5f.png)

Step 4: After opening security group and Click button **Edit inbound rules**
![image](https://user-images.githubusercontent.com/84666420/208296504-54697f16-7f54-4be5-8a53-96ef4440e354.png)

Step 5: You need to config security like that and click **Save rules**
![image](https://user-images.githubusercontent.com/84666420/208296557-e6b19fb6-cfa7-4706-97cc-c508acde0b49.png)

* ### Deploy website HTML, CSS, JS to S3 Bucket

Step 1: Clone this project by command line

```
git clone https://github.com/congdanh0101/final-aws-translate.git --branch master --single-branch
```

Step 2: Open EC2 Instance and choose your instance you want to connect
![image](https://user-images.githubusercontent.com/84666420/208296777-d51748c7-bbe0-449b-ae97-bfacb31bbad2.png)

Step 3: Copy URL **Public IPv4 address** in **Details** tab
![image](https://user-images.githubusercontent.com/84666420/208296799-c08bc94b-dc2c-4f28-bb40-ad9bf61bad88.png)

Step 4: After clone this project, open file final-aws-translate/src/template/index.js and edit
```
const URL_SERVER = `https://3.92.237.4:3000`
```

Step 5: After editing, save index.js file

Step 6: Open S3 bucket what created in **Create S3 Bucket**
![image](https://user-images.githubusercontent.com/84666420/208296976-2162da7a-5d15-436c-bc0a-21d89a921d5f.png)

Step 7: Choose your bucket you wanna deploy
![image](https://user-images.githubusercontent.com/84666420/208296985-435d7292-8f98-4f38-8dae-5ed357bb5635.png)

Step 8: Click **Create folder** in order to use AWS Polly (mp3 folder)
![image](https://user-images.githubusercontent.com/84666420/208297028-b4f40cab-d555-4fd2-b5e4-ca783574bf69.png)

Step 9: Click **Upload** to deploy website 
![image](https://user-images.githubusercontent.com/84666420/208297051-7d0edf2e-4b32-41f4-85d2-53815ce51ea4.png)

Step 10: Click **Add files** or **Add folder** you wanna deploy
![image](https://user-images.githubusercontent.com/84666420/208297083-2d4286c5-478a-4661-b440-e148cf644c42.png)

Step 11: Open **Permission** setting and config like that
![image](https://user-images.githubusercontent.com/84666420/208297103-1e088943-61a0-47aa-8356-4bdbf5aaf506.png)

Step 12: After step 10 and step 11, click **Upload**
![image](https://user-images.githubusercontent.com/84666420/208297131-de905beb-e333-46dc-bb1c-1d657c976ae7.png)

Step 13: Open file **index.html**
![image](https://user-images.githubusercontent.com/84666420/208297156-c0a515ea-d1b2-49ec-a17b-8d02e4884fa2.png)

Step 14: Open URL at **Object URL**
![image](https://user-images.githubusercontent.com/84666420/208297170-d3703f25-1f0a-4f29-b970-456af506ad36.png)


## Connect EC2
Step 1: Install [PuTTY](https://www.putty.org) application to connect EC2 virtual machine

Step 2: Open EC2 Instance view, choose instance you wanna connect and click button **Connect**
![image](https://user-images.githubusercontent.com/84666420/208297325-d36358f7-59fc-4daa-a59b-905981ab4d35.png)

Step 3: Choose tab **SSH Client** to get connect information 
![image](https://user-images.githubusercontent.com/84666420/208297354-1244ad8e-4e78-4e0e-8e60-1a3dff84fb73.png)

Step 4: Open PuTTY application

Step 4: Connect EC2 by PuTTY
```
Hostname: ec2-user@ec2-3-94-92-56.compute-1.amazonaws.com
Username: ec2-user
Key: your keypair after you create when launched instance
```

Step 4.1: Enter hostname
![image](https://user-images.githubusercontent.com/84666420/208297504-b879b232-3394-433e-b218-31fbd2fb99df.png)

Step 4.2: Enter username
![image](https://user-images.githubusercontent.com/84666420/208297518-d334bc26-6e2d-4ed3-80c8-f203a4135c41.png)

Step 4.3: Add key ppk
![image](https://user-images.githubusercontent.com/84666420/208297538-4e5dd81a-c758-4f16-8d5f-35fb5de4ccfe.png)

Step 5: Click **Open** in PuTTY application

Step 6: Click **Accept** to finish connecting
![image](https://user-images.githubusercontent.com/84666420/208297570-f633f361-c453-48ed-a38a-064af8a75f44.png)

Step 7: Connect successfully
![image](https://user-images.githubusercontent.com/84666420/208297617-ef5d106d-57d0-492f-8d1a-207088134d6a.png)


## Package Installation

### First of all
```
sudo yum update
```

* ### Install curl
Install
```
sudo yum install curl
```
Check installation
```
curl --version
```
![image](https://user-images.githubusercontent.com/84666420/208298025-5f0a4412-2451-4178-858c-8d47e8eef74d.png)


* ### Install NodeJS

Install NodeSource
```
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
```
![image](https://user-images.githubusercontent.com/84666420/208298097-240f07b1-ba7f-4ee6-9a7f-79a10a14e7dc.png)

Install NodeJS
```
sudo yum install nodejs
```
![image](https://user-images.githubusercontent.com/84666420/208298187-eeb1e684-0d9a-4bbb-86e3-025979870873.png)

Check NodeJS installation
```
node --version
Result: v10.24.1
```
```
npm --version
Result: 6.14.12
```

* ### Install Git
```
sudo yum install git
```

Check Git installation 
Install
```
git --version
Result: git version 2.38.1
```

## Execute

* Step 1: Clone project to EC2 virtual machine and setup library
```
git clone https://github.com/congdanh0101/final-aws-translate.git --branch master --single-branch
```

```
cd final-aws-translate
```

```
npm install
```

* Step 2: Edit IAM key (**access_key_id** and **secret_access_key_id**)

Step 2.1: If you use **AWS academy account** then open file **config.json** and edit key, secret, session (use **VIM**)
```
vi config.json
```
![image](https://user-images.githubusercontent.com/84666420/208298564-317f2024-3234-467b-a664-a053852bbe9d.png)


Step 2.2: If you use **AWS normal account** open file **cf.json** and edit key, secret (use **VIM**)
```
vi cf.json
```
![image](https://user-images.githubusercontent.com/84666420/208298619-772128c8-559d-43f8-9de0-6c7e1d1ccb0d.png)

* Step 3: Open file final-aws-translate/src/app/controller.js and edit
```
cd src/app
```

```
vi controller.js
```
![image](https://user-images.githubusercontent.com/84666420/208298696-a4a745ea-0c0f-4a54-852b-7b810349d202.png)

Edit config file if you **config.json** or **cf.json**

* Step 4: Run server
```
npm start
```
![image](https://user-images.githubusercontent.com/84666420/208298830-ffbf17d7-e5a0-4834-bf92-78f121658009.png)

* Step 5: Open website after deploy to S3 and try everyone you wanna do

Translate
![image](https://user-images.githubusercontent.com/84666420/208299412-59d5fe78-17f1-4160-9b3a-ff6fa5347696.png)




