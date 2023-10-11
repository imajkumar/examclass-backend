pipeline {
    agent any
    
    environment {
        // DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_REPO = 'examclass-backend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
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
                    containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d").bash(curl -I "http://localhost:30000/")
                    currentBuild.description = "Container ID: ${containerId}"
                }
            }
        }

        stage('Run curl test') {
            steps {
                script {
                    sh "docker exec -i ${currentBuild.description} curl -I http://localhost:30000/"
                }
            }
        }

        stage('Stop and remove container') {
            steps {
                script {
                    sh "docker stop ${currentBuild.description}"
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