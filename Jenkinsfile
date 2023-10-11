pipeline {
    agent any
    
    environment {
        // DOCKER_REGISTRY = 'https://registry.hub.docker.com'
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
                    
                    def runningContainers = sh(script: 'docker ps -q --filter "name=${CONTAINER_NAME}"', returnStatus: true).trim()
                    
                    if (runningContainers) {
                        sh "docker stop ${runningContainers}"
                    }
                    
                    def containerId
                    containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d --name ${CONTAINER_NAME}")
                }
            }
        }

        stage('Run curl test') {
            steps {
                script {
                    sh "docker exec -i ${CONTAINER_NAME} curl -I http://localhost:3000/"
                }
            }
        }

        stage('Stop and remove container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME}"
                }
            }
        }

        // stage('Push image') {
        //     steps {
        //         script {
        //             docker.withRegistry("${DOCKER_REGISTRY}", 'git') {
        //                 app.push("${DOCKER_TAG}")
        //                 app.push("latest")
        //             }
        //         }
        //     }
        // }
    }
}