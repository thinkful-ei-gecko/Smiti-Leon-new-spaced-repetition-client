 {
 "version": 2,
 "name": "el-instrumental",
 "alias": "el-instrumental",
 "routes": [
   {
     "src": "^/static/(.*)",
     "dest": "/static/$1"
   },
   {
     "src": "^/favicon.ico$",
     "dest": "/favicon.ico"
   },
   {
     "src": "^/manifest.json$",
     "dest": "/manifest.json"
   },
   {
     "src": "^/site.webmanifest.json$",
     "dest": "/site.webmanifest.json"
   },
   {
     "src": ".*",
     "dest": "/index.html"
   },
 ]
}
