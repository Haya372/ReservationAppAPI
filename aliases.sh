alias reserve-app="docker-compose up --build server"
alias reserve-app-bash="docker exec -it server bash"
alias reserve-app-db="docker exec -it db psql  -U postgres reservation_app"