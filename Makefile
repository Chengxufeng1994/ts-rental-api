.PHONY: docker-compose-up-infra
docker-compose-up-infra:
	@docker compose -f docker-compose.infra.yaml up --d --remove-orphans

.PHONY: docker-compose-down-infra
docker-compose-down-infra:
	@docker compose -f docker-compose.infra.yaml down -v

.PHONY: build-image
build-image:
	@docker build -t rent-app -f Dockerfile .
	@kind load docker-image --name argocdk8s rent-app:latest
