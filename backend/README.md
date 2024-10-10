# CodeGen
This is a template project. Focusing on microservice pattern while following clean architecture.

# Sql Server docker container
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong(!)Password2024" -v mssql_data:/var/opt/mssql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

# Run using docker
Go to src directory & run below command
```
docker-compose up
```