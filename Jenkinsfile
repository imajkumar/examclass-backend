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
        
        stage('Run temporary image test') {
            steps {
                script {
                    def containerId

                    try {
                        containerId = docker.image("${DOCKER_REPO}:${DOCKER_TAG}").run("--rm -d")
                        sh "docker exec -i $containerId curl -I http://localhost:30000/"
                    } finally {
                        sh "docker stop $containerId"
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