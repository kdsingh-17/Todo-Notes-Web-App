# Deployment Guide - Todo & Notes App

## 🚀 Quick Answer to Your Question

**YES, you need to host frontend and backend separately!** Here's why and how:

## Why Separate Hosting?

1. **Frontend** (React/Vite) = Static files → Needs static hosting (Vercel, Netlify)
2. **Backend** (Node.js/Express) = Server that runs code → Needs server hosting (Render, Railway)
3. They communicate via API calls over the internet

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend First

#### Option A: Render (Recommended - Free)

1. **Push backend to GitHub:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend code"
   # Push to GitHub (create repo first)
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up (free)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select the **backend folder** or root if backend is separate repo
   - Settings:
     - **Name:** todo-notes-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment Variables:**
       - `PORT` = 3001 (or leave blank, Render sets it automatically)
       - `FRONTEND_URL` = (leave blank for now, add after frontend is deployed)
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - **Copy your backend URL** (e.g., `https://todo-notes-backend.onrender.com`)

#### Option B: Railway (Alternative - Free)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Railway auto-detects Node.js
6. Set root directory to `backend` if needed
7. Deploy and copy URL

### Step 2: Deploy Frontend

#### Option A: Vercel (Recommended - Free)

1. **Update API URL in frontend:**
   - Create `.env` file in `frontend` folder:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```
   - Replace `your-backend.onrender.com` with your actual backend URL

2. **Push frontend to GitHub:**
   ```bash
   cd frontend
   git add .
   git commit -m "Update API URL"
   git push
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Environment Variables:**
       - `VITE_API_URL` = `https://your-backend.onrender.com/api`
   - Click "Deploy"
   - Wait 2-3 minutes
   - **Copy your frontend URL** (e.g., `https://todo-notes-app.vercel.app`)

#### Option B: Netlify (Alternative - Free)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repo
5. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Environment variables:**
     - `VITE_API_URL` = `https://your-backend.onrender.com/api`
6. Deploy

### Step 3: Update CORS in Backend

1. Go back to Render/Railway dashboard
2. Go to your backend service
3. Click "Environment" tab
4. Add environment variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://your-app.vercel.app` (your frontend URL)
5. Save and redeploy

### Step 4: Test Your App

1. Open your frontend URL in browser
2. Try creating a todo/note
3. Check browser console (F12) for errors
4. If you see CORS errors, double-check the `FRONTEND_URL` in backend

## 🔧 Common Issues & Solutions

### Issue 1: "Page Not Found" Error

**Cause:** Frontend can't reach backend

**Solution:**
- ✅ Check `.env` file has correct `VITE_API_URL`
- ✅ Make sure backend URL ends with `/api`
- ✅ Verify backend is running (visit backend URL in browser)
- ✅ Check browser console for exact error

### Issue 2: CORS Error

**Error:** "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution:**
- ✅ Add `FRONTEND_URL` environment variable in backend
- ✅ Update backend CORS to allow your frontend domain
- ✅ Redeploy backend after changes

### Issue 3: Backend Not Starting

**Error:** Backend deployment fails

**Solution:**
- ✅ Check build logs in Render/Railway
- ✅ Make sure `package.json` has correct start script
- ✅ Verify all dependencies are in `package.json`
- ✅ Check if `data.json` file exists (it will be created automatically)

### Issue 4: API Calls Return 404

**Cause:** Wrong API URL or backend routes not working

**Solution:**
- ✅ Test backend directly: `https://your-backend.onrender.com/api/health`
- ✅ Should return: `{"status":"ok","message":"API is running"}`
- ✅ If not, check backend logs

## 📝 Environment Variables Summary

### Frontend (.env in frontend folder)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend (in Render/Railway dashboard)
```
PORT=3001 (usually auto-set)
FRONTEND_URL=https://your-app.vercel.app
```

## 🎯 Recommended Hosting Combo

| Service | What It Hosts | Cost | Best For |
|---------|---------------|------|----------|
| **Vercel** | Frontend | Free | React/Vite apps |
| **Render** | Backend | Free | Node.js APIs |
| **Railway** | Both | Free tier | Full-stack apps |

## ✅ Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Backend URL tested (visit `/api/health`)
- [ ] Frontend `.env` file created with backend URL
- [ ] Frontend deployed
- [ ] CORS configured in backend
- [ ] Test creating a todo/note
- [ ] Check browser console for errors
- [ ] Share your frontend URL!

## 🆘 Still Having Issues?

1. **Check browser console** (F12) for exact error messages
2. **Check backend logs** in Render/Railway dashboard
3. **Test backend directly** by visiting the URL in browser
4. **Verify environment variables** are set correctly
5. **Make sure both services are deployed** (not just one)

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Render Deployment Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)

---

**Remember:** Always deploy backend first, then frontend. Frontend needs the backend URL to work!



