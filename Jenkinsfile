pipeline {
    environment {
        // Set environment variables here
        DOCKER_HUB_USERNAME = credentials('my-docker-hub-creds')
        DOCKER_HUB_PASSWORD = credentials('my-docker-hub-creds')
        DOCKER_HUB_REGISTRY = 'docker.io'
        CLIENT_IMAGE_NAME = 'vampzzz/director-dashboard-client'
        SERVER_IMAGE_NAME = 'vampzzz/director-dashboard-server'
        VERSION = "${BUILD_NUMBER}"
    }
    agent any

   
	
    
    stages {

        stage('Build server image') {
            steps {
                dir('server') {
                    sh "docker build -t ${SERVER_IMAGE_NAME}:v${VERSION} ."
                }
            }
        }

        stage('Build client image') {
            steps {
                dir('client') {
                    sh "docker build -t ${CLIENT_IMAGE_NAME}:v${VERSION} ."
                }
            }
        }
        

        
        stage('Push images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'my-docker-hub-creds', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD} ${DOCKER_HUB_REGISTRY}"
                    sh "docker push ${CLIENT_IMAGE_NAME}:${VERSION}"
                    sh "docker push ${SERVER_IMAGE_NAME}:${VERSION}"
                }
            }
        }
    }
}
