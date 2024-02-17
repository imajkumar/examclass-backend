pipeline {
    agent any
    
    environment {
        // DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_REPO = 'examclass-api'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'examclass-api'
        EXTERNAL_APP_PORT = '3000'
        INTERNAL_APP_PORT = '3000'
        CONTAINER_NAME_PRO = 'examclass-api-pro'
    }

    stages {
        stage('Clear old images form machine') {
            steps {
                script{
                    echo "Deleting old images"
                    //sh "docker rmi -f \$(docker images | grep ${DOCKER_REPO} | awk '{print \$3}') || true;"
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
                    containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d --network=ubuntu_golocal --name ${CONTAINER_NAME}")
                    sh 'sleep 15'
                }
            }
        }

        stage('Run curl test') {
            steps {
                script {
                    sh "docker exec -i ${CONTAINER_NAME} bash -c 'curl -Is http://localhost:3000/'"
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
                containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("-d --network=ubuntu_golocal -p ${EXTERNAL_APP_PORT}:${INTERNAL_APP_PORT} --name ${CONTAINER_NAME_PRO}")
            }
        }

        always {
            sh "docker stop ${CONTAINER_NAME}"
        }
    }
}
