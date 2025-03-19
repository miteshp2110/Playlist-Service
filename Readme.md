Authentication: After logging in, you will receive a token. For all subsequent requests, include the following header: Authorization: Bearer <token>

Login URL: https://playlist-backend.tech/service/auth/admin/login Method: POST Request Body (JSON): { "email": "paliwalmitesh2110@gmail.com", "password": "Mi12te34@" } Response (JSON): { "Message": "Success", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbGl3YWxtaXRlc2gyMTEwQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MjM3NzIwNywiZXhwIjoxNzQyOTgyMDA3fQ.by-uIurowClAkIT7FZjQvUxN9olcVoGOjHECVxu1JuE" }
Add Language URL: https://playlist-backend.tech/service/languages Method: POST Headers: Authorization: Bearer <token> Request Body (JSON): { "name": "Telgue" } Response (JSON): { "Message": "Added new Language" }
Add Genere URL: https://playlist-backend.tech/service/genere Method: POST Headers: Authorization: Bearer <token> Request Body (JSON): { "name": "Sad" } Response (JSON): { "Message": "Added new Genere" }
Add Artist URL: https://playlist-backend.tech/service/artists Method: POST Headers: Authorization: Bearer <token> Content-Type: multipart/form-data Form Fields:
name: text
profile_image: image file Response (JSON): { "Message": "Artist Added" }
Add Song URL: https://playlist-backend.tech/service/song Method: POST Headers: Authorization: Bearer <token> Content-Type: multipart/form-data Form Fields:
name: text
language: dropdown (sends language ID)
genere: dropdown (sends genere ID)
artist: dropdown (sends artist ID)
song_image: image file (only one)
song: mp3 file Response (JSON): { "Message": "Added Song" }
Data Retrieval Endpoints for Dropdowns

Get Languages URL: https://playlist-backend.tech/service/languages Method: GET Headers: Authorization: Bearer <token> Response (JSON Array): [ { "id": 4, "name": "English" }, { "id": 1, "name": "Hindi" }, { "id": 6, "name": "Punjabi" }, { "id": 8, "name": "Telgue" } ]
Get Genere URL: https://playlist-backend.tech/service/genere Method: GET Headers: Authorization: Bearer <token> Response (JSON Array): [ { "id": 3, "name": "Love" }, { "id": 1, "name": "Party" }, { "id": 5, "name": "Sad" } ]
Get All Artists URL: https://playlist-backend.tech/service/artists Method: GET Headers: Authorization: Bearer <token> Response (JSON Array): [ { "id": 1, "name": "Arijit Singh", "profile_image": "http://playlist-backend.tech/service/uploads/artist-profile/profile_image-1742376433908.jpg" }, { "id": 5, "name": "Anuv Jain", "profile_image": "http://playlist-backend.tech/service/uploads/artist-profile/profile_image-1742376358185.jpg" } ]
Usage Example:

Use the Login endpoint to authenticate and obtain a Bearer token.
For all other endpoints, include the Authorization header with the token.
Use the provided endpoints to add or retrieve languages, generes, artists, and songs.