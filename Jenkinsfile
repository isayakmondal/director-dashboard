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
                    sh "docker build -t ${CLIENT_IMAGE_NAME}:${VERSION} --build-arg REACT_APP_MY_API_URL=http://example.dashboard.com ."
                }
            }
        }
        

        
        stage('Push images to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKERHUB_TOKEN')]) {

                    sh '''
                     docker login --username $DOCKER_HUB_USERNAME -p $DOCKERHUB_TOKEN
                     docker push ${CLIENT_IMAGE_NAME}:${VERSION}
                     docker push ${SERVER_IMAGE_NAME}:${VERSION}
                    '''
                }
            }
        }
        stage('Update Deployment File') {
        environment {
            GIT_REPO_NAME = "director-dashboard"
            GIT_USER_NAME = "isayakmondal"
        }
        steps {
            withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
            sh '''
                git config user.email "isayakmondal@gmail.com"
                git config user.name "isayakmonddal"
                BUILD_NUMBER=${BUILD_NUMBER}
                git pull origin dev
                git checkout dev
                # Update the image in the deployment-client.yaml file
                sed -i "s|image: vampzzz/director-dashboard-client:v27|image: vampzzz/director-dashboard-client:v${BUILD_NUMBER}|g" ./k8s/deployment-client.yaml

                # Update the image in the deployment-server.yaml file
                sed -i "s|image: vampzzz/director-dashboard-server:v27|image: vampzzz/director-dashboard-server:v${BUILD_NUMBER}|g" ./k8s/deployment-server.yaml

                # Commit and push the changes
                git add ./k8s/deployment-client.yaml ./k8s/deployment-server.yaml
                git commit -m "Update image version to ${BUILD_NUMBER}"
                git push origin dev
            '''
            }
        }
    }
    }
}
