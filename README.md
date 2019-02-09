## CaloFilms

Small React.js portfolio project.    
Libraries used so far: react-material-ui (core and icons), axios, redux, redux-thunk, react-router-dom.  
Firebase as backend.

This site features films recommended by Santiago Calori (@sancalori).  

## Planned Features / Upcoming Fixes
* ~~Async films filter by term (onChange event).~~
* ~~Authentication.~~ 
* ~~Wishlist functionality: When logged in toggle "add_to_queue" and "remove_from_queue" buttons. Add queued films to user list.~~ 
* ~~Add icon in toolbar to display only films in users' queue.~~ 
* ~~Remove search bar from auth route.~~ 
* ~~Fix bug where logging out from queue does not redirect to home page with all films (it stays on the user's queue list.)~~
* Add a "No film in your personal list yet when filmsInQueue.length === 0"
* Jump to top when clicking in queue list icon.
* Redo signup/login form with material-ui components.
* Move icons on card to the right of the flex item.
* Add footer with github link and credits.
* Add a withErrorHandler HOC to catch firebase 4xxs.
* Add proper modal with backdrop to display error messages.
* Add autosuggestion in search bar with added hidden field with keywords.
* Add layout with sidedrawer and hamburger icon.
* Add running time and year filters.
* Add share functionality.
* Add a favorites (outline heart) icon, and when clicked: a filled heart icon. Do a similar second list with favorites.