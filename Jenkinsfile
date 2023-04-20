pipeline {
    environment {
        // Set environment variables here
        DOCKER_HUB_USERNAME = 'vampzzz'
        DOCKER_HUB_REGISTRY = 'docker.io'
        CLIENT_IMAGE_NAME = 'vampzzz/director-dashboard-client'
        SERVER_IMAGE_NAME = 'vampzzz/director-dashboard-server'
        VERSION = "v${BUILD_NUMBER}"
    }
    agent any

   
	
    
    stages {

        stage('Build server image') {
            steps {
                dir('server') {
                    sh "docker build -t ${SERVER_IMAGE_NAME}:${VERSION} ."
                }
            }
        }

        stage('Build client image') {
            steps {
                dir('client') {
                    sh "docker build -t ${CLIENT_IMAGE_NAME}:${VERSION} ."
                }
            }
        }
        

        
        stage('Push images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', variable: 'DOCKERHUB_TOKEN')]) {

                    sh '''
                     docker login --username $DOCKER_HUB_USERNAME --password-stdin <<< \$DOCKERHUB_TOKEN
                     docker push ${CLIENT_IMAGE_NAME}:${VERSION}
                     docker push ${SERVER_IMAGE_NAME}:${VERSION}
                    '''
                }
            }
        }
    }
}
