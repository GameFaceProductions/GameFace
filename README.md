<img align="center" alt="GameFace" src="https://avatars.githubusercontent.com/u/114511820?s=200&v=4">

# Proposal:
GameFace is a social media platform that allows gamers to connect with other gamers in order to enhance their gaming experience. GameFace users are able to create and personalize their profile based on experience level, play style, and platform of choice. Additionally, GameFace users can connect with other users through posts, likes, comments, and highlights. GameFace gives users the ability to find gaming partners based on games played, region, skill, and play style. Ultimately, GameFace is a networking solution that allows users to connect and grow as gamers in a safe and inclusive environment.

# API’s: 
RAWG’s Video Game Database, 
Youtube (potentially), 
GameFace API (our database), 
TalkJS API (potentially)


# GameFace Main Stories / Features
# Visitor Story
As a VISITOR I can view the landing page that has a link to register and login (navbar shows basically nothing)

# Login Story
As a USER I can login and be directed to the home page

# Profile Page Story
As a USER I can change my password on profile page.<br>
As a USER I can customize my profile.<br> 
As a USER I can add an avatar.<br>
As a USER I can add gamertags / platform names.<br>
As a USER I edit my game list (add, remove).<br>
As a USER I can add info for each game (play style, skill, time played, region).<br>
As a USER I can upload clips / screenshots of my gameplay to the highlights section of my profile.<br>


# Post Story
As a USER I can add posts to my profile.<br>
As a USER I can edit my own posts.<br>
As a USER I can delete my own posts.<br>
As a USER I can see my own posts on my profile.<br>
As a USER I can see other user’s posts on their profile.<br>
As a USER I can see all posts on the home feed.<br>
As a USER I can like another user’s posts.<br>
As a USER I can comment on another user’s posts.<br>

# Clip/Screenshot Story
As a USER I can add clips / screenshots to my profile.<br>
As a USER I can edit clip / screenshot captions.<br>
As a USER I can delete clips / screenshots.<br>
As a USER I can see my own clips / screenshots on my profile.<br>
As a USER I can see other user’s clips / screenshots on their profile.<br>
As a USER I can see one featured clip on the home page.<br>
As a USER I can like another user’s clips / screenshots.<br>
As a USER I can comment on another user's clips / screenshots.<br>

# Search Users Story
As a USER I can search for other users and see a list of names.<br>
As a USER I can click a search result and be directed to that users profile.<br>

# Search Games Story
As a USER I can search for games by name and get back matched from RAWG API.<br>
As a USER I can click a search result and be directed to that games info page.<br>

# Game Info Page Story
As a USER I can add a game to my profile game list.<br>
As a USER I can remove a game from my profile game list.<br>
As a USER I can click a link to a store page for that game.<br>
As a USER I can see some info about the game (game description).<br>

# Friends Story
As a USER I can add other users as friends through their profile.<br>
As a USER I can report other users.<br>
As a USER I can message other users.<br>

# Admin Story
As an ADMIN I can do anything a user can do.<br>
As an ADMIN I can block  users.<br>
As an ADMIN I can hide / block any posts.<br>
As an ADMIN I can hide / block any comments.<br>




# EXTRAS Story
As a USER I can direct message other users (stretch, own set of user stories)<br>
As a USER if I forget password I can click a link on login page to reset<br>
As a USER my review rank is displayed (happy face + sad face counter)<br>
As a USER a I can review other users I’ve matched with (happy face + sad face counter instead of 5 star rating)<br>
As a USER I can block other users<br>

# FEATURES

# Visitor Page Features
Can only see landing page (register option)<br>

# Home Page Features
One randomly selected feature highlight (screenshot / clip )<br>
Feed section showing ALL users posts with like and comment<br>
Profile overview in top left that goes to profile<br>
Dev list game recommendations<br>
Avatar profile link in top right navbar<br>
Search button (users, games)<br>
Logo in top left that goes to about page<br>

# Profile Page Features
Favorite games list with add games button (link to the search games view for adding games based on search)<br>
Edit / change account information button (goes to account details view)<br>
Add, edit, delete posts <br>
Add, edit delete clips(video) and their captions<br>
Add, edit, delete screenshots and their captions<br>
Edit bio button (modal)<br>
Edit gamertag button (modal)<br>
Add  friend button <br>
Friends list<br>
Add / edit backdrop button <br>
DM (talkJS, if too difficult basic inbox dm)<br>
Search button (users, games)<br>
Home button top left links to home page<br>
Avatar button top right links to profile page<br>

# Search Games Features
Add games that are searched for (on the game info view)<br>

# Search Users Features
Type users name and get back result of user profiles<br>
Link to that users profile <br>

# On Another User’s Profile Features
Like, comment on posts<br>
Follow users<br>
Report<br>

# EXTRAS Features
Marketplace for merch and NFT’s<br>
Multiple gamertags<br>
Group chat<br>
Online status<br>
Matchmaking<br>
Twitch API for pulling users who are content creators (officially recognized by ADMIN role)<br>



# Classes:
Roles<br>
Users [many many user_platforms] [many many user_games]<br>
Posts <br>
GameClips <br>
Platform [many many user_platforms]<br>
Games [many many user_games]<br>
Posts_comments<br>
Post_likes<br>
Clips_comments<br>
Clips_likes<br>

# Controllers:
Users<br>
Posts<br>
GameClips<br>
PostsComments & ClipsComments (to respective endpoints)<br>
Views<br>
UserGames<br>

# Repositories: 
Users<br>
Posts<br>
GameClips<br>
PostsComments & ClipsComments (to respective endpoints)<br>
Views<br>
UserGames<br>








