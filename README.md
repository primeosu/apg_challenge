# Intel Security Programming Challenge

## Setup

1. Install Virtualbox

    ```bash
    sudo apt-get install virtualbox
    ```

1. Install [Docker](https://docs.docker.com/engine/installation/linux/)

1. Create a Docker machine

    ```bash
    docker-machine create --driver virtualbox default
    ```

1. Connect shell to new machine

    ```
    eval "$(docker-machine env default)"
    ```

1. Clone this repo

    ```
    git clone https://github.com/andrewoconnor/apg_challenge.git
    ```

1. cd into the apg_challenge directory

1. Build the Docker container (this step may take a few minutes)

    ```bash
    docker-compose build
    ```

1. Create the database (you may have to run this step twice if it fails the first time)

    ```bash
    docker-compose run app rake db:create
    ```

1. Migrate the database

    ```bash
    docker-compose run app rake db:migrate
    ```

1. Look up Docker machine IP

    ```bash
    docker-machine ip default
    ```

1. Run the container

    ```bash
    docker-compose up
    ```

1. Open your browser and navigate to DOCKER_MACHINE_IP:3000