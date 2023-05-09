all : 
	docker compose up --build

inst-all: 
	(cd ./front && npm install)
	make all

install:
	(cd ./front && npm install)

detached :
	docker compose up -d --build

down :
	docker compose down

clean : 
	docker compose down --rmi all --volumes

fclean : clean
	rm -rf ./front/node_modules
	rm -rf ./front/package-lock.json

re : fclean all