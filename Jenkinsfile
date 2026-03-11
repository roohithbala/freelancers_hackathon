pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'freelancers-frontend:latest'
        BACKEND_IMAGE = 'freelancers-backend:latest'
    }

    stages {
        stage('Clone Code') {
            steps {
                // If checking out from Git, uncomment and set the URL
                // git url: 'https://github.com/roohithbala/freelancers_hackathon.git', branch: 'main'
                
                // If using GitHub Webhooks that automatically clone the repo:
                echo "Code checked out by Jenkins"
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }
        
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                
                // Restart to ensure the latest local image is pulled
                sh 'kubectl rollout restart deployment backend-deployment'
                sh 'kubectl rollout restart deployment frontend-deployment'
            }
        }
    }
}
