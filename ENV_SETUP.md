# Environment Variables Setup

## For Frontend (Vercel/Netlify)

When deploying frontend, add this environment variable:

**Variable Name:** `VITE_API_URL`  
**Value:** `https://your-backend-url.onrender.com/api`

Replace `your-backend-url.onrender.com` with your actual backend URL.

## For Backend (Render/Railway)

When deploying backend, add these environment variables:

**Variable 1:**
- **Name:** `PORT`
- **Value:** `3001` (or leave blank, hosting platform sets it automatically)

**Variable 2:**
- **Name:** `FRONTEND_URL`
- **Value:** `https://your-frontend-url.vercel.app`

Replace `your-frontend-url.vercel.app` with your actual frontend URL.

## Local Development

For local development, create these files:

### `frontend/.env`
```
VITE_API_URL=http://localhost:3001/api
```

### `backend/.env`
```
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**Note:** `.env` files are gitignored, so they won't be pushed to GitHub. You need to set environment variables in your hosting platform's dashboard.



