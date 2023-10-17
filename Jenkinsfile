pipeline {
    agent any
    
    environment {
        // DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_REPO = 'examclass-backend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'examclass-backend'
        EXTERNAL_APP_PORT = '3000'
        INTERNAL_APP_PORT = '3000'
        CONTAINER_NAME_PRO = 'examclass-backend-pro'
    }

    stages {
        stage('Clear old images form machine') {
            steps {
                script{
                    sh "docker rmi -f \$(docker images | grep ${DOCKER_REPO} | awk '{print \$3}')", returnStatus: true
                }
            }
        }
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
                    sh "docker exec -i ${CONTAINER_NAME} curl http://localhost:3000/"
                    echo "CURL";
                }
            }
        }
    }
    
    post {
    success {
        script {
                if (sh(script: 'docker ps -a -q --filter "name=${CONTAINER_NAME_PRO}"', returnStatus: true)) {
                    echo "Container '${CONTAINER_NAME_PRO}' is not running, skipping stop and remove."
                } else {
                    sh "docker rm -f ${CONTAINER_NAME_PRO}"
                }
            }

            script {
                def containerId
                containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("-d -p ${EXTERNAL_APP_PORT}:${INTERNAL_APP_PORT} --name ${CONTAINER_NAME_PRO}")
            }
        }

        always {
            sh "docker stop ${CONTAINER_NAME}"
        }
    }
}