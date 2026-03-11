pipeline {
  agent any

  environment {
    FRONTEND_IMAGE = 'freelancers-frontend:latest'
    BACKEND_IMAGE  = 'freelancers-backend:latest'
  }

  stages {
    stage('Create/Update K8s Secrets') {
      steps {
        withCredentials([
          file(credentialsId: 'backend-env', variable: 'BACKEND_ENV_FILE'),
          file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_FILE')
        ]) {
          sh '''
            set -e

            kubectl create secret generic backend-env \
              --from-env-file="$BACKEND_ENV_FILE" \
              --dry-run=client -o yaml | kubectl apply -f -

            # Only keep this if your frontend actually reads runtime env vars.
            kubectl create secret generic frontend-env \
              --from-env-file="$FRONTEND_ENV_FILE" \
              --dry-run=client -o yaml | kubectl apply -f -
          '''
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        sh "docker build -t ${FRONTEND_IMAGE} frontend"
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        sh "docker build -t ${BACKEND_IMAGE} backend"
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          set -e
          kubectl apply -f k8s/backend-deployment.yaml
          kubectl rollout restart deployment/backend-deployment || true
          kubectl rollout status deployment/backend-deployment --timeout=180s || true

          kubectl rollout restart deployment/frontend-deployment || true
          kubectl rollout status deployment/frontend-deployment --timeout=180s || true
        '''
      }
    }
  }
}