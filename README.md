**.env File**

```
APP_NAME='APP_NAME'

#ALL PORTS
API_PORT='3100'
SOCKET_PORT='3101'
HASURA_PORT='3102'
DB_PORT='3103'

#DataBase Create's Auto in Docker
DB_USER='postgres'
DB_PASSWORD='1234'

#Hasura
HASURA_ADMIN_SECRET='123'
HASURA_CLIME_NAME_SPACE="HASURA_APP_NAME"

#APP Configs
STORAGE='/storage/'
CRYPT_PASSWORD='-----'
#60m, "2 days", "10h", "7d"
JWT_TOKEN_TIME=999d
JWT_TOKEN_REFRESH_TIME=7d
```


Chipmunk Log Analyzer & Viewer 
https://github.com/esrlabs/chipmunk