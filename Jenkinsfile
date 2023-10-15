pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'imajkumar@hotmail.com'
        DOCKER_HUB_PASSWORD = 'Ajay@9711'
        IMAGE_NAME = 'examclass-api'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'examclass-container'
    }

    stages {
        stage('Build') {
            steps {
                // Checkout your Node.js API source code from version control (e.g., Git)
                checkout scm

                // Build the Docker image
                script {
                    sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        stage('Publish to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
                    sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} $DOCKER_HUB_USERNAME/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push $DOCKER_HUB_USERNAME/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Pull and run the Docker container from Docker Hub
                sh "docker pull $DOCKER_HUB_USERNAME/${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker run -d -p 3000:3000 --name $CONTAINER_NAME $DOCKER_HUB_USERNAME/${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }
}
