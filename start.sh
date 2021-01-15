## Start backend server
echo "Starting backend server...."
dotnet watch run &

## Start asset server
if [ -d ./Scripts ];then 
    cd Scripts 
    echo "starting asset server..."
    npm run start &
fi
    

