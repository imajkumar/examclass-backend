pipeline {
    agent any

    environment {
        DOCKER_REPO = 'examclass-backend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'examclass-backend'
    }

    stages {
        stage('Build image') {
            steps {
                script {
                    app = docker.build("${DOCKER_REPO}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    app.inside {
                        sh 'echo "Tests passed"'
                    }
                }
            }
        }

        stage('Run temporary image') {
            steps {
                script {
                    def containerId
                    containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d --name ${CONTAINER_NAME}")
                }
            }
        }

        stage('Run curl test') {
            steps {
                script {
                    sh "docker exec -i ${CONTAINER_NAME} curl -I http://localhost:${EXTERNAL_APP_PORT}/"
                }
            }
        }
    }

    post {
        success {
            script {
                sh "docker stop ${CONTAINER_NAME}" || true
                sh "docker rm ${CONTAINER_NAME}" || true

                def containerId
                containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("-d -p 3000:3000 --name ${CONTAINER_NAME}")
            }
        }
    }
}
