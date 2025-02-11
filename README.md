# I.BA_WEBLAB

## DEV Environment

### Global requirements on MacOS
```
brew install node
brew install angular-cli

// Backend (Terminal 1) or with gui
docker pull mongodb/mongodb-community-server:latest
docker start mongodb/mongodb-community-server -p 27017:27017

// Backend (Terminal 2)
cd src/backend
npm start

// Frontend (Terminal 3)
cd src/frontend
```

## Prod Environment
```
src/docker-compose.yml up

```