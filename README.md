# Comet_labs

  -Download Instructions
- Download whole repo as zip file or clone it and unzip it and go to cmd, go this folder location and type npm install<br>
- After Installing in .env file add the github Token in there <a href="https://github.com/settings/tokens">For reference</a><br>
- Now the server is live<br>
- Host Domain is [http://localhost:3000](http://localhost:3000/)

-Folder Structure 
- app.js is the main script file<br>
- All routes are mentoined in here<br>
- routes folder all router are divided in to files for clarification <br>


# REST API for Repo
 -Method /repos GET
- It declared on routes/repos.js file<br>
- For fetching all the repos information<br>
- Requires: username need to be mentioned in query parameter like http://localhost:3000/repos?username=yashwanth-reddy909 <br>
- If not mentioned it will fetches the all repos information for the default user<br>
- If mentioned it will fetches the particular user repo information<br>
 
-Method /repos POST
- For posting a repo in to github<br>
- It will post 


