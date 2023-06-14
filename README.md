# METUBE content manager

### [DEMO LINK](https://metube-content-manager.vercel.app/)

## Assumptions

- Metube company's main needs are search and classification of their video assets. Therefore, for the first system implementation as an MVP, the main functionalities they need to experience are video listing, video search, and video classification. Once they are certain of the system, they may require other management functionalities such as video uploading, updating, and deleting.
- Metube company needs a search functionality to easily find reference videos for editing, so search results must include the filename, start and end time.
- Metube company needs a classification functionality for a broad understanding of the context of their content to plan out their future content direction. They provided us with a class group (TikTok Topics). Later on, functionalities to add new class groups will be required.
- For the time being, Metube company will maintain only one index.
- The users of this software are content editors, content managers, producers, and directors.

## Major techincal Challenges

- Organizing types based on API response was a challenge. Component design started with defining data types needed for each component, but it took quite a bit of time because each API response had a different data structure. Based on UI design architecture, reorganizing response data to cater to UI required careful attention to detail.
- Adapting to Nextjs 13's app routing took some time. I wanted to utilize Server Components effectively, but due to my limited understanding, the components I designed were not compatible with it. Eventually, most of the components were rendered client-side. However, it was beneficial to think the concept of server components first.
- Including an API route in the frontend code had obvious pros and cons. Maintaining two interfaces for data fetching necessitated the management of two sets of endpoints and bodies, leading to considerable confusion during implementation. However, since there was a significant need for data organization, having an API route provided a separation of concerns, proving quite convenient during debugging.

## Major Constraints or limitations

- I encountered difficulties in designing reusable components because each API response had different video data. The basic video data I needed included video_id, thumbnail_url, filename, and video_url. However, each API provided different amounts of video data. For instance, the list API only provided the filename, the search API only provided the thumbnail_url, and the classify API only provided the video_id. Detailed video data was supposed to be retrieved via a separate video retrieval API. However, the varying degrees of video data in each API response made it challenging to determine the right timing to call the video retrieval API in components. This overhead caused difficulties in designing reusable components.

Understand our API, Playground, and its core functionality
Writing the README file
Setting up the project
Actual Implementation of the functionalities

## Why do we need this software?

- Managing hundreds of video contents is difficult. With this software, we don't need to watch every video and manually label and tag each one. We can simply upload the videos to the platform, and it will index each video, making search and classification easy. This software will organize all videos, saving us hundreds of hours

### Total time to finish the project

- Understand our API, Playground, and its core functionality : **2 hours**
- Writing the README file : **1.5 hour**
- Setting up the project\    
  &nbsp;&nbsp;Understanding Next13: **2 hours**\     
  &nbsp;&nbsp;Setting up code base : **1 hour**\
- Actual Implementation of the functionalities\
  &nbsp;&nbsp;Video Listing : **3 hours**\     
  &nbsp;&nbsp;Video Search : **5 hours**\     
  &nbsp;&nbsp;Video Classification : **4 hours**\     
  &nbsp;&nbsp;QA / debug : **2 hours**\
