# project2_Kelper
 Kelper is a platform where companies can come together to analyze when to remove or fire a client. In order to grow businesses you must cater to the clients actually bringing in revenue and supporting your business and trim the excess that may be draining your resources.
 Kelper also allows companies to hold clients accountable for their actions.


<a href="https://kelper.herokuapp.com/"> Link to Deployed Website on Heroku </a>




Dependincies used:
    "bcrypt": "^5.0.1",
    "bootstrap": "^5.1.1",
    "bootstrap-icons": "^1.5.0",
    "connect-mongo": "^4.6.0",
    "dotenv": "^10.0.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "init": "^0.1.2",
    "method-override": "^3.0.0",
    "mongo": "^0.1.0",
    "mongoose": "^6.0.6"



MVP -

[x] - site can add new client
[x] - site can add new comment
[x] - can delete clients
[x] - CSS added
[x] - A working full-stack application, built by you, using Node.js, Mongoose, Express and EJS	
[x] - Adhere to the MVC file structure: Models, Views, Controllers	
[x] - At least one model with all 7 RESTful routes and full CRUD.	
[x] - A git repository not inside the class repo.	
[x] - Be deployed online and accessible to the public via Heroku	
[x] - A README.md file with explanations of the technologies used, the approach was taken, unsolved problems, user stories, and notes to yourself so you can come back to your project later in the course and be able to pick up your train of thought, etc	
[x] - Have a link to your hosted working app in the README.md file in your github repo	





Old Stretch Goals
[x] - use a framework like bootstrap
    [] - do better on setup/styling
[x] - have my login functionalities working


New Goals:

More in the about section
    connect business about: 

        elder loosing mind needs to be verified before selling to them

        medication verification to keep people from buying controlled substances

        scammers: 


Pages to change to: 

User Page:
(users are the employees/managers making the incident reports about a client)
[] - users can navigate to their own 'home' page where they can edit their 
    [] - employee status / business 
    [] - name
    [] - business
    [] - edit reviews only they made
        [] - can delete individual comments without deleting all of the client
        [] - track changes of edit
[] - Ability to message other users? (messaging aspect, inbox/outbox) {API? email API?}
    **[] - Admin for verification?
*[] - google maps for location of user/company? (attatched to login/register then attatches to review like company/empoyee information as well)


Login/Register functions:
[] - make login for admin vs user vs client
    *[] - client registration, only one client can 'claim' each incident report, 
*[] - email verification set up (api?)
    [] - business verification for user
    [] - verify with a work email? 
[] - sign in message (when pw/email do not match)
**[] - way to recover password
    [] - extra security? admin needs to verify change? 
[] - google API attached for location pinning to user model(company)



Main Index Page: 
(page where all incidents are posted in a fb like format)
[] - have stars average and then display on index route
[] - on index page make it just 30 comments per page with the ability to move to 'next page' ( or have more continue to load? ie like fb? react?)
[] - have comments be able to be sorted by location, company, client name (alphabetically asscending and descending)
[] - search options (API? see projects from unit 3?)
    name
    location
    company
[] - sort options 
    name
    location
    company



Client Page:
(client is the one being reported, the incident report is the report about the client made by the user) 
[] - client page lists all incidents reported by any user  
    [] - each incident: 
        [] - lists users title/company/location
        [] - has a way to flag incidents for removal

    [] - starts with most recent as you scroll down goes from recent to older
    []
[] - flag/report posts for review/deletion
[] - be able to add stars or (certain item) of choice as review rating method (3/5 stars or 4/5 tomatoes/'karens'? ect)
[] - a way to print out 



Each incident report: 
[] - have stars average and then display on main index route
[] - has a way for users to flag
    [] - when flagged a box pops up with the ability to say why and gets sent to admin inbox
[] - verification status
    [] - blue check mark/something to say client is verified
        [] - 3 tier verification
            [] - red verification means only first name, and description of client has been given
            [] - yellow verification means there is a first and last name plus one of the following: legit phone number/email/address
            *[] - green means client signed up for a profile for the right to appeal review and has claimed the incident
                **[] - if green then will be able to go to one single page where all connected 



Admin:
[] - can flag or unflag a review
    [] - ability to change and delete reviews, (client pages?)
    [] - admin has a way to approve/verify/double check 
    [] - can change verification
    [] - 3 tier verification
            [] - red verification means only first name, and description of client has been given
            [] - yellow verification means there is a first and last name plus one of the following: legit phone number/email/address
            *[] - green means client signed up for a profile for the right to appeal review and has claimed the incident
                *[] - if green then will be able to go to one single page where all connected
    [] - verification for users?
    **[] - can ban users
*[] - admin gets notified of each flagged incident
    *[] - admin is able to track flagged posts 
        *[] - how many times a review has been flagged
        *[] - who has flagged a review and when 
        *[] - 
***[] - admin is able to assist in "redemption"
[] - get bugs reported to their inbox (link on page? auto pop up?)

 


***Client redemption option:
[] - clients that have been reported to the website can 
appeal to companies about incidents
    [] - Clients register as a client
    [] - Client puts in a request to get access to reviews
        [] - (admin or automatic?)
            [] - results returned are ones where phone number or address or name matches 
                [] - drivers liscense submission? 
                [] - scanner API?
            [] - 
            [] - 
    [] - Clients first needs to claim reviews made about them
    [] - Claimed reviews get maked as a green level verification
        *[] - reviews get attatched to their profile/page after they claim a review 
        [] - a page/route gets generated for them
            [] - incidents get grouped by business
                [] - users are hidden from client
        [] - option to apeal to each company is available
            [] - message can be made to go to multiple users 
                    click -> hidden users attatched to the reviews become recipients in message (this needs to be always hidden from the client)
            [] - if email is sent incident report(s) get flagged and put under investigation
                [] - incident reports change to a lighter/greyed out color with a notification on top that incident is under review (for 90 days) but incident report is still legible (this is changed across website, to users and in main index page)
                [] - flagged report displays how long incident is under investigation for
                [] - users from companies get emailed/notified and companies have the option to remove the review, write a follow up, delete, 




short term - 
    start in relief veterinary community
    branch into medical comunity




Long term goal - 
    If clients gets app they can get discounts? (partners with companies) - long term goal
        reward incentives for clients that sign up
        partner with larger corporations such as walmart/kroger/target/ect 

