# Intel Security Programming Challenge

## Setup

1. Install Virtualbox

```bash
sudo apt-get install virtualbox
```

2. Install [Docker](https://docs.docker.com/engine/installation/linux/)

3. Create a Docker machine

```bash
docker-machine create --driver virtualbox default
```

4. Connect shell to new machine

```
eval "$(docker-machine env default)"
```

5. Clone this repo

```
git clone https://github.com/andrewoconnor/apg_challenge.git
```

6. cd into the apg_challenge directory

7. Build the Docker container (this step may take a few minutes)

```bash
docker-compose build
```

8. Create the database

```bash
docker-compose run app rake db:create
```

9. Migrate the database

```bash
docker-compose run app rake db:migrate
```

10. Look up Docker machine IP

```bash
docker-machine ip default
```

11. Run the container

```bash
docker-compose up
```

12. Open your browser and navigate to DOCKER_MACHINE_IP:3000