pipeline {
    agent any
    
    environment {
        // DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_REPO = 'examclass-backend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'examclass-backend'
        EXTERNAL_APP_PORT = '3000'
        INTERNAL_APP_PORT = '3000'
   
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
                    sh "docker stop ${CONTAINER_NAME}"                 
                    def containerId
                    containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d --name ${CONTAINER_NAME}")
                }
            }
        }

        stage('Run curl test') {
            steps {
                script {
                    sh "docker exec -i ${CONTAINER_NAME} curl -I http://localhost:3000/"
                    sh "docker stop ${CONTAINER_NAME}"
                }
            }
        }

        post {
        success {
             always {
            stage('Stop and remove container') {
                steps {
                    script {
                        sh "docker stop ${CONTAINER_NAME}"
                            }
                        }
                    }
                }
            }
        }

        post {
        success {
            stage('Final Deployement') {
                steps {
                    script {
                        def containerId
                        containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("-d -p ${EXTERNAL_APP_PORT}:${INTERNAL_APP_PORT} --name ${CONTAINER_NAME}")
                        }
                    }
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