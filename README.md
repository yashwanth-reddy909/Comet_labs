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
- It requires the reponame need to be mentioned in req body<br>
- {req.body.reponame, req.body.repodescription, req.body.visibility} need to be send in JSON as request body<br>
- If visibiltity(boolen) mentioned as true it will set as PUBLIC repo, vice versa<br>

# REST API for stargazers and collaborators
 - Mentioned in routes/index.js file
 -Method /stargazers GET
 - reponame,username need to send in query parameters required<br>
 - username if mentioned it will according to that user if not it will fetch for default user<br>
 - it will tell the stargazers for that repo
 
 -Methos /collaborators GET
 - reponame,username need to send in query parameters required<br>
 - username if mentioned it will according to that user if not it will fetch for default user<br>
 - it will tell the collaborators for that repo

# REST API for topics
 - Mentioned in routes/topics.js file
 -Method /topics GET
 - reponame,username need to send in query parameters required<br>
 - username if mentioned it will according to that user if not it will fetch for default user<br>
 - it will tell the topics tags that repo has<br>
 
 -Method /topics POST<br>
 - reponame need to be mentioned in request body as JSON<br>
 - topics need to mentioned as well in that request body<br>
 - it will post the topic tag in to default user repo topics <br>




