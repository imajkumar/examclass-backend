
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'examclass-api'
        CONTAINER_NAME = 'examclass-api'
        EXTERNAL_PORT = '3000'
        INTERNAL_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.run("-p ${env.EXTERNAL_PORT}:${env.INTERNAL_PORT} --name ${env.CONTAINER_NAME} -d ${env.DOCKER_IMAGE}")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Add any testing steps here
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'dev' // Adjust the condition based on your branch strategy
            }
            steps {
                script {
                    // Additional steps for deploying to production
                    // This could include tagging the image, pushing to a registry, etc.
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up resources after the build
                docker.image(env.DOCKER_IMAGE).remove()
                docker.image('alpine').remove(force: true)
                docker.container(env.CONTAINER_NAME).stop()
                docker.container(env.CONTAINER_NAME).remove(force: true)
            }
        }
    }
}

