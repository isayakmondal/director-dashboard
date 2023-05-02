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
                GIT_REPO_NAME = 'director-dashboard'
                GIT_USER_NAME = 'isayakmondal'
                GIT_SSH_KEY = credentials('ssh-key-id')  // SSH key credentials ID
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-key-id', keyFileVariable: 'GIT_SSH_KEY')]) {
                    sh '''
                git config user.email "isayakmondal@gmail.com"
                git config user.name "${GIT_USER_NAME}"
                BUILD_NUMBER=${BUILD_NUMBER}
                GIT_SSH_COMMAND="ssh -i ${GIT_SSH_KEY}" git clone git@github.com:isayakmondal/director-dashboard.git
                cd director-dashboard
                git checkout dev

                # Update the image in the deployment-client.yaml file
                sed -i "s|image: vampzzz/director-dashboard-client:v[0-9]*|image: vampzzz/director-dashboard-client:v${BUILD_NUMBER}|g" ./k8s/deployment-client.yaml

                # Update the image in the deployment-server.yaml file
                sed -i "s|image: vampzzz/director-dashboard-server:v[0-9]*|image: vampzzz/director-dashboard-server:v${BUILD_NUMBER}|g" ./k8s/deployment-server.yaml

                # Commit and push the changes
                git add ./k8s/deployment-client.yaml ./k8s/deployment-server.yaml
                git commit -m "Update image version to ${BUILD_NUMBER}"
                GIT_SSH_COMMAND="ssh -i ${GIT_SSH_KEY} -o StrictHostKeyChecking=no" git push origin dev

            '''
                }
            }
        }
    }
}
