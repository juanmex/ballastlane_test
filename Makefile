build:
		docker compose build
start:
		docker compose up
stop:
		docker compose down
bash:
		docker compose exec backend bash
migrate:
		docker compose exec backend bin/rails db:migrate
db-reset:
		docker compose exec backend bin/rails db:drop
		docker compose exec backend bin/rails db:create 
		docker compose exec backend bin/rails db:migrate
		docker compose exec backend bin/rails db:seed
