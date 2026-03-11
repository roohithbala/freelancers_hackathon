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
                git url: 'https://github.com/roohithbala/freelancers_hackathon.git', branch: 'main'
                
                // If using GitHub Webhooks that automatically clone the repo:
                echo "Code checked out by Jenkins"
            }
        }

        stage('Inject Env Files') {
            steps {
                // Fetch the environment variables from Jenkins Credentials (type: Secret file)
                // You must create two Secret File credentials in Jenkins with IDs:
                // 'frontend-env' and 'backend-env'
                withCredentials([
                    file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_FILE'),
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV_FILE')
                ]) {
                    sh 'cp $FRONTEND_ENV_FILE frontend/.env'
                    sh 'cp $BACKEND_ENV_FILE backend/.env'
                }
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
                // Dynamically create or update Kubernetes Secret for the backend from its .env file
                sh 'kubectl create secret generic backend-env --from-env-file=backend/.env --dry-run=client -o yaml | kubectl apply -f - || true'
                
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                
                // Restart to ensure the latest local image is pulled
                sh 'kubectl rollout restart deployment backend-deployment'
                sh 'kubectl rollout restart deployment frontend-deployment'
            }
        }
    }
}
