This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Assumptions

- Metube company's main needs are search and classification of their video assets. Therefore, for the first system implementation as an MVP, the main functionalities they need to experience are video listing, video search, and video classification. Once they are certain of the system, they may require other management functionalities such as video uploading, updating, and deleting.
- Metube company needs a search functionality to easily find reference videos for editing, so search results must include the filename, start and end time.
- Metube company needs a classification functionality for a broad understanding of the context of their content to plan out their future content direction. They provided us with a class group (TikTok Topics). Later on, functionalities to add new class groups will be required.
- For the time being, Metube company will maintain only one index.
- The users of this software are content editors, content managers, producers, and directors.

### Major techincal Challenges

- Organizing types based on API response was a challenge. Component design started with defining data types needed for each component, but it took quite a bit of time because each API response had a different data structure. Based on UI design architecture, reorganizing response data to cater to UI required careful attention to detail.
- Adapting to Nextjs 13's app routing took some time. I wanted to utilize Server Components effectively, but due to my limited understanding, the components I designed were not compatible with it. Eventually, most of the components were rendered client-side. However, it was beneficial to think the concept of server components first.
- Including an API route in the frontend code had obvious pros and cons. Maintaining two interfaces for data fetching necessitated the management of two sets of endpoints and bodies, leading to considerable confusion during implementation. However, since there was a significant need for data organization, having an API route provided a separation of concerns, proving quite convenient during debugging.

### Major Constraints or limitations

-

###
